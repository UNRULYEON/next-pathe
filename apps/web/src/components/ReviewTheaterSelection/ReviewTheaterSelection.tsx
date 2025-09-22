import NumberFlow from "@number-flow/react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components";
import { THEATERS } from "@/constants";
import { cn } from "@/utils";

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  const setB = new Set(b);
  return setA.size === setB.size && [...setA].every((x) => setB.has(x));
};

const createSelectionDiff = (
  selection: string[],
  persistedSelection: string[],
) => {
  const selectionSet = new Set(selection);
  const persistedSet = new Set(persistedSelection);
  const allSlugs = new Set([...selection, ...persistedSelection]);

  const diff: { slug: string; isAddition: boolean; isDeletion: boolean }[] = [];

  for (const slug of allSlugs) {
    const inSelection = selectionSet.has(slug);
    const inPersisted = persistedSet.has(slug);

    if (inSelection && inPersisted) {
      // In both - no change
      diff.push({ slug, isAddition: false, isDeletion: false });
    } else if (inSelection && !inPersisted) {
      // Addition
      diff.push({ slug, isAddition: true, isDeletion: false });
    } else if (!inSelection && inPersisted) {
      // Deletion
      diff.push({ slug, isAddition: false, isDeletion: true });
    }
  }

  return diff.sort((a, b) => a.slug.localeCompare(b.slug));
};

type ReviewTheaterSelectionProps = {
  selection: string[];
  persistedSelection: string[];
  handleOnSave: () => void;
  handleOnCancel: () => void;
};

export const ReviewTheaterSelection = ({
  selection,
  persistedSelection,
  handleOnSave,
  handleOnCancel,
}: ReviewTheaterSelectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isDifferent = !arraysEqual(selection, persistedSelection);

  const [isShown, setIsShown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const theaters = createSelectionDiff(selection, persistedSelection);

  const containerControls = useAnimationControls();
  const containerVariants: Variants = {
    hidden: {
      bottom: -300,
    },
    shown: {
      bottom: 12,
    },
  };

  const reviewSelectionControls = useAnimationControls();
  const reviewSelectionVariants: Variants = {
    collapsed: {
      width: 282,
      padding: 0,
      border: "1px solid transparent",
      borderRadius: 18,
    },
    expanded: {
      width: 384,
      padding: 6,
      border: "1px solid var(--color-neutral-700)",
      borderRadius: 18,
    },
  };

  const selectionContainerControls = useAnimationControls();
  const selectionContainerVariants: Variants = {
    collapsed: {
      backgroundColor: "var(--color-neutral-800)",
      color: "var(--color-neutral-500)",
      border: "1px solid transparent",
    },
    expanded: {
      backgroundColor: "var(--color-neutral-700)",
      color: "var(--color-neutral-300)",
      border: "1px solid var(--color-neutral-600)",
    },
  };

  const selectedMoviesContainerControls = useAnimationControls();
  const selectedMoviesContainerVariants: Variants = {
    collapsed: {
      height: 0,
      marginTop: 0,
    },
    expanded: {
      height: theaters.length * 24,
      marginTop: 6,
    },
  };

  useEffect(() => {
    if (isDifferent && selection.length > 0) {
      setIsShown((v) => {
        containerControls.start("shown");
        if (isExpanded) {
          selectedMoviesContainerControls.start("expanded");
        }
        return !v;
      });
    } else {
      setIsShown((v) => {
        reviewSelectionControls.start("collapsed");
        containerControls.start("hidden");
        selectionContainerControls.start("collapsed");
        selectedMoviesContainerControls.start("collapsed");
        setIsExpanded(() => false);
        return !v;
      });
    }
  }, [isDifferent]);

  useEffect(() => {
    if (!isShown || !isExpanded) return;

    selectedMoviesContainerControls.start("expanded");
  }, [theaters]);

  const handleOnExpandButtonClick = () => {
    setIsExpanded((v) => {
      if (v) {
        reviewSelectionControls.start("collapsed");
        selectionContainerControls.start("collapsed");
        selectedMoviesContainerControls.start("collapsed");
      } else {
        reviewSelectionControls.start("expanded");
        selectionContainerControls.start("expanded");
        selectedMoviesContainerControls.start("expanded");
      }

      return !v;
    });
  };

  const handleOnCancelButton = () => {
    handleOnCancel();
    setIsExpanded(false);
    containerControls.start("hidden");
    reviewSelectionControls.start("collapsed");
    selectionContainerControls.start("collapsed");
    selectedMoviesContainerControls.start("collapsed");
  };

  // @ts-expect-error
  useOnClickOutside<HTMLDivElement>(ref, () => {
    // setIsShown(() => {
    //   reviewSelectionControls.start("collapsed");
    //   selectionContainerControls.start("collapsed");
    //   selectedMoviesContainerControls.start("collapsed");
    //   setIsExpanded(() => false);
    //   return false;
    // });
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={containerControls}
      exit="hidden"
      transition={{
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="fixed left-1/2 -translate-x-1/2 py-1 z-50 max-w-[90vw]"
    >
      <motion.div
        variants={reviewSelectionVariants}
        initial="collapsed"
        animate={reviewSelectionControls}
        exit="collapsed"
        transition={{
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1],
        }}
        className={cn("flex flex-col gap-2 backdrop-blur-xl")}
      >
        <motion.div
          variants={selectionContainerVariants}
          initial="collapsed"
          animate={selectionContainerControls}
          exit="collapsed"
          transition={{
            duration: 1,
            ease: [0.19, 1, 0.22, 1],
          }}
          className={cn("flex flex-col px-3 py-1 rounded-xl overflow-clip")}
        >
          <NumberFlow
            className="flex items-center text-xs font-mono uppercase tracking-widest"
            value={theaters.filter((t) => t.isAddition || t.isDeletion).length}
            suffix="theater(s) selected"
          />
          <motion.div
            variants={selectedMoviesContainerVariants}
            initial="collapsed"
            animate={selectedMoviesContainerControls}
            exit="collapsed"
            transition={{
              duration: 1,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="overflow-clip  h-[-webkit-fill-available]"
          >
            <AnimatePresence mode="sync">
              {theaters.map(({ slug, isAddition, isDeletion }) => {
                console.log(slug);
                const theater = THEATERS.flatMap((city) => city.theaters).find(
                  (t) => t.slug === slug,
                );
                const city = THEATERS.find((c) =>
                  c.theaters.some((t) => t.slug === slug),
                );

                return (
                  <motion.div
                    key={`movie-review-selection-${slug}-${
                      isAddition ? "addition" : isDeletion ? "deletion" : ""
                    }`}
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 24,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className={cn(
                      "flex gap-1 items-center whitespace-nowrap",
                      isAddition && ["text-green-600"],
                      isDeletion && ["text-red-600"],
                    )}
                  >
                    <span className="flex items-center justify-center w-2.5">
                      {isAddition ? "+" : isDeletion ? "-" : "•"}
                    </span>
                    {theater?.name}
                    <span>•</span>
                    <span
                      className={cn(
                        "font-mono uppercase text-xs text-neutral-400 tracking-widest",
                        isAddition && ["text-green-600"],
                        isDeletion && ["text-red-600"],
                      )}
                    >
                      {city?.city}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <div className="flex gap-2">
          <Button
            onClick={
              isExpanded
                ? () => {
                    setIsShown(() => {
                      reviewSelectionControls.start("collapsed");
                      selectionContainerControls.start("collapsed");
                      selectedMoviesContainerControls.start("collapsed");
                      setIsExpanded(() => false);
                      return false;
                    });
                  }
                : handleOnCancelButton
            }
            variant="ghost"
            disabled={selection.length === 0}
          >
            {isExpanded ? "Close" : "Cancel"}
          </Button>
          <Button
            variant={isExpanded ? "primary" : "secondary"}
            onClick={isExpanded ? handleOnSave : handleOnExpandButtonClick}
            className="w-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.div
                  key="movie-notifs-save-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Subscribe
                </motion.div>
              ) : (
                <motion.div
                  key="movie-notifs-review-selection-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Review theaters
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
