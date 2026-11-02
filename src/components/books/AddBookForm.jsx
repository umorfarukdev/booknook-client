"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";


const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookForm({ user }) {
  const [loading, setLoading] = useState(false);

  const handleAddBook = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookData = Object.fromEntries(formData.entries());

    const date = new Date();

    const totalCopies = Number(formData.get("totalCopies"));

    if (totalCopies < 1) {
      toast.error("Total copies must be at least 1");
      return;
    }

    const addBookData = {
      userName: user.name,
      userEmail: user.email,
      title: bookData.title,
      author: bookData.author,
      category: bookData.category,
      imageUrl: bookData.imageUrl,
      description: bookData.description,
      totalCopies,
      availableCopies: totalCopies,
      date,
    };

    const { data, error } = await authClient.token();
    const token = data?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addBookData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add book");
    }

    if (res.ok) {
      toast.success("Book added successfully!");
      form.reset();
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add a New Book</h1>
        <p className="mt-2 text-gray-500">
          Add a new book to your BookNook library.
        </p>
      </div>

      <form onSubmit={handleAddBook} className="space-y-5">
        {/* Book Title */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter book title"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Author */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            name="author"
            placeholder="Enter author name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Book Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/book-image.jpg"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            placeholder="Write a short description about this book..."
            required
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Total Copies */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Total Copies
          </label>
          <input
            type="number"
            name="totalCopies"
            min="1"
            defaultValue="1"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Added By */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Added By
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              User Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
