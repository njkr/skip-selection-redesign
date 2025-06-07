"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Trash2,
  Truck,
  CalendarDays,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type StepperVariant = "dots-lines" | "segmented-pills";

interface Step {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "completed" | "current" | "upcoming";
}

const stepsData: Step[] = [
  { id: "postcode", name: "Postcode", icon: MapPin, status: "completed" },
  { id: "waste-type", name: "Waste Type", icon: Trash2, status: "completed" },
  { id: "select-skip", name: "Select Skip", icon: Truck, status: "current" },
  {
    id: "permit-check",
    name: "Permit Check",
    icon: CalendarDays,
    status: "upcoming",
  },
  {
    id: "choose-date",
    name: "Choose Date",
    icon: CalendarDays,
    status: "upcoming",
  },
  { id: "payment", name: "Payment", icon: CreditCard, status: "upcoming" },
];

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

const currentIconVariants = {
  pulse: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
  initial: { scale: 1 },
};

const currentRingVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut", delay: 0.1 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

interface StepperProps {
  currentStepId?: string;
  variant?: StepperVariant;
}

export function Stepper({
  currentStepId = "select-skip",
  variant = "segmented-pills",
}: StepperProps) {
  let foundCurrent = false;
  const steps = stepsData.map((step) => {
    if (step.id === currentStepId) {
      foundCurrent = true;
      return { ...step, status: "current" as const };
    } else if (foundCurrent) {
      return { ...step, status: "upcoming" as const };
    }
    return { ...step, status: "completed" as const };
  });

  return (
    <nav
      aria-label="Progress"
      className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900/90 backdrop-blur-md shadow-md pt-4 pb-3 sm:pt-6 sm:pb-4 transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol
          role="list"
          className={cn(
            // Grid for mobile: 3 columns
            "grid grid-cols-3 gap-3",

            // Flex for sm and up: wrap and justify
            "sm:flex sm:flex-wrap sm:justify-center sm:gap-4 sm:items-stretch",

            variant === "segmented-pills" && "sm:overflow-visible"
          )}
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className="flex-none min-w-[90px] xs:min-w-[100px] sm:flex-grow sm:basis-[calc(50%-0.5rem)] md:basis-[calc(33.33%-0.75rem)] lg:flex-1 lg:basis-auto cursor-pointer"
            >
              <motion.div
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover={step.status !== "current" ? "hover" : undefined}
                whileTap={step.status !== "current" ? "tap" : undefined}
                transition={{ delay: stepIdx * 0.07 }}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-xl p-2 sm:p-3 text-[11px] md:text-sm transition-all duration-300 ease-out overflow-hidden shadow-md hover:shadow-lg",
                  step.status === "current" &&
                    "bg-gradient-to-br from-emerald-500 to-green-600 text-white ring-2 ring-emerald-300 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-105",
                  step.status === "completed" &&
                    "bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300",
                  step.status === "upcoming" &&
                    "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 opacity-70 hover:opacity-100"
                )}
              >
                {/* Ring for current */}
                <AnimatePresence>
                  {step.status === "current" && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-emerald-400 dark:border-emerald-300"
                      variants={currentRingVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative z-10 flex items-center justify-center h-5 w-5 mb-1 sm:h-6 sm:w-6 md:h-7 md:w-7"
                  variants={
                    step.status === "current" ? currentIconVariants : undefined
                  }
                  animate={step.status === "current" ? "pulse" : "initial"}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="w-full h-full text-green-600 dark:text-green-400" />
                  ) : (
                    <step.icon
                      className={cn(
                        "h-full w-full",
                        step.status === "current" && "text-white"
                      )}
                    />
                  )}
                </motion.div>

                <span
                  className={cn(
                    "relative z-10 font-medium text-center leading-tight",
                    step.status === "current" && "text-white font-semibold",
                    step.status === "completed" &&
                      "text-green-700 dark:text-green-300",
                    step.status === "upcoming" &&
                      "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {step.name}
                </span>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
