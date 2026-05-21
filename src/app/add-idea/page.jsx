"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const AddIdeaPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const idea = Object.fromEntries(formData.entries());

    // 🔥 ONLY FIX (critical)
    const payload = {
      ...idea,
      userId: user?.id,        // REQUIRED
      userEmail: user?.email,  // optional but useful
    };

    try {
      const res = await fetch("https://idea-vault-server-eight.vercel.app/ideas", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.insertedId) {
        setSuccess("Idea submitted successfully!");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-black text-white px-6 py-6">
          <h1 className="text-2xl font-bold">Submit Idea</h1>

          <p className="text-xs text-gray-300 mt-2">
            Share your startup idea in a structured way
          </p>
        </div>

        {/* Form (UNCHANGED) */}
        <form
          onSubmit={handleSubmit}
          className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"
        >

          {/* LEFT */}
          <div className="space-y-4">

            <input
              name="title"
              placeholder="Idea Title"
              required
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <textarea
              name="shortDescription"
              rows={3}
              placeholder="Short Description"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <textarea
              name="detailedDescription"
              rows={4}
              placeholder="Detailed Description"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <select
              name="category"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <option value="">Select Category</option>
              <option>Tech</option>
              <option>AI</option>
              <option>Health</option>
              <option>Education</option>
              <option>FinTech</option>
              <option>SaaS</option>
            </select>

            <input
              name="tags"
              placeholder="Tags (AI, Startup)"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <input
              name="image"
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-4 flex flex-col">

            <input
              name="budget"
              placeholder="Estimated Budget"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <input
              name="audience"
              placeholder="Target Audience"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <textarea
              name="problem"
              rows={4}
              placeholder="Problem Statement"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            <textarea
              name="solution"
              rows={5}
              placeholder="Proposed Solution"
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
            />

            {success && (
              <p className="text-green-500 text-xs">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "Submit Idea"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIdeaPage;