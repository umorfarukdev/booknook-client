import { signIn } from "@/lib/auth-client";
import { Button } from "@base-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };
  return (
    <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
      <div className="flex btn rounded-xl justify-center items-center gap-1">
        <FcGoogle className="text-2xl"></FcGoogle>
        <span className="text-xl">Continue with Google</span>
      </div>
    </Button>
  );
};

export default Google;
