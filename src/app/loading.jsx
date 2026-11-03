import { Spinner } from "@/components/ui/spinner";

export default function RootLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Spinner className="h-10 w-10 text-blue-600 animate-spin" />
      <p className="text-sm font-medium text-slate-500 animate-pulse">Loading...</p>
    </div>
  );
}

