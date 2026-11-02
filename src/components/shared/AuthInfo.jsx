"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "../ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthInfo = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <Spinner />;
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-500"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn">
            Login
          </Link>

          <Link href="/register" className="btn">
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthInfo;
