import BorrowBookButton from "@/components/books/BorrowBookButton";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { bookId } = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`);
    if (res.ok) {
      const book = await res.json();
      if (book?.title) {
        return {
          title: `BookNook | ${book.title}`,
          description: book.description || `Read about ${book.title} on BookNook.`,
        };
      }
    }
  } catch {
    // fallback
  }
  return {
    title: "BookNook | Book Details",
    description: "View book details in the BookNook library.",
  };
}

const BookDetailsPage = async ({ params }) => {
  const { bookId } = await params;

  const jwtToken = await auth.api.getToken({ headers: await headers() });
  const token = jwtToken?.token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      },
      cache: "no-store",
    },
  );

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`Failed to load books: ${response.status}`);
  }

  const book = await response.json();

  if (!book) {
    notFound();
  }

  const availableCopies = Number(book.availableCopies ?? 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
          <p className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
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
            <BorrowBookButton
              book={book}
              userName={session?.user?.name}
              userEmail={session?.user?.email ?? null}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default BookDetailsPage;
