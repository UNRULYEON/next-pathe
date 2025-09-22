import { ClapperboardIcon } from "lucide-react";
import { MovieDetails, Search } from "@/components";
import { DevtoolsContext } from "@/contexts";
import { useStore } from "@/store";
import { cn } from "@/utils";

const App = () => {
  const hasHydrated = useStore((state) => state._hasHydrated);

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
                  <div className="text-md max-w-64 text-center">
                    Search and select theaters you want notifications for
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MovieDetails />
    </DevtoolsContext>
  );
};

export default App;
