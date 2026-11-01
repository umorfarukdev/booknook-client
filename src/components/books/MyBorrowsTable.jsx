
"use client";

import Image from "next/image";
import { useState } from "react";
import ReturnBook from "./ReturnBook";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MyBorrowsTable = ({ initialBorrows }) => {
  const [borrows, setBorrows] = useState(initialBorrows);

  const handleReturnBook = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrows._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Failed to return book (${res.status})`);
    }
  };

  if (borrows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          You haven’t borrowed any books yet
        </h2>
        <p className="mt-2 text-slate-600">
          Books you borrow will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[700px] divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Book
            </th>
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Title
            </th>
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Borrow date
            </th>
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Return date
            </th>
            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {borrows.map((borrow) => {
            const image = borrow.bookImage || borrow.imageUrl;

            return (
              <tr key={borrow._id}>
                <td className="px-5 py-4">
                  {image ? (
                    <div className="relative h-16 w-12 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={image}
                        alt={`Cover of ${borrow.title}`}
                        fill
                        unoptimized
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-12 items-center justify-center rounded-md bg-slate-100 text-center text-[10px] text-slate-500">
                      No cover
                    </div>
                  )}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-900">
                  {borrow.title}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatDate(borrow.borrowDate)}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {formatDate(borrow.returnDate)}
                </td>

                <td className="px-5 py-4">
                  <ReturnBook
                    borrow={borrow}
                    onReturn={handleReturnBook}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyBorrowsTable;
