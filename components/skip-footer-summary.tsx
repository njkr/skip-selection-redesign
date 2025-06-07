"use client";

import { useEffect, useState } from "react";
import type { Skip } from "@/lib/types";
import { ArrowRight, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkipFooterSummaryProps {
  selectedSkip: Skip | null;
}

const footerShellVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.3, ease: "easeOut" },
  },
};

export function SkipFooterSummary({ selectedSkip }: SkipFooterSummaryProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const buttonBaseClasses =
    "w-full sm:w-auto font-semibold py-3 px-8 rounded-lg transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-base flex items-center justify-center gap-2";
  const primaryButtonClasses =
    "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:ring-emerald-500";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {selectedSkip && (
        <motion.div
          variants={footerShellVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-0"
        >
          <div className="max-w-3xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg shadow-2xl rounded-t-xl md:rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden">
            <div className="w-full p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <motion.div
                variants={contentItemVariants}
                className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left"
              >
                <Truck className="w-8 h-8 text-emerald-500 hidden sm:block flex-shrink-0" />
                <div>
                  Selected:{" "}
                  <strong className="text-gray-900 dark:text-white">
                    {selectedSkip.name}
                  </strong>
                  <span className="mx-1">-</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    {typeof selectedSkip.price === "number"
                      ? `£${selectedSkip.price.toFixed(2)}`
                      : "Price N/A"}
                  </strong>
                  <span className="block sm:inline text-xs text-gray-500 dark:text-gray-400">
                    ({selectedSkip.hirePeriod})
                  </span>
                </div>
              </motion.div>
              <motion.div
                variants={contentItemVariants}
                className="w-full sm:w-auto"
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{
                  opacity: selectedSkip ? 1 : 0.5,
                  scale: selectedSkip ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className={cn(
                    buttonBaseClasses,
                    primaryButtonClasses,
                    !selectedSkip && disabledClasses
                  )}
                  disabled={!selectedSkip}
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
