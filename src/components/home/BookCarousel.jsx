"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Discover fresh favorites",
    text: "Explore handpicked books that match your taste and spark your next great reading session.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80",
    tag: "New arrivals",
  },
  {
    id: 2,
    title: "Build your reading habit",
    text: "From thoughtful nonfiction to unforgettable fiction, find titles that keep you growing every day.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
    tag: "Trending now",
  },
  {
    id: 3,
    title: "Find your next obsession",
    text: "Browse a world of stories, ideas, and discoveries curated for readers who love to explore.",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1400&q=80",
    tag: "Reader picks",
  },
];

const BookCarousel = () => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="pb-12!"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative flex min-h-[360px] items-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-[0_30px_65px_-30px_rgba(15,23,42,0.7)] sm:min-h-[420px]"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.8), rgba(15,23,42,0.25)), url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="relative z-10">
                  <div className="max-w-xl p-8 sm:p-12 lg:p-16">
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                      {slide.tag}
                    </span>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {slide.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-base text-slate-200 sm:text-lg">
                      {slide.text}
                    </p>
                    <Link
                      href="/books"
                      className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Browse Books
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BookCarousel;