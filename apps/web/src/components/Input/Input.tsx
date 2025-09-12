import { Input as BaseUIInput } from "@base-ui-components/react/input";
import { cn } from "@/utils";

type InputProps = React.ComponentProps<typeof BaseUIInput>;

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <BaseUIInput
      className={cn(
        "h-9",
        "pl-3",
        "rounded-xl",
        "bg-neutral-900",
        "text-base text-neutral-100",
        "border-[1px] border-neutral-800",
        "outline-neutral-700/20",
        "focus:border-neutral-700 focus:outline-4 focus:outline-neutral-700/20",
        "transition-all",
        className,
      )}
      {...rest}
    />
  );
};
