import { Accordion } from "@base-ui-components/react/accordion";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Drawer } from "vaul-base";
import { api } from "@/api";
import {
  Button,
  MoviePoster,
  MovieTheaterNotificationSelection,
  ScrollArea,
} from "@/components";
import { THEATERS } from "@/constants";
import { useStore } from "@/store";
import { cn } from "@/utils";

export const MovieDetails = () => {
  const selectedMovieSlug = useStore((state) => state.selectedMovieSlug);
  const setSelectedMovieSlug = useStore((state) => state.setSelectedMovieSlug);

  const { data, isPending, error } = useQuery({
    queryKey: ["movie", "details", selectedMovieSlug],
    retry: 0,
    queryFn: async () => {
      const { data, error } = await api.v1
        .movie({
          slug: selectedMovieSlug as string,
        })
        .get({
          headers: {
            "accept-language": "nl",
          },
        });

      if (error) throw error;

      return data;
    },
    enabled: selectedMovieSlug !== undefined,
  });

  return (
    <Drawer.Root
      open={selectedMovieSlug !== undefined}
      onOpenChange={(v) =>
        setSelectedMovieSlug(v ? selectedMovieSlug : undefined)
      }
      shouldScaleBackground
      setBackgroundColorOnScale={false}
    >
      <Drawer.Portal keepMounted>
        <Drawer.Overlay className="fixed inset-0 bg-black/80" />
        <Drawer.Content className="bg-neutral-950 text-neutral-100 fixed inset-x-0 bottom-0 h-full max-h-[85vh] w-full max-w-[512px] mx-auto pb-8 rounded-t-4xl border-[1px] border-neutral-800">
          <Drawer.Handle className="top-4" />
          <AnimatePresence>
            {data && (
              <ScrollArea className="flex flex-col gap-8 mt-8 px-3 h-full overflow-y-auto">
                <div className="flex flex-col pb-3 select-none">
                  <div className="flex flex-col items-center gap-3 pb-8">
                    <div className="w-full max-w-64 mx-auto">
                      <MoviePoster
                        id={data.slug}
                        src={data?.poster.lg ?? data?.poster.md ?? null}
                        alt={data.title}
                      />
                    </div>
                    <div className="font-bold text-xl text-center max-w-80">
                      {data.title}
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch grow">
                    <MovieTheaterNotificationSelection slug={data.slug} />
                  </div>
                </div>
              </ScrollArea>
            )}
          </AnimatePresence>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
