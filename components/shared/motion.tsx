"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: i * 0.08 }
  })
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } }
};

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function FadeUp({
  children,
  delay = 0,
  className,
  once = true,
  amount = 0.25,
  as = "div"
}: FadeUpProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={delay}
      variants={fadeUpVariants}
    >
      {children}
    </MotionTag>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({ children, delay = 0, className, once = true }: FadeInProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={fadeInVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container for lists of items.
 * Children should be <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}
