
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import MyBooksClient from "./MyBooksClient";

// const MyBooksManager = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;

//   if (!user?.email) {
//     return <p>Please login to see your books.</p>;
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/books/${user.email}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error(`Failed to fetch books (${res.status})`);
//   }

//   const books = await res.json();

//   return <MyBooksClient myBooks={myBooks} />;
// };

// export default MyBooksManager;





// // import { toast } from "react-toastify";
// // import BooksCard from "./BooksCard";
// // import { auth } from "@/lib/auth";

// // const categories = ["Fiction", "Science", "History", "Kids", "Others"];

// // const MyBooksManager = async () => {
// //   const session = await auth.api.getSession();
// //   const user = session?.user;

// //     if (!user?.email) {
// //     return <p>Please login to see your books.</p>;
// //   }

// //   const res = await fetch(
// //     `${process.env.NEXT_PUBLIC_API_URL}/books/${user.email}`,
// //     { cache: "no-store" }
// //   );

// //   const books = await res.json();

// //   if (!res.ok) {
// //     throw new Error(`Failed to update book (${res.status})`);
// //   }

// //   return (
// //     <>
// //       {books.length > 0 ? (
// //         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
// //           {books.map((book, index) => (
// //             <div key={book._id} className="flex flex-col">
// //               <BooksCard key={index} book={book} />
// //               <div className="mt-3 grid grid-cols-2 gap-3">
// //                 <button
// //                   type="button"
// //                   onClick={() => setEditingBook(book)}
// //                   className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => setDeletingBook(book)}
// //                   className="rounded-lg border border-red-200 bg-white px-4 py-2.5 font-semibold text-red-700 transition hover:bg-red-50"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
// //           <h2 className="text-xl font-semibold text-slate-900">
// //             You haven’t added any books yet
// //           </h2>
// //           <p className="mt-2 text-slate-600">Books you add will appear here.</p>
// //         </div>
// //       )}

// //       {/* {editingBook && (
// //         <EditBookModal
// //         books={books}
// //         />
// //       )}
// //       {deletingBook && (
// //         <DeleteBookModal
// //           books={books}

// //         />
// //       )} */}
// //     </>
// //   );
// // };

// // export default MyBooksManager;
