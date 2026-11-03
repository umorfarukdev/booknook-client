import React from "react";

const steps = [
  {
    title: "Browse",
    text: "Search by title, genre, author, or mood to find the perfect next read.",
  },
  {
    title: "Borrow",
    text: "Request a book in seconds and keep track of your reading list in one place.",
  },
  {
    title: "Read & Return",
    text: "Enjoy your book, leave a review, and return it when you are ready for the next pick.",
  },
];

const Borrowing = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
            How it works
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Borrowing made simple
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                {index + 1}
              </div>
              <h4 className="mb-3 text-xl font-semibold text-slate-900">
                {step.title}
              </h4>
              <p className="text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Borrowing;
