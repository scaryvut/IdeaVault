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

  // ================= GET TOKEN =================
  const getToken = async () => {
    if (!user) return null;

    const res = await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
      }),
    });

    const data = await res.json();
    return data.token;
  };

  // ================= FETCH =================
  useEffect(() => {
    const fetchIdeas = async () => {
      if (!user?.email) return;

      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/ideas?userEmail=${user.email}`
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

    fetchIdeas();
  }, [user?.email]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const token = await getToken();

      await fetch(`http://localhost:5000/ideas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // instant UI sync
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
      const token = await getToken();

      await fetch(`http://localhost:5000/ideas/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      // update UI instantly
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

      {/* MODAL */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl p-6 relative">

            <button
              onClick={() => setEditId(null)}
              className="absolute top-3 right-4 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Edit Idea
            </h2>

            <input
              className="w-full p-3 mb-4 border rounded"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              rows={5}
              className="w-full p-3 border rounded"
              value={form.shortDescription}
              onChange={(e) =>
                setForm({
                  ...form,
                  shortDescription: e.target.value,
                })
              }
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setEditId(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IDEAS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {ideas.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center">
            No ideas found
          </p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >{idea.image ? (
  <img
    src={idea.image}
    alt={idea.title}
    className="w-full h-40 object-cover rounded-lg"
  />
) : (
  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-500">
    No Image
  </div>
)}
              <h2 className="font-bold text-lg dark:text-white">
                {idea.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {idea.shortDescription}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(idea)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(idea._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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