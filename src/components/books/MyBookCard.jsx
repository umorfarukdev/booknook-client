
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, UserRound } from "lucide-react";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";

const MyBooksCard = ({ book }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      {/* Book Cover */}
      <div className="relative h-64 overflow-hidden bg-slate-100 sm:h-72">
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
          <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
            <BookOpen size={48} strokeWidth={1.2} />
            <span className="text-sm">No Cover Available</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-700 shadow-sm backdrop-blur">
            {book.category}
          </span>
        </div>
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-5">

        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700">
          {book.title}
        </h2>

        <div className="my-3 flex items-center gap-2 text-sm text-slate-500">
          <UserRound size={16} />
          <span className="line-clamp-1">by {book.author}</span>
        </div>

        {/* View Details */}
        <Link
          href={`/books/${book._id}`}
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <BookOpen size={17} />
          View Details
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>

      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-3">
        <EditBookModal book={book} />
        <DeleteBookModal book={book} />
      </div>

    </article>
  );
};

export default MyBooksCard;
