"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import Google from "@/components/shared/Google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const signInData = Object.fromEntries(formData.entries());

      const result = await signIn.email({
        email: signInData.email,
        password: signInData.password,
      });

      if (result?.error) {
        toast.error(result.error.message || "Login failed!");
        return;
      }

      if (result?.data) {
        toast.success("Login successful!");

        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  return (
    <div className="mx-auto my-10 flex w-full max-w-sm flex-col gap-6 px-4 sm:px-0">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field className="mb-6">
            <Google></Google>
          </Field>
          <form onSubmit={handleSignIn}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="h-12 w-full text-base">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
