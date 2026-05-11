import { SearchPanel } from "@/components/SearchPanel";

export type Language = "Inglês" | "Alemão";

export function SearchPage() {
  return (
    <div className="flex-1 gap-10 flex flex-col items-center justify-center px-6 w-full max-w-[600px] mx-auto">
      <div className="w-full">
        <SearchPanel />
      </div>
    </div>
  );
}
