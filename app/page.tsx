"use client";
import { SkipCard } from "@/components/skip-card";
import { SkipCardSkeleton } from "@/components/skip-card-skeliton";
import { SkipFooterSummary } from "@/components/skip-footer-summary";
import { Stepper } from "@/components/stepper";
import { fetchSkips, setSelectedSkipId } from "@/lib/redux/slices/skip-slice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    skips,
    selectedSkipId,
    status: skipStatus,
  } = useSelector((state: RootState) => state.skips);

  useEffect(() => {
    if (
      skipStatus === "idle" ||
      (skipStatus === "succeeded" && skips.length === 0)
    ) {
      dispatch(fetchSkips());
    }
  }, [skipStatus, dispatch, skips.length]);

  const handleSelectSkip = (id: string) => {
    dispatch(setSelectedSkipId(id));
  };

  const selectedSkip = useMemo(() => {
    return skips.find((skip) => skip.id === selectedSkipId) || null;
  }, [skips, selectedSkipId]);

  const isLoading = skipStatus === "loading" || skipStatus === "idle";

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white selection:bg-emerald-500 selection:text-white"
    >
      <Stepper currentStepId="select-skip" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-40">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            Choose Your Skip Size
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            All skips come with a standard 14-day hire. Select the size that
            best suits your needs.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(4)].map((_, i) => <SkipCardSkeleton key={i} />)
            : skips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkipId === skip.id}
                  onSelect={handleSelectSkip}
                />
              ))}
          <SkipFooterSummary selectedSkip={selectedSkip} />
        </div>
      </div>
    </motion.div>
  );
}
