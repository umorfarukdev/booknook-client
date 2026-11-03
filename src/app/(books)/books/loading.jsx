import { Spinner } from "@/components/ui/spinner";

const BooksLoading = () => (
  <main className="flex min-h-[40vh] items-center justify-center">
    <div className="flex items-center gap-3 text-slate-600">
      <Spinner className="size-6 text-blue-600 animate-spin" />
      <span>Loading books...</span>
    </div>
  </main>
);

export default BooksLoading;
