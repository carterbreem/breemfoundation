import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-surface-border bg-white px-4 py-2 text-sm text-ink transition-colors",
          "placeholder:text-ink-subtle",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink",
          "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus-visible:border-red-500 aria-[invalid=true]:focus-visible:ring-red-100",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
