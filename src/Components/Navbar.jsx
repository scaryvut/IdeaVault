"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    document.documentElement.classList.toggle(
      "dark",
      savedTheme === "dark"
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  return (
    <header className="relative z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold text-black dark:text-white">
          IdeaHub
        </div>

        {/* Nav */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ideas">Ideas</Link></li>
          <li><Link href="/add-idea">Add Idea</Link></li>
          <li><Link href="/my-ideas">My Ideas</Link></li>
          <li><Link href="/my-interactions">My Interactions</Link></li>
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg border dark:border-gray-600 text-sm dark:text-white"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Link className="px-4 py-2 border rounded-lg dark:text-white" href="/login">
              Login
            </Link>
            <Link className="px-4 py-2 bg-black text-white rounded-lg dark:bg-white dark:text-black" href="/register">
              Register
            </Link>
          </div>

          {/* User Dropdown */}
          <div className="relative group z-50">

            <button className="w-10 h-10 rounded-full overflow-hidden border dark:border-gray-600">
              <Image
                src="/user.jpg"
                width={50}
                height={50}
                alt="user"
              />
            </button>

            <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-2
              invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200
              z-50">

              <Link
                href="/profile"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                Profile Management
              </Link>

              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 text-red-500">
                Logout
              </button>

            </div>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;