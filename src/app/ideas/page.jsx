"use client";

import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { SkewLoader } from "react-spinners";

const IdeaPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const start = Date.now();

        const res = await fetch("http://localhost:5000/ideas");
        const data = await res.json();

        setIdeas(data);

        // force minimum 2 seconds loading
        const elapsed = Date.now() - start;
        const remaining = 2000 - elapsed;

        setTimeout(() => {
          setLoading(false);
        }, remaining > 0 ? remaining : 0);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // GET UNIQUE CATEGORIES
  const categories = useMemo(() => {
    const all = ideas.map((i) => i.category);
    return ["all", ...new Set(all)];
  }, [ideas]);

  // FILTER + SORT
  const processedIdeas = useMemo(() => {
    let filtered = ideas;

    // category filter
    if (category !== "all") {
      filtered = filtered.filter((i) => i.category === category);
    }

    // search filter
    filtered = filtered.filter((idea) =>
      idea.title.toLowerCase().includes(search.toLowerCase())
    );

    // sorting
    if (sort === "a-z") {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "z-a") {
      filtered = [...filtered].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    if (sort === "newest") {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [ideas, search, sort, category]);

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <SkewLoader color="#000" />
        <p className="mt-4 text-gray-600">Loading Ideas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Startup Ideas
        </h1>

        <p className="text-gray-500 mt-2">
          Discover innovative startup concepts from creators
        </p>

        {/* SEARCH + FILTERS */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="newest">Newest</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {processedIdeas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border"
          >

            <div className="h-56 overflow-hidden">
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 flex flex-col h-[300px]">

              <span className="bg-black text-white text-xs px-3 py-1 rounded-full w-fit">
                {idea.category}
              </span>

              <h2 className="text-2xl font-bold mt-3 text-gray-900 dark:text-white line-clamp-1">
                {idea.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
                {idea.shortDescription}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                <b>Audience:</b> {idea.audience}
              </div>

              <div className="text-sm text-gray-500">
                <b>Budget:</b> ${idea.budget}
              </div>

              <div className="flex-grow"></div>

              <Link href={`/ideas/${idea._id}`}>
                <button className="w-full mt-6 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90">
                  View Details
                </button>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaPage;