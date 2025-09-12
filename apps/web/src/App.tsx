import { ClapperboardIcon } from "lucide-react";
import { Drawer } from "vaul-base";
import { Search } from "@/components";
import { DevtoolsContext } from "@/contexts";
import { useStore } from "@/store";
import { cn } from "@/utils";

const App = () => {
  const hasHydrated = useStore((state) => state._hasHydrated);
  const selectedMovieSlug = useStore((state) => state.selectedMovieSlug);
  const setSelectedMovieSlug = useStore((state) => state.setSelectedMovieSlug);

  if (!hasHydrated) return "loading";

  return (
    <DevtoolsContext>
      <div className={cn("flex flex-col grow")}>
        <main className={cn("flex flex-col grow max-w-[512px] w-full mx-auto")}>
          <div className="flex items-center justify-center p-3">
            <div className="font-geist-mono font-light text-xs text-neutral-300">
              next-pathe
            </div>
          </div>
          <div className="flex flex-col grow relative overflow-clip">
            <Search />
            <div className="flex flex-col items-center justify-center grow mt-3 px-3">
              <div className="flex flex-col items-center gap-6">
                <div className="bg-neutral-900 p-6 rounded-full border-[1px] border-neutral-800">
                  <ClapperboardIcon className="size-14" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl font-bold">No movies</div>
                  <div className="text-md">Search and subscribe</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Drawer.Root
        open={selectedMovieSlug !== undefined}
        onOpenChange={() => setSelectedMovieSlug(undefined)}
        shouldScaleBackground
        setBackgroundColorOnScale={false}
      >
        <Drawer.Portal keepMounted>
          <Drawer.Overlay className="fixed inset-0 bg-black/80" />
          <Drawer.Content className="bg-neutral-950 text-neutral-100 fixed inset-x-0 bottom-0 h-[70vh] max-w-[512px] mx-auto rounded-t-xl border-[1px] border-neutral-800">
            <Drawer.Handle className="top-4" />
            <div className="mx-auto flex h-full max-w-sm flex-col justify-center space-y-4 px-4">
              <h1 className="font-semibold">hello, world</h1>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </DevtoolsContext>
  );
};

export default App;
