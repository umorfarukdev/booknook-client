import MyBorrowsTable from "@/components/books/MyBorrowsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "BookNook | My Borrows",
  description: "Keep track of your borrowed books and return dates.",
};

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = jwtToken?.token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/borrows/${user.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load borrowed books (${response.status})`);
  }

  const borrows = await response.json();

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

      {borrows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No Borrowed Books
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            You have not borrowed any books yet.
          </p>
        </div>
      ) : (
        <div>
          <MyBorrowsTable borrows={borrows} />
        </div>
      )}
    </main>
  );
};

export default MyBorrowsPage;
