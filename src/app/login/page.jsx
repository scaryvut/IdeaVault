"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import 'animate.css';

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ================= EMAIL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      toast.success("Login successful");

      form.reset();

      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("redirect") || "/";

      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("redirect") || "/";

      toast.info("Redirecting to Google...");

      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });

    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl animate__animated animate__backInUp">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-black text-white p-14">
          <span className="uppercase tracking-[4px] text-sm text-gray-400 mb-6">
            Welcome Back
          </span>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Continue Exploring Innovative Startup Ideas
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Log in to interact with creators, discover new innovations,
            and manage your startup idea collections.
          </p>

          <div className="flex gap-10 mt-12">
            <div>
              <h2 className="text-3xl font-bold">5K+</h2>
              <p className="text-gray-400 mt-2">Ideas Shared</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">1K+</h2>
              <p className="text-gray-400 mt-2">Active Creators</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14">

          <div className="mb-10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Login
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Access your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-black text-white font-semibold hover:scale-[1.01] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
                className="w-5 h-5"
              />

              <span className="font-medium text-gray-700 dark:text-gray-200">
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            Don’t have an account?{" "}
            <Link href="/register" className="text-black dark:text-white font-semibold hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;