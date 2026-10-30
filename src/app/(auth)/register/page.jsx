"use client";
import Google from "@/components/shared/Google";
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
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

const RegisterPage = () => {

    const handleSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const signUpData = Object.fromEntries(formData.entries());
        const {data, error} = await signUp.email({
            name: signUpData.name,
            email: signUpData.email,
            password: signUpData.password,
            image: signUpData.image,
        })

        console.log(data, "signup", error, "error");
        redirect("/login")

    }
  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto my-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Register with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Field className="mb-6">
            <Google></Google>
          </Field>
          <form onSubmit={handleSignUp}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  id="image"
                  type="text"
                  name="image"
                  placeholder="Image URL"
                />
              </Field>
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
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Register</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default RegisterPage;
