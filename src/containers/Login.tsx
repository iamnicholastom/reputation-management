import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { AuthFormData, FormErrors } from "./Register";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../store/features/auth";

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const from = (location.state as LocationState)?.from?.pathname || "/";

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      await login(formData).unwrap();
      navigate(from, { replace: true }); // Redirect to home page after successful registration
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setErrors({
        ...errors,
        submit:
          error.data?.message || "Login failed. Please check your credentials.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              htmlFor="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              htmlFor="password"
            />
          </div>
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
