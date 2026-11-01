import MyBorrowsTable from "@/components/books/MyBorrowsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/borrows/${user.email}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load borrowed books (${response.status})`, {
      cache: "no-store",
    });
  }

  const borrows = await response.json();
  console.log(borrows);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          My Borrows
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Keep track of your borrowed books and return dates.
        </p>
      </header>
      <div>
        {borrows.map((borrow) => (
          <MyBorrowsTable key={borrow._id} borrow={borrow} />
        ))}
      </div>
    </main>
  );
};

export default MyBorrowsPage;
