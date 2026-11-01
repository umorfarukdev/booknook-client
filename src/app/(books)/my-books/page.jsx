import BooksCard from "@/components/books/BooksCard";
import MyBooksClient from "@/components/books/MyBooksClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (!user.email) {
    throw new Error("The signed-in user does not have an email address");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${user.email}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load books: ${response.status}`);
  }

  const books = await response.json();
  // if (!Array.isArray(books)) {
  //   throw new Error("The books API returned an invalid response");
  // }

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

      <MyBooksClient books={books} />
    </main>
  );
};

export default MyBooksPage;
