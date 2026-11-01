const ReturnBook = ({ borrows }) => {
  const handleReturnBook = async () => {
    console.log("return book");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrows._id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();
    if (res.ok) {
        toast.success("Book returned successfully.");
    } else{
        toast.error(data.message || "Failed to return book.");
    }
  };

  return (
    <button
      onClick={handleReturnBook}
      className="whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Return Book
    </button>
  );
};

export default ReturnBook;
