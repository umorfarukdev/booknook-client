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
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const isValidPassword = hasUppercase && hasLowercase && hasMinLength;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isValidPassword) {
      toast.error("Please enter a valid password.");
      return;
    }
    try {
      const formData = new FormData(e.target);
      const signUpData = Object.fromEntries(formData.entries());

      const result = await signUp.email({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        image: signUpData.image,
      });

      if (result?.error) {
        toast.error(result.error.message || "Registration failed!");
        return;
      }

      toast.success("Registration successful! Please login.");

      setTimeout(() => {
        redirect("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="mx-auto my-10 flex w-full max-w-sm flex-col gap-6 px-4 sm:px-0">
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
                <FieldLabel htmlFor="inline-end-input">Password</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    name="password"
                    id="inline-end-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputGroupAddon
                    align="inline-end"
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupAddon>
                </InputGroup>

                <FieldDescription>
                  <span
                    className={hasUppercase ? "text-green-600" : "text-red-500"}
                  >
                    {hasUppercase ? "✓" : "✗"} One uppercase letter
                  </span>
                  <br />
                  <span
                    className={hasLowercase ? "text-green-600" : "text-red-500"}
                  >
                    {hasLowercase ? "✓" : "✗"} One lowercase letter
                  </span>
                  <br />
                  <span
                    className={hasMinLength ? "text-green-600" : "text-red-500"}
                  >
                    {hasMinLength ? "✓" : "✗"} At least 6 characters
                  </span>
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="h-12 w-full text-base">
                  Register
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
