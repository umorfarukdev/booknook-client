import React from "react";

const reviews = [
  {
    name: "Aisha",
    quote:
      "BookNook made it easy to discover books I would never have found on my own.",
  },
  {
    name: "Daniel",
    quote:
      "The borrowing flow is smooth and the community recommendations are genuinely helpful.",
  },
  {
    name: "Sara",
    quote:
      "I love how easy it is to explore new genres and share my favorite reads with friends.",
  },
];

const Reviews = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
            Reader reviews
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Loved by our community
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-amber-400">★★★★★</div>
              <p className="text-slate-700">“{review.quote}”</p>
              <p className="mt-6 font-semibold text-slate-900">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
