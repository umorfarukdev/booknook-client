import Categories from "@/components/home/Categories.jsx";
import BookCarousel from "../components/home/BookCarousel.jsx";
import Reviews from "@/components/home/Reviews.jsx";
import Borrowing from "@/components/home/Borrowing.jsx";
import NewestBooks from "@/components/books/NewestBooks.jsx";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <BookCarousel />
      <NewestBooks></NewestBooks>
      <Borrowing></Borrowing>
      <Categories></Categories>
      <Reviews></Reviews>
    </main>
  );
}
