import Categories from "@/components/home/Categories.jsx";
import BookCarousel from "../components/home/BookCarousel.jsx";
import Reviews from "@/components/home/Reviews.jsx";
import Borrowing from "@/components/home/Borrowing.jsx";
import NewestBooks from "@/components/books/NewestBooks.jsx";

export const metadata = {
  title: "BookNook | Home",
  description: "A community library to discover, borrow, and share books.",
};

export default function Home() {
  return (
    <main className="min-h-screen min-w-0 w-full max-w-7xl mx-auto overflow-x-clip">
      <BookCarousel />
      <NewestBooks></NewestBooks>
      <Borrowing></Borrowing>
      <Categories></Categories>
      <Reviews></Reviews>
    </main>
  );
}
