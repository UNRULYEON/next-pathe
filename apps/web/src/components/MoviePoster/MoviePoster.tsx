import { ClapperboardIcon } from "lucide-react";
import { motion, useAnimationControls, type Variants } from "motion/react";
import { AspectRatio } from "@/components";
import { cn } from "@/utils";

type MoviePosterProps = {
  id: string;
  src: string | null;
  alt: string;
  className?: string;
};

export const MoviePoster = ({ id, src, alt, className }: MoviePosterProps) => {
  const controls = useAnimationControls();
  const posterVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    shown: {
      opacity: 1,
    },
  };

  return (
    <AspectRatio
      key={id}
      ratio={9 / 12}
      className={cn("relative rounded-xl overflow-clip", className)}
    >
      <div className="absolute flex items-center justify-center  bg-neutral-900 w-full h-full">
        <ClapperboardIcon className="size-14 text-neutral-800" />
      </div>
      <motion.img
        src={src ?? undefined}
        className="absolute w-full h-full object-cover"
        alt={alt}
        variants={posterVariants}
        initial="hidden"
        animate={controls}
        exit="hidden"
        onLoad={() => {
          controls.start("shown");
        }}
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 outline-2 -outline-offset-2 outline-neutral-800/80 rounded-xl" />
    </AspectRatio>
  );
};
