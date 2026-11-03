import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const BooksCard = ({ book }) => {

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-64 lg:h-72">
        {book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`No cover available for ${book.title}`}
            className="flex h-full items-center justify-center text-sm text-slate-500"
          >
            Cover image unavailable
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-sm font-semibold text-blue-600">{book.category}</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700 sm:text-xl">
          {book.title}
        </h2>
        <p className="my-2 text-sm text-slate-600">by {book.author}</p>

        <Link
          href={`/books/${book._id}`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <BookOpen size={17} />
          View Details
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </article>
  );
};

export default BooksCard;
