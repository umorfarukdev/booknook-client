import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookX, Home } from "lucide-react";
import { cn } from "cn";

export const metadata = {
  title: "BookNook | 404 Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-inner">
        <BookX size={48} strokeWidth={1.5} />
      </div>

      <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
        404 Error
      </p>

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-base text-slate-600 sm:text-lg">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps it was moved, deleted, or never existed.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          )}
        >
          <Home size={18} />
          Back to Home
        </Link>
        <Link
          href="/books"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-xl px-6 py-3 font-semibold transition"
          )}
        >
          Browse Books
        </Link>
      </div>
    </main>
  );
}

