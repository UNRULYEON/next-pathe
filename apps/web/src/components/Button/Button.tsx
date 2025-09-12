import { motion } from "motion/react";
import { cn } from "@/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "icon";
} & React.ComponentProps<typeof motion.button>;

export const Button = ({
  variant = "primary",
  size,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <motion.button
      className={cn(
        "flex items-center",
        "px-4 h-9 rounded-xl",
        "cursor-pointer",
        "text-base font-medium",
        "transition-all",
        variant === "primary" && [
          "bg-neutral-100",
          "text-neutral-900",
          "hover:bg-neutral-300",
        ],
        variant === "secondary" && [
          "bg-neutral-800",
          "text-neutral-100",
          "hover:bg-neutral-700",
        ],
        variant === "ghost" && ["text-neutral-100", "hover:bg-neutral-800"],
        size === "icon" && ["p-2"],
        className,
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.001 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
