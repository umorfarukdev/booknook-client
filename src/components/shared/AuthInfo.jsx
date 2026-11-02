"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@base-ui/react";
import Link from "next/link";
import React from "react";
import { Spinner } from "../ui/spinner";

const AuthInfo = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <Spinner></Spinner>;
  }
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <>
      {session?.user ? (
        <>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login" className="btn">
            Login
          </Link>
          <Link href="/register" className="btn">
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default AuthInfo;
