"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import 'animate.css';

const RegisterPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const image = form.photo.value;
    const password = form.password.value;

    // ================= VALIDATION =================

    if (password.length < 6) {
      setLoading(false);
      return toast.error(
        "Password must be at least 6 characters long"
      );
    }

    if (!/[A-Z]/.test(password)) {
      setLoading(false);
      return toast.error(
        "Password must include at least one uppercase letter"
      );
    }

    if (!/[a-z]/.test(password)) {
      setLoading(false);
      return toast.error(
        "Password must include at least one lowercase letter"
      );
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image,
      });

      if (error) {
        setLoading(false);
        return toast.error(
          error.message || "Registration failed"
        );
      }

      console.log(data);

      form.reset();

      toast.success("Account created successfully");

      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE REGISTER =================
  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      toast.info("Redirecting to Google...");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
      toast.error("Google signup failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl animate__animated animate__backInUp">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-black text-white p-14">

          <span className="uppercase tracking-[4px] text-sm text-gray-400 mb-6">
            Join IdeaVault
          </span>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Share Your Startup Ideas With The World
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Create your account to publish innovative ideas,
            connect with creators, and explore future-changing startups.
          </p>

          <div className="flex gap-10 mt-12">

            <div>
              <h2 className="text-3xl font-bold">
                5K+
              </h2>

              <p className="text-gray-400 mt-2">
                Ideas Shared
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                1K+
              </h2>

              <p className="text-gray-400 mt-2">
                Active Creators
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14">

          {/* HEADER */}
          <div className="mb-10">

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Register
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Create your IdeaVault account
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* PHOTO */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Photo URL
              </label>

              <input
                type="text"
                name="photo"
                placeholder="Enter photo URL"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-black text-white font-semibold hover:scale-[1.01] transition disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4">

              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

              <span className="text-sm text-gray-500">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>

            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >

              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
                className="w-5 h-5"
              />

              <span className="font-medium text-gray-700 dark:text-gray-200">
                {googleLoading
                  ? "Connecting..."
                  : "Continue with Google"}
              </span>

            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">

            Already have an account?{" "}

            <Link
              href="/login"
              className="text-black dark:text-white font-semibold hover:underline"
            >
              Login
            </Link>

          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;