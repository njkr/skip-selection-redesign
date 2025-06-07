"use client";

import Image from "next/image";
import { AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Skip } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skipId: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    translateY: -4,
  },
};

const buttonMotionVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const buttonBaseClasses =
    "w-full font-semibold py-3 px-4 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-base flex items-center justify-center gap-2";
  const selectedButtonClasses =
    "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:ring-emerald-500";
  const unselectedButtonClasses =
    "text-emerald-600 border border-emerald-500 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-900/30 focus:ring-emerald-500";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      exit={{ opacity: 0 }}
      className="h-full"
    >
      <div
        className={cn(
          "flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md hover:shadow-xl",
          isSelected &&
            "border-emerald-600 ring-2 ring-emerald-500 dark:border-emerald-500"
        )}
        onClick={() => onSelect(skip.id)}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect(skip.id);
          }
        }}
      >
        <div className="p-0 relative">
          <div className="aspect-[16/10] relative overflow-hidden">
            <Image
              src={
                skip.imageUrl
                  ? skip.imageUrl
                  : `/placeholder.svg?width=400&height=250&query=${encodeURIComponent(
                      skip.name + " skip"
                    )}`
              }
              alt={`${skip.name} image`}
              fill
              className="object-cover"
            />
          </div>
          {/* Badge */}
          <div className="absolute top-3 right-3 bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-100 rounded-full px-3 py-1 text-xs font-semibold">
            {skip.size}
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          {" "}
          {/* CardContent */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
            {skip.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {skip.hirePeriod}
          </p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-auto mb-3">
            £{skip.price.toFixed(2)}
          </p>
          {skip.notAllowedOnRoad && (
            // Badge (Outline-like)
            <div className="inline-flex items-center bg-orange-100 text-orange-700 dark:bg-orange-700/30 dark:text-orange-300 border border-orange-300 dark:border-orange-600 px-2 py-1 text-xs font-medium rounded-md w-fit">
              <AlertTriangle className="w-3 h-3 mr-1.5" />
              Not Allowed On Road
            </div>
          )}
        </div>
        <div className="p-4 mt-auto">
          {" "}
          {/* CardFooter */}
          <motion.div
            variants={buttonMotionVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full"
          >
            <button // Button
              type="button"
              className={cn(
                buttonBaseClasses,
                isSelected ? selectedButtonClasses : unselectedButtonClasses
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(skip.id);
              }}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Selected
                </>
              ) : (
                <>
                  Select This Skip
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
