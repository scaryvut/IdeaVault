"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      
      <div className="text-center max-w-md">

        {/* Visual */}
        <div className="text-8xl font-extrabold text-gray-300 dark:text-gray-700 mb-6">
          404
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page not found
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back to discovering ideas instead.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition"
          >
            Go Home
          </Link>

          <Link
            href="/ideas"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Explore Ideas
          </Link>

        </div>

        {/* Optional helper links */}
        <div className="mt-10 text-sm text-gray-500 dark:text-gray-500 space-x-4">
          <Link href="/add-idea" className="hover:underline">
            Add Idea
          </Link>

          <span>•</span>

          <Link href="/my-ideas" className="hover:underline">
            My Ideas
          </Link>
        </div>

      </div>
    </div>
  );
}