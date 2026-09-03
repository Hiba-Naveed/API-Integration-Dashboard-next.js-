"use client";

import React, { useState, useMemo } from "react";
import { Check, X, Eye, EyeOff, ShieldCheck, Lock, Mail, User } from "lucide-react";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // rest of your component code here...
}

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pure Pure Pure JS Validation Rules (No external libraries)
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};

    // Name Validation
    if (!formData.name.trim()) {
      errs.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    // Email Validation (RFC 5322 Standard Regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    // Password Validation
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
  }, [formData]);

  // Form Validity
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setIsSubmitted(true);
      console.log("Submitted Data:", formData);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-800 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Join CapregSoft Portal
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            Registration Successful!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Form state validated & saved successfully.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white/50 dark:bg-gray-800/50 outline-none transition-all ${
                  touched.name && errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="name@company.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white/50 dark:bg-gray-800/50 outline-none transition-all ${
                  touched.email && errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-white/50 dark:bg-gray-800/50 outline-none transition-all ${
                  touched.password && errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-white/50 dark:bg-gray-800/50 outline-none transition-all ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
              isValid
                ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                : "bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-60"
            }`}
          >
            Submit Registration
          </button>
        </form>
      )}
    </div>
  );
}