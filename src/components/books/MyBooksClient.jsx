"use client";
import BooksCard from "./BooksCard";
import DeleteBookModal from "./DeleteBookModal";
import EditBookModal from "./EditBookModal";

const MyBooksClient = ({books}) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      {/* Your books grid */}
      {books.map((book) => (
        <div key={book._id}>
          <BooksCard book={book} />

          <div className="mt-2 px-6 flex justify-between gap-2">
            <EditBookModal book={book}></EditBookModal>

            <DeleteBookModal book={book}></DeleteBookModal>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooksClient;
