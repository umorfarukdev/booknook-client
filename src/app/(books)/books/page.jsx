import BooksCard from "@/components/books/BooksCard";
import React from "react";

const BooksPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  const booksData = await res.json();
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">All Books</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Find your next favorite read.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {booksData.map((book) => (
          <BooksCard key={book._id} book={book} />
        ))}
      </div>
    </main>
  );
};

export default BooksPage;
