"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const EditBookModal = ({ book }) => {
  const router = useRouter();
  const handleEditBook = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const updateBook = {
      title: formData.get("title"),
      author: formData.get("author"),
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl"),
      totalCopies: Number(formData.get("totalCopies")),
      description: formData.get("description"),
    };

    const {data, error} = await authClient.token()
    const token = data?.token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateBook),
      },
    );

    if (!res.ok) {
      throw new Error(data.message || `Failed to update book (${res.status})`);
    }
    const updatedBook = await res.json();

    console.log("update book successfull", updatedBook);
    router.refresh();
    toast.success("Book updated successfully.");
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit Book</Button>} />

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update your book information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEditBook} className="grid gap-4 sm:grid-cols-2">
          <FieldGroup className="contents">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={book.title}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="author">Author</FieldLabel>
              <Input
                id="author"
                name="author"
                defaultValue={book.author}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <select
                id="category"
                name="category"
                defaultValue={book.category}
                required
                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={book.imageUrl}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="totalCopies">Total Copies</FieldLabel>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="1"
                defaultValue={book.totalCopies ?? 1}
                required
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                defaultValue={book.description}
                rows={5}
                required
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="sm:col-span-2">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
