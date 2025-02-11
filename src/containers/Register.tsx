import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useRegisterMutation } from "../store/features/auth";

export interface AuthFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register(formData).unwrap();
      navigate("/"); // Redirect to home page after successful registration
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setErrors({
        ...errors,
        submit: error.data?.message || "Registration failed. Please try again.",
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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              htmlFor="email"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              htmlFor="password"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already registered? </span>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
