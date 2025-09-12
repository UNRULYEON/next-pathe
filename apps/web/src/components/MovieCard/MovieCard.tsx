import { motion } from "motion/react";
import type { api } from "@/api";
import { MoviePoster } from "@/components";
import { useStore } from "@/store";

type MovieCardProps = {
  data: NonNullable<Awaited<ReturnType<typeof api.v1.search.get>>["data"]>[0];
};

export const MovieCard = ({ data }: MovieCardProps) => {
  const setSelectedMovieSlug = useStore((state) => state.setSelectedMovieSlug);

  const handleOnTap = () => {
    setSelectedMovieSlug(data.slug);
  };

  return (
    <motion.div
      key={data.id}
      className="flex flex-col gap-2 hover:cursor-pointer"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      onTap={handleOnTap}
    >
      <MoviePoster
        id={data.id}
        src={data.poster?.md ?? data.poster?.lg ?? null}
        alt={data.title}
      />
      <div>
        <div className="text-neutral-200 text-sm">{data.title}</div>
      </div>
    </motion.div>
  );
};
