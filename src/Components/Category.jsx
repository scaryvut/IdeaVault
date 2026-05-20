import React from "react";

const Category = () => {
  return (
    <div>
      <section className="py-24 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase tracking-[3px] text-sm font-semibold text-blue-500">
              Innovation Domains
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900 dark:text-white">
              Explore Startup Categories
            </h2>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Discover innovative ideas across technology, business,
              sustainability, education, healthcare, and emerging industries.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* AI */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div className="text-5xl mb-5">🤖</div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                AI
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Smart automation & machine intelligence
              </p>
            </div>

            {/* FinTech */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div className="text-5xl mb-5">💳</div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                FinTech
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Digital banking & financial innovation
              </p>
            </div>

            {/* HealthTech */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div className="text-5xl mb-5">🏥</div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                HealthTech
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Healthcare & medical solutions
              </p>
            </div>

            {/* EdTech */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div className="text-5xl mb-5">📚</div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                EdTech
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Modern education platforms
              </p>
            </div>

            {/* SaaS */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div className="text-5xl mb-5">☁️</div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                SaaS
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Software as a service products
              </p>
            </div>

            {/* GreenTech */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div className="text-5xl mb-5">🌱</div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                GreenTech
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Sustainable & eco-friendly innovation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
