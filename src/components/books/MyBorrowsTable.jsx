"use client";
import Image from "next/image";
import ReturnBook from "./ReturnBook";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MyBorrowsTable = ({ borrows }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="px-5 py-4 font-semibold uppercase text-xs">
                Book
              </TableHead>

              <TableHead className="px-5 py-4 font-semibold uppercase text-xs">
                Title
              </TableHead>

              <TableHead className="px-5 py-4 font-semibold uppercase text-xs">
                Borrow Date
              </TableHead>

              <TableHead className="px-5 py-4 font-semibold uppercase text-xs">
                Return Date
              </TableHead>

              <TableHead className="px-5 py-4 text-center font-semibold uppercase text-xs">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {borrows.map((borrow) => (
              <TableRow
                key={borrow._id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <TableCell className="px-5 py-3">
                  <div className="relative h-16 w-12 overflow-hidden rounded-md border bg-slate-100">
                    {borrow.imageUrl ? (
                      <Image
                        src={borrow.imageUrl}
                        alt={`Cover of ${borrow.title}`}
                        fill
                        unoptimized
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="min-w-[180px] px-5 py-3">
                  <p className="font-semibold text-slate-800">
                    {borrow.title}
                  </p>
                </TableCell>

                <TableCell className="whitespace-nowrap px-5 py-3 text-sm text-slate-600">
                  {formatDate(borrow.borrowDate)}
                </TableCell>

                <TableCell className="whitespace-nowrap px-5 py-3 text-sm text-slate-600">
                  {formatDate(borrow.returnDate)}
                </TableCell>

                <TableCell className="px-5 py-3 text-center">
                  <ReturnBook borrow={borrow} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyBorrowsTable;
