import { Accordion } from "@base-ui-components/react/accordion";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { api } from "@/api";
import { Button, ReviewTheaterSelection } from "@/components";
import { THEATERS } from "@/constants";
import { useStore } from "@/store";
import { cn } from "@/utils";

type MovieTheaterNotificationSelectionProps = {
  slug: string;
};

export const MovieTheaterNotificationSelection = ({
  slug,
}: MovieTheaterNotificationSelectionProps) => {
  const subscribedMovies = useStore((state) => state.subscribedMovies);
  const addSubscribedMovie = useStore((state) => state.addSubscribedMovie);
  const removeSubscribedMovie = useStore(
    (state) => state.removeSubscribedMovie,
  );
  const updateSubscribedMovie = useStore(
    (state) => state.updateSubscribedMovie,
  );

  const persistedSelection =
    subscribedMovies.find((movie) => movie.slug === slug)?.theaterSlugs || [];
  const isNewSubscription = !persistedSelection.length;

  const [selection, setSelection] = useState<string[]>(persistedSelection);

  const handleOnChange = ({
    slug,
    checked,
  }: {
    slug: string;
    checked: boolean;
  }) => {
    if (checked) {
      setSelection((selection) => [...selection, slug]);
    } else {
      setSelection((selection) => selection.filter((item) => item !== slug));
    }
  };

  const handleOnSaveSelection = () => {
    console.log("API CALL TO PERSIST");

    setTimeout(() => {
      if (isNewSubscription) {
        addSubscribedMovie({
          slug,
          theaterSlugs: selection,
        });

        return;
      }

      if (selection.length === 0) {
        removeSubscribedMovie({
          slug,
        });
      } else {
        updateSubscribedMovie({
          slug,
          theaterSlugs: selection,
        });
      }
    }, 2000);
  };

  const handleOnCancel = () => {
    setSelection(persistedSelection);
  };

  return (
    <div className="relative overflow-clip">
      <Accordion.Root className="grow">
        {THEATERS.map((city) => (
          <Accordion.Item key={city.slug} className="mb-3">
            <Accordion.Header className="sticky top-5">
              <Accordion.Trigger
                className={cn(
                  "group w-full",
                  "flex items-center justify-between p-1.5 bg-neutral-900",
                  "border-[1px] border-neutral-800",
                  "rounded-2xl",
                  "font-geist-mono text-neutral-400",
                  "hover:cursor-pointer",
                )}
              >
                <div className="flex items-center gap-3 pl-3">
                  {/*<Checkbox.Root className="flex size-5 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 data-[checked]:bg-neutral-100 data-[unchecked]:border-[1px] data-[unchecked]:border-neutral-700">
                    <Checkbox.Indicator className="flex text-neutral-800">
                      <CheckIcon className="size-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>*/}
                  <div className="uppercase tracking-widest">{city.city}</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <ChevronDownIcon className="size-5 transition-all ease-out group-data-[panel-open]:rotate-180" />
                  </Button>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-neutral-100 transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              <div className="flex flex-col gap-3 my-3">
                {city.theaters.map((theater) => (
                  <div key={theater.slug} className="flex">
                    {/** biome-ignore lint/a11y/noLabelWithoutControl: the component renders the input */}
                    <label
                      className={cn(
                        "flex items-center gap-3",
                        "mt-3 mx-3 ml-5",
                        "hover:cursor-pointer",
                      )}
                    >
                      <Checkbox.Root
                        className="flex size-5 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 data-[checked]:bg-neutral-100 data-[unchecked]:border-[1px] data-[unchecked]:border-neutral-700"
                        checked={selection.includes(theater.slug)}
                        onCheckedChange={(checked) => {
                          handleOnChange({ slug: theater.slug, checked });
                        }}
                      >
                        <Checkbox.Indicator className="flex text-neutral-800 data-[unchecked]:hidden">
                          <CheckIcon className="size-4" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      {theater.name}
                    </label>
                  </div>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      {/* Spacer to prevent overlap with fixed selection component */}
      <div
        className={cn(
          "transition-all duration-500 ease-out",
          selection.length > 0 ? "h-20" : "h-0",
        )}
      />
      <ReviewTheaterSelection
        selection={selection}
        persistedSelection={persistedSelection}
        handleOnSave={handleOnSaveSelection}
        handleOnCancel={handleOnCancel}
      />
    </div>
  );
};
