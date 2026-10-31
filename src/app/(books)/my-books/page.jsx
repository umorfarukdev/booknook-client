import BooksCard from "@/components/books/BooksCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user

  if (!user) {
    redirect("/login");
  }

  if (!user.email) {
    throw new Error("The signed-in user does not have an email address");
  }

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!apiUrl) {
//     throw new Error("NEXT_PUBLIC_API_URL is not configured");
//   }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${user.email}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load books: ${response.status}`);
  }

  const myBooks = await response.json();

  console.log(myBooks);


//   const myBooks = Array.isArray(booksResponse)
//     ? booksResponse
//     : booksResponse && Array.isArray(booksResponse.books)
//       ? booksResponse.books
//       : null;

//   if (!Array.isArray(myBooks)) {
//     throw new Error("The books API returned an invalid response");
//   }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          My Books
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Books you have added to the BookNook library.
        </p>
      </header>

      {myBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {myBooks.map((book) => (
            <BooksCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            You haven’t added any books yet
          </h2>
          <p className="mt-2 text-slate-600">
            Books you add will appear here.
          </p>
        </div>
      )}
    </main>
  );
};

export default MyBooksPage;
