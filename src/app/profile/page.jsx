import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "cn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  BookMarked,
  Mail,
  ArrowRight,
  PlusCircle,
  Library,
  ShieldCheck,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "BookNook | My Profile",
  description: "View and manage your BookNook profile, books, and borrowing activity.",
};

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    redirect("/login");
  }

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = jwtToken?.token;

  let books = [];
  let borrows = [];

  try {
    const booksRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
    if (booksRes.ok) {
      books = await booksRes.json();
    }
  } catch {
    // silently catch fetch error
  }

  try {
    const borrowsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/borrows/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
    if (borrowsRes.ok) {
      borrows = await borrowsRes.json();
    }
  } catch {
    // silently catch fetch error
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header Profile Card */}
      <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 sm:h-40" />
        <CardContent className="relative px-6 pb-6 pt-0 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20 gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-4 border-white shadow-md bg-white">
                <AvatarImage
                  src={user.image || ""}
                  alt={user.name || "User Avatar"}
                  className="rounded-2xl object-cover"
                />
                <AvatarFallback className="rounded-2xl text-2xl font-bold bg-blue-50 text-blue-700">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {user.name}
                  </h1>
                  <Badge variant="default" className="text-xs">
                    Member
                  </Badge>
                </div>
                <p className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-sm text-slate-500">
                  <Mail size={15} />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end gap-2.5">
              <Link
                href="/add-book"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-1.5")}
              >
                <PlusCircle size={15} />
                Add Book
              </Link>
              <Link
                href="/books"
                className={cn(buttonVariants({ size: "sm" }), "flex items-center gap-1.5")}
              >
                <Library size={15} />
                Explore Library
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              My Books
            </CardTitle>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <BookOpen size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {books.length}
            </div>
            <CardDescription className="mt-1 text-xs">
              Books you added to the BookNook community
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/my-books"
              className={cn(buttonVariants({ variant: "link", size: "xs" }), "px-0 text-blue-600 font-semibold flex items-center gap-1")}
            >
              Manage books <ArrowRight size={13} />
            </Link>
          </CardFooter>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Active Borrows
            </CardTitle>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <BookMarked size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {borrows.length}
            </div>
            <CardDescription className="mt-1 text-xs">
              Books currently borrowed by you
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/my-borrows"
              className={cn(buttonVariants({ variant: "link", size: "xs" }), "px-0 text-indigo-600 font-semibold flex items-center gap-1")}
            >
              View borrowed books <ArrowRight size={13} />
            </Link>
          </CardFooter>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">
              Membership
            </CardTitle>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <ShieldCheck size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">Active</div>
            <CardDescription className="mt-1 text-xs">
              Full privileges: borrow, add & manage books
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              ✓ Verified BookNook Reader
            </span>
          </CardFooter>
        </Card>
      </div>

      {/* Account Details & Recent Activity */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Account Details Card */}
        <Card className="border border-slate-200 bg-white shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">
              Account Details
            </CardTitle>
            <CardDescription>
              Your personal library account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full Name
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {user.name || "N/A"}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {user.email}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Account Status
              </p>
              <div className="mt-1">
                <Badge variant="secondary">Verified Account</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quick Navigation
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/my-books"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-start gap-2")}
                >
                  <BookOpen size={15} /> My Added Books ({books.length})
                </Link>
                <Link
                  href="/my-borrows"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-start gap-2")}
                >
                  <BookMarked size={15} /> My Borrows ({borrows.length})
                </Link>
                <Link
                  href="/add-book"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-start gap-2")}
                >
                  <PlusCircle size={15} /> Add a New Book
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Books & Borrows */}
        <div className="space-y-8 lg:col-span-2">
          {/* Recent Added Books */}
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Books Added by You
                </CardTitle>
                <CardDescription>
                  Recent additions to the community library
                </CardDescription>
              </div>
              <Link
                href="/my-books"
                className={buttonVariants({ variant: "outline", size: "xs" })}
              >
                View All
              </Link>
            </CardHeader>
            <CardContent>
              {books.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                  <p className="text-sm text-slate-500">
                    You have not added any books yet.
                  </p>
                  <Link
                    href="/add-book"
                    className={cn(buttonVariants({ size: "sm" }), "mt-3 inline-flex")}
                  >
                    Add Your First Book
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {books.slice(0, 4).map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50"
                    >
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-slate-100">
                        {b.imageUrl ? (
                          <Image
                            src={b.imageUrl}
                            alt={b.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                            No Cover
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {b.title}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          by {b.author}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-[10px]">
                          {b.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Borrows */}
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Currently Borrowed
                </CardTitle>
                <CardDescription>
                  Keep track of due dates for borrowed books
                </CardDescription>
              </div>
              <Link
                href="/my-borrows"
                className={buttonVariants({ variant: "outline", size: "xs" })}
              >
                Manage Borrows
              </Link>
            </CardHeader>
            <CardContent>
              {borrows.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                  <p className="text-sm text-slate-500">
                    You currently have no borrowed books.
                  </p>
                  <Link
                    href="/books"
                    className={cn(buttonVariants({ size: "sm" }), "mt-3 inline-flex")}
                  >
                    Browse Available Books
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {borrows.slice(0, 4).map((borrow) => (
                    <div
                      key={borrow._id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-slate-100">
                          {borrow.imageUrl ? (
                            <Image
                              src={borrow.imageUrl}
                              alt={borrow.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                              No Cover
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {borrow.title}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                            <Clock size={12} />
                            <span>Return by {formatDate(borrow.returnDate)}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/my-borrows"
                        className={buttonVariants({ variant: "outline", size: "xs" })}
                      >
                        Details
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
