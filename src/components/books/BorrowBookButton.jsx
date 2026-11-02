"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const BorrowBookButton = ({ book, userEmail }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [borrowDate] = useState(getLocalDate);

  const handleBorrowBook = async (event) => {
    event.preventDefault();

    if (!userEmail) {
      router.push("/login");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const borrowsData = {
      userEmail,
      ...book,
      ...data,
    };
    setIsSubmitting(true);
    try {

      const { data, error } = await authClient.token();
      const token = data?.token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(borrowsData),
        },
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || `Failed to borrow book (${response.status})`,
        );
      }

      toast.success("Book borrowed successfully.");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to borrow book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={Number(book.availableCopies ?? 0) <= 0}
        onClick={() => {
          if (!userEmail) {
            router.push("/login");
            return;
          }
          setIsOpen(true);
        }}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Borrow This Book
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="borrow-book-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <h2
              id="borrow-book-title"
              className="text-2xl font-bold text-slate-900"
            >
              Borrow {book.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Confirm your details and choose when you’ll return this book.
            </p>

            <form onSubmit={handleBorrowBook} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                User email
                <input
                  type="email"
                  value={userEmail}
                  readOnly
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-600"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Borrow date
                <input
                  type="date"
                  name="borrowDate"
                  value={borrowDate}
                  readOnly
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-600"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Return date
                <input
                  name="returnDate"
                  type="date"
                  min={borrowDate}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5"
                />
              </label>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Confirm borrow"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default BorrowBookButton;
