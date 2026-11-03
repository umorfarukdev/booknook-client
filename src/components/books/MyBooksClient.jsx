"use client";
import MyBooksCard from "./MyBookCard";

const MyBooksClient = ({books}) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {/* Your books grid */}
      {books.map((book) => (
        <div key={book._id}>
          <MyBooksCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default MyBooksClient;
