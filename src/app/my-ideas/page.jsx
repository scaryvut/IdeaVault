"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MyIdeas = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
  });

  // ================= FETCH =================
  useEffect(() => {
    const fetchIdeas = async () => {
      if (!user?.id) return;

      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/ideas?userId=${user.id}`
        );

        const data = await res.json();

        setIdeas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchIdeas();
    }
  }, [user?.id]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/ideas/${id}`, {
        method: "DELETE",
      });

      setIdeas((prev) =>
        prev.filter((i) => i._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (idea) => {
    setEditId(idea._id);

    setForm({
      title: idea.title || "",
      shortDescription: idea.shortDescription || "",
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/ideas/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setIdeas((prev) =>
        prev.map((i) =>
          i._id === editId
            ? { ...i, ...form }
            : i
        )
      );

      // CLOSE MODAL
      setEditId(null);

      setForm({
        title: "",
        shortDescription: "",
      });

    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ================= NOT LOGGED IN =================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please login to view your ideas
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          My Ideas
        </h1>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                setEditId(null);

                setForm({
                  title: "",
                  shortDescription: "",
                });
              }}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Edit Idea
            </h2>

            <div className="space-y-4">

              {/* TITLE */}
              <input
                className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
              />

              {/* DESCRIPTION */}
              <textarea
                rows={5}
                className="w-full p-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({
                    ...form,
                    shortDescription: e.target.value,
                  })
                }
                placeholder="Short Description"
              />

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2">

                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Update Idea
                </button>

                <button
                  onClick={() => {
                    setEditId(null);

                    setForm({
                      title: "",
                      shortDescription: "",
                    });
                  }}
                  className="bg-gray-300 dark:bg-gray-700 dark:text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= IDEA CARDS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {ideas.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">
            No ideas found
          </p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
            >

              {/* IMAGE */}
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* TITLE */}
              <h2 className="text-lg font-bold mt-3 dark:text-white">
                {idea.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-1">
                {idea.shortDescription}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-4">

                <button
                  onClick={() => handleEdit(idea)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(idea._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyIdeas;