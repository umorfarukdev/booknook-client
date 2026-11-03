import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BooksCard from "./BooksCard";

const NewestBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/newest-books`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load newest books: ${response.status}`);
  }

  const newestBooks = await response.json();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Fresh on the shelves
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Newest books
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-600 sm:text-base">
          Take a look at the latest books added to the BookNook community.
        </p>
      </header>

      {newestBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {newestBooks.map((book, index) => (
            <BooksCard key={index} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            No books have been added yet
          </h3>
          <p className="mt-2 text-slate-600">
            Check back soon to discover new reads.
          </p>
        </div>
      )}

      <div className="mt-10 flex justify-center sm:mt-12">
        <Link
          href="/books"
          className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          See All Books
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};

export default NewestBooks;
