import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleGoogleSignIn}
      className="h-12 w-full gap-2 text-base"
    >
      <FcGoogle aria-hidden="true" className="text-2xl" />
      Continue with Google
    </Button>
  );
};

export default Google;
