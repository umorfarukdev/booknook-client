import { Spinner } from "@/components/ui/spinner";

const BooksLoading = () => (
  <main className="flex min-h-[40vh] items-center justify-center">
    <div className="flex items-center gap-3 text-slate-600">
      <Spinner className="size-6 text-indigo-600" />
      <span>Loading books...</span>
    </div>
  </main>
);

export default BooksLoading;
