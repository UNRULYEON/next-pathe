import { ClapperboardIcon } from "lucide-react";
import { motion, useAnimationControls, type Variants } from "motion/react";
import type { api } from "@/api";
import { AspectRatio } from "@/components";

type MovieCardProps = {
  data: NonNullable<Awaited<ReturnType<typeof api.v1.search.get>>["data"]>[0];
};

export const MovieCard = ({ data }: MovieCardProps) => {
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
    <motion.div
      key={data.id}
      className="flex flex-col gap-2 hover:cursor-pointer"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <AspectRatio
        ratio={9 / 12}
        className="relative border-[1px] border-neutral-800 rounded-lg overflow-clip"
      >
        <div className="absolute flex items-center justify-center  bg-neutral-900 w-full h-full">
          <ClapperboardIcon className="size-14 text-neutral-800" />
        </div>
        {data.poster?.md && (
          <motion.img
            src={data.poster.md}
            className="absolute object-cover"
            alt={data.title}
            variants={posterVariants}
            initial="hidden"
            animate={controls}
            onLoad={() => {
              controls.start("shown");
            }}
          />
        )}
      </AspectRatio>
      <div>
        <div className="text-neutral-200 text-sm">{data.title}</div>
      </div>
    </motion.div>
  );
};
