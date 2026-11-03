import { Spinner } from "@/components/ui/spinner";

export default function ProfileLoading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-3 text-slate-600">
        <Spinner className="size-6 text-blue-600 animate-spin" />
        <span className="text-sm font-medium">Loading your profile...</span>
      </div>
    </main>
  );
}

