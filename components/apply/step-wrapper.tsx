"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StepWrapperProps {
  stepKey: string;
  children: React.ReactNode;
}

export function StepWrapper({ stepKey, children }: StepWrapperProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
