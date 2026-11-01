"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AlertDialogBasic = ({ borrow }) => {
  // console.log(borrow);
  const router = useRouter();
  const handleReturnBook = async () => {
    console.log("return book");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrow._id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();
    console.log(data);
    router.refresh();
    console.log("borrow retuned successfull");
    toast.success("Book returned successfully.");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Return Book</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{borrow.title}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReturnBook}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBasic;
