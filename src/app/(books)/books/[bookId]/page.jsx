import Image from "next/image";
import { notFound } from "next/navigation";

const BookDetailsPage = async ({ params }) => {
  const { bookId } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`);

  if (!response.ok) {
    throw new Error(`Failed to load books: ${response.status}`);
  }

  const book = await response.json();

  console.log(book);
//   const book = books.find((item) => String(item._id) === bookId);

  if (!book) {
    notFound();
  }

  const availableCopies = Number(book.availableCopies ?? 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
        <div className="relative min-h-80 bg-slate-100 sm:min-h-[480px]">
          {book.imageUrl ? (
            <Image
              src={book.imageUrl}
              alt={`Cover of ${book.title}`}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div
              role="img"
              aria-label={`No cover available for ${book.title}`}
              className="flex h-full min-h-80 items-center justify-center text-sm text-slate-500"
            >
              Cover image unavailable
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:p-12">
          <p className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
            {book.category}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {book.title}
          </h1>
          <p className="mt-2 text-lg text-slate-600">by {book.author}</p>

          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              About this book
            </h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">
              {book.description || "No description available for this book."}
            </p>
          </section>

          <div className="mt-8 border-t border-slate-200 pt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Added by
            </h2>
            <p className="mt-2 font-medium text-slate-900">
              {book.userName || book.userEmail || "BookNook community member"}
            </p>
            {book.userName && book.userEmail && (
              <p className="mt-1 text-sm text-slate-600">{book.userEmail}</p>
            )}
          </div>

          <div className="mt-auto pt-8">
            <p className="mb-3 text-sm text-slate-600">
              {availableCopies > 0
                ? `${availableCopies} ${availableCopies === 1 ? "copy" : "copies"} available`
                : "No copies currently available"}
            </p>
            <button
              type="button"
              disabled={availableCopies <= 0}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Borrow This Book
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BookDetailsPage;
