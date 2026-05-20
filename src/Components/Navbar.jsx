"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ================= THEME =================

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // ================= LOGOUT =================

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/login");
  };

  // ================= NAV LINKS =================

  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/ideas">Ideas</Link>
      </li>

      {user && (
        <>
          <li>
            <Link href="/add-idea">Add Idea</Link>
          </li>

          <li>
            <Link href="/my-ideas">My Ideas</Link>
          </li>

          <li>
            <Link href="/my-interactions">My Interactions</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-black dark:text-white"
        >
          IdeaHub
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg border dark:border-gray-600 text-sm dark:text-white"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* LOADING */}
          {isPending ? (
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-black animate-spin"></div>
          ) : (
            <>
              {/* LOGGED OUT */}
              {!user ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 border rounded-lg dark:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-4 py-2 bg-black text-white rounded-lg dark:bg-white dark:text-black"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                /* USER DROPDOWN */
                <div className="relative group">
                  {/* AVATAR BUTTON */}
                  <button className="rounded-full">
                    <Avatar
                      src={
                        user.image ||
                        "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                      }
                      name={user.name || "User"}
                      className="w-11 h-11 text-large"
                    />
                  </button>

                  {/* DROPDOWN */}
                  <div
                    className="
                    absolute right-0 top-14 w-64
                    bg-white dark:bg-gray-800
                    shadow-2xl rounded-2xl p-3
                    invisible opacity-0
                    group-hover:visible
                    group-hover:opacity-100
                    transition-all duration-200
                    border dark:border-gray-700
                  "
                  >
                    {/* USER INFO */}
                    <div className="px-3 py-2 border-b dark:border-gray-700 mb-2">
                      <h3 className="font-semibold dark:text-white">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* PROFILE */}
                    <Link
                      href="/profile"
                      className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                    >
                      Profile Management
                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl dark:text-white"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-medium">
            {navLinks}
          </ul>

          {!user && (
            <div className="flex gap-3 mt-6">
              <Link
                href="/login"
                className="flex-1 text-center px-4 py-3 border rounded-xl dark:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex-1 text-center px-4 py-3 bg-black text-white rounded-xl dark:bg-white dark:text-black"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
