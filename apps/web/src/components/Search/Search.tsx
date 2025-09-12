import { useQuery } from "@tanstack/react-query";
import { ClapperboardIcon, FilmIcon, LoaderCircleIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  type Variants,
} from "motion/react";
import { useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import { api } from "@/api";
import { AspectRatio, Button, Input, ScrollArea } from "@/components";
import { cn } from "@/utils";

export const Search = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue(query, 500);

  const { data, isPending, error } = useQuery({
    queryKey: ["search", debouncedQuery],
    retry: 0,
    queryFn: async () => {
      const { data, error } = await api.v1.search.get({
        headers: {
          "accept-language": "nl",
        },
        query: {
          q: debouncedQuery,
        },
      });

      if (error) throw error;

      return data;
    },
    enabled: debouncedQuery.length > 0,
  });

  const controls = useAnimationControls();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.12,
      },
    },
    shown: {
      opacity: 1,
      transition: {
        duration: 0.12,
      },
    },
  };

  const handleOnChangeQueryTextfield = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setQuery(value);
    setDebouncedQuery(value);

    if (value.length > 0) {
      controls.start("shown");
    } else {
      controls.start("hidden");
    }
  };

  const handleCloseSearch = () => {
    controls.start("hidden");
    setQuery("");
    setDebouncedQuery("");
  };

  // @ts-expect-error
  useOnClickOutside<HTMLDivElement>(ref, handleCloseSearch);

  const showCloseButton = query.length > 0;

  return (
    <div ref={ref} className="flex flex-col mx-3">
      <div className="flex z-10">
        <Input
          name="Search"
          type="search"
          placeholder="Search"
          value={query}
          onChange={handleOnChangeQueryTextfield}
          className="grow"
        />
        <motion.div
          initial={{
            width: showCloseButton ? "auto" : 0,
          }}
          animate={{
            width: showCloseButton ? "auto" : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          <Button variant="ghost" onClick={handleCloseSearch} className="ml-3">
            Close
          </Button>
        </motion.div>
      </div>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
        className={cn(
          "absolute",
          "top-0 right-0 bottom-0 left-0",
          "pt-9 px-3",
          "bg-neutral-950/50",
          "backdrop-blur-lg",
        )}
      >
        <AnimatePresence mode="popLayout">
          {isPending && (
            <motion.div
              key="search-pending"
              className="flex flex-col items-center justify-center h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoaderCircleIcon className="animate-spin" />
            </motion.div>
          )}
          {error && (
            <motion.div
              key="search-error"
              className="flex flex-col items-center justify-center h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center justify-center bg-neutral-900 p-6 rounded-full">
                  <div className="flex items-center justify-center size-14 text-6xl">
                    😵
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl font-bold">
                    Couldn't search for films
                  </div>
                  <div className="text-md">
                    There was an issue searching for "{query}"
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {!error && !isPending && data?.length === 0 && (
            <motion.div
              key="search-no-results"
              className="flex flex-col items-center justify-center h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="bg-neutral-900 p-6 rounded-full">
                  <FilmIcon className="size-14" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl font-bold">No results</div>
                  <div className="text-md">
                    Are you sure "{query}" is a film?
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {data && (
            <motion.div
              key="search-results"
              className="h-full mt-4 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScrollArea className="h-full">
                <div className="grid grid-cols-3 gap-4 pb-8">
                  {data?.map((show) => (
                    <motion.div
                      key={show.id}
                      className="flex flex-col gap-2"
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
                        {show.poster?.md && (
                          <img
                            src={show.poster.md}
                            className="absolute object-cover"
                            alt={show.title}
                          />
                        )}
                      </AspectRatio>
                      <div>
                        <div className="text-neutral-200 text-sm">
                          {show.title}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
