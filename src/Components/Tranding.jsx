"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Tranding = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        // Fetch only 6 ideas
        const res = await fetch("http://localhost:5000/ideas/limit");

        const data = await res.json();

        setIdeas(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-10">
        
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Trending Ideas
          </h2>

          <p className="text-gray-500 mt-2">
            Discover innovative startup concepts
          </p>
        </div>

        {/* Show More */}
        <Link href="/ideas">
          <button className="hidden md:block px-6 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition">
            Show More
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-700"
          >
            
            {/* Image */}
            <div className="h-56 overflow-hidden">
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              
              {/* Category */}
              <div className="mb-4">
                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  {idea.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">
                {idea.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
                {idea.shortDescription}
              </p>

              {/* Info */}
              <div className="mt-5 space-y-2 text-sm">
                
                <p className="text-gray-500">
                  <span className="font-semibold text-black dark:text-white">
                    Audience:
                  </span>{" "}
                  {idea.audience}
                </p>

                <p className="text-gray-500">
                  <span className="font-semibold text-black dark:text-white">
                    Budget:
                  </span>{" "}
                  ${idea.budget}
                </p>

                <p className="text-gray-500">
                  <span className="font-semibold text-black dark:text-white">
                    Tags:
                  </span>{" "}
                  {idea.tags}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Button */}
      <div className="flex justify-center mt-10 md:hidden">
        <Link href="/ideas">
          <button className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition">
            Show More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Tranding;