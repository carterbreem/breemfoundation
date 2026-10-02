import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
  as?: "div" | "section" | "article" | "main";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", as: Comp = "div", ...props }, ref) => {
    const sizes = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      full: "max-w-[1400px]"
    };
    return (
      <Comp
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container };
