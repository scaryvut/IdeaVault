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
        // ✅ FIXED: use stable ID, not name
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

    if (user?.id) fetchIdeas();
  }, [user?.id]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/ideas/${id}`, {
        method: "DELETE",
      });

      setIdeas((prev) => prev.filter((i) => i._id !== id));
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
          i._id === editId ? { ...i, ...form } : i
        )
      );

      setEditId(null);
      setForm({ title: "", shortDescription: "" });
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please login to view your ideas
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          My Ideas
        </h1>
      </div>

      {/* EDIT BOX */}
      {editId && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-xl mb-6">
          <input
            className="w-full p-3 border mb-2"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="Title"
          />

          <input
            className="w-full p-3 border mb-2"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({
                ...form,
                shortDescription: e.target.value,
              })
            }
            placeholder="Short Description"
          />

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Update Idea
          </button>
        </div>
      )}

      {/* CARDS */}
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
              <img
                src={idea.image}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="text-lg font-bold mt-3 dark:text-white">
                {idea.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {idea.shortDescription}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() => handleEdit(idea)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(idea._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
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