"use client";

import React, { useState, useMemo } from "react";
import { X, Eye, EyeOff, ShieldCheck, Lock, Mail, User, Check } from "lucide-react";

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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Password Requirements Check
  const passwordRules = useMemo(() => {
    return {
      minLength: formData.password.length >= 8,
      upperCase: /[A-Z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
    };
  }, [formData.password]);

  // Validation Rules
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};

    // 1. Name: At least 2 words
    const trimmedName = formData.name.trim();
    const nameRegex = /^[a-zA-Z]+(\s+[a-zA-Z]+)+$/;

    if (!trimmedName) {
      errs.name = "Name is required";
    } else if (!nameRegex.test(trimmedName)) {
      errs.name = "Please enter full name (at least 2 words, e.g. Hiba Khan)";
    }

    // 2. Email: Must end with @gmail.com, no numbers after @
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (formData.email.includes("@") && /\d/.test(formData.email.split("@")[1])) {
      errs.email = "No numbers allowed after '@' symbol";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Email must be a valid @gmail.com address";
    }

    // 3. Password: All rules must pass
    const isPasswordValid =
      passwordRules.minLength &&
      passwordRules.upperCase &&
      passwordRules.number &&
      passwordRules.specialChar;

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (!isPasswordValid) {
      errs.password = "Password criteria not met";
    }

    // 4. Confirm Password
    if (!formData.confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
  }, [formData, passwordRules]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

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
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Create Account
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Please enter your details to register
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-semibold text-emerald-400">
            Registration Successful!
          </h3>
          <p className="text-sm text-slate-300">
            Your account has been created successfully.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="Hiba Khan"
                className={`w-full pl-11 pr-4 py-2.5 text-sm rounded-lg border bg-slate-800/80 text-white outline-none transition-all placeholder:text-slate-500 ${
                  touched.name && errors.name
                    ? "border-amber-500/80 focus:ring-2 focus:ring-amber-500/20"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1">
                <X className="w-3.5 h-3.5 shrink-0" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="hiba2@gmail.com"
                className={`w-full pl-11 pr-4 py-2.5 text-sm rounded-lg border bg-slate-800/80 text-white outline-none transition-all placeholder:text-slate-500 ${
                  touched.email && errors.email
                    ? "border-amber-500/80 focus:ring-2 focus:ring-amber-500/20"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1">
                <X className="w-3.5 h-3.5 shrink-0" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleBlur("password")}
                onBlur={() => handleBlur("password")}
                placeholder="••••••••"
                className={`w-full pl-11 pr-11 py-2.5 text-sm rounded-lg border bg-slate-800/80 text-white outline-none transition-all placeholder:text-slate-500 ${
                  touched.password && errors.password
                    ? "border-amber-500/80 focus:ring-2 focus:ring-amber-500/20"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password checklist ONLY shows when user interacts with password field */}
            {(touched.password || formData.password.length > 0) && (
              <div className="mt-2.5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-1.5 text-xs">
                <p className="font-medium text-slate-400 mb-1">Password requirements:</p>
                
                <div className={`flex items-center gap-2 transition-colors ${passwordRules.minLength ? "text-emerald-400" : "text-amber-400/90"}`}>
                  {passwordRules.minLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 8 characters long</span>
                </div>

                <div className={`flex items-center gap-2 transition-colors ${passwordRules.upperCase ? "text-emerald-400" : "text-amber-400/90"}`}>
                  {passwordRules.upperCase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 uppercase letter (A-Z)</span>
                </div>

                <div className={`flex items-center gap-2 transition-colors ${passwordRules.number ? "text-emerald-400" : "text-amber-400/90"}`}>
                  {passwordRules.number ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 number (0-9)</span>
                </div>

                <div className={`flex items-center gap-2 transition-colors ${passwordRules.specialChar ? "text-emerald-400" : "text-amber-400/90"}`}>
                  {passwordRules.specialChar ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>At least 1 special character (!@#$%^&*)</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="••••••••"
                className={`w-full pl-11 pr-11 py-2.5 text-sm rounded-lg border bg-slate-800/80 text-white outline-none transition-all placeholder:text-slate-500 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-amber-500/80 focus:ring-2 focus:ring-amber-500/20"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1">
                <X className="w-3.5 h-3.5 shrink-0" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg font-semibold text-sm text-white transition-all shadow-lg ${
              isValid
                ? "bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-indigo-500/25"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
            }`}
          >
            Create Account
          </button>
        </form>
      )}
    </div>
  );
}