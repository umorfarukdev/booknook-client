"use client";
import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DeleteBookModal({ book }) {
  const router = useRouter();
  const handleBookDelete = async () => {
    const { data } = await authClient.token();
    const token = data?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to delete book.");
    }
    router.refresh();
    toast.success("Book deleted successfully.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete Book</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            {book.title} will be permanently removed from the library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBookDelete} variant="destructive">
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
