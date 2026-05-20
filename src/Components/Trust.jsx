import React from "react";

const Trust = () => {
  return (
    <div>
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-[3px] uppercase text-blue-500">
              Why People Trust IdeaVault
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900 dark:text-white">
              Built For Innovators, Backed By Community
            </h2>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              IdeaVault helps creators safely share startup ideas, discover
              innovation, and collaborate with a growing network of thinkers and
              builders.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition">
              <div className="text-4xl mb-5">🚀</div>

              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                Innovation First
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Discover startup ideas focused on technology, creativity,
                sustainability, and future-driven solutions.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition">
              <div className="text-4xl mb-5">🔒</div>

              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                Safe Community
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Interact with ideas respectfully through a platform designed for
                constructive collaboration and authentic engagement.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition">
              <div className="text-4xl mb-5">🌍</div>

              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                Global Thinkers
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Connect with creators, entrepreneurs, and innovators from
                different industries and perspectives worldwide.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition">
              <div className="text-4xl mb-5">💡</div>

              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                Real Opportunities
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Transform raw concepts into meaningful discussions,
                collaborations, and potential startup opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trust;
