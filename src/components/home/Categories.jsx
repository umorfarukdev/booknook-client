import React from "react";

const categories = [
  { name: "Fiction", count: "1.2k books" },
  { name: "Fantasy", count: "980 books" },
  { name: "Self Growth", count: "760 books" },
  { name: "Classics", count: "620 books" },
  { name: "Mystery", count: "540 books" },
  { name: "Nonfiction", count: "430 books" },
];

const Categories = () => {
  return (
    <section className="bg-slate-900 px-4 max-w-7xl mx-auto rounded-2xl py-16 text-white sm:px-6 lg:px-8">
      <div className="">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
            Top categories
          </p>
          <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Find books for every mood
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-3xl border border-slate-700 bg-slate-800/80 p-5 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <p className="text-lg font-semibold">{category.name}</p>
              <p className="mt-2 text-sm text-slate-300">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
