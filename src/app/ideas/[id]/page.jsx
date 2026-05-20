"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaRegGrinHearts } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const DetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================= IDEA FETCH =================
  useEffect(() => {
    const fetchIdea = async () => {
      const res = await fetch(`http://localhost:5000/ideas/${id}`);
      const data = await res.json();

      setIdea(data);
      setLikes(data?.likes || 0);
      setViews(data?.views || 0);

      setLoading(false);
    };

    if (id) fetchIdea();
  }, [id]);

  // ================= VIEW COUNT =================
  useEffect(() => {
    const addView = async () => {
      await fetch(`http://localhost:5000/ideas/${id}/view`, {
        method: "PATCH",
      });

      setViews((prev) => prev + 1);
    };

    if (id) addView();
  }, [id]);

  // ================= COMMENTS FETCH =================
  const loadComments = async () => {
    const res = await fetch(`http://localhost:5000/comments/${id}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    if (id) loadComments();
  }, [id]);

  // ================= LIKE =================
  const handleLike = async () => {
    await fetch(`http://localhost:5000/ideas/${id}/like`, {
      method: "PATCH",
    });

    setLikes((prev) => prev + 1);
  };

  // ================= ADD COMMENT =================
  const handleAddComment = async () => {
    if (!text.trim()) return;

    await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ideaId: id,
        text,
      }),
    });

    setText("");
    loadComments();
  };

  // ================= DELETE COMMENT =================
  const handleDelete = async (cid) => {
    await fetch(`http://localhost:5000/comments/${cid}`, {
      method: "DELETE",
    });

    loadComments();
  };

  // ================= EDIT COMMENT =================
  const handleEdit = (comment) => {
    setText(comment.text);
    setEditId(comment._id);
  };

  const handleUpdate = async () => {
    if (!text.trim()) return;

    await fetch(`http://localhost:5000/comments/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    setEditId(null);
    loadComments();
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Idea not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/ideas")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          ← Back
        </button>

        <h1 className="text-xl font-bold text-black">
          Idea Details
        </h1>

        <div />
      </div>

      {/* IDEA CARD */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">

        <img src={idea.image} className="w-full h-72 object-cover rounded-xl" />

        <h1 className="text-3xl font-bold mt-4">{idea.title}</h1>

        <div className="flex gap-6 mt-3 text-sm">
          <button onClick={handleLike} className="flex items-center gap-1">
            <FaRegGrinHearts /> {likes}
          </button>

          <span className="flex items-center gap-1">
            <IoEyeSharp /> {views}
          </span>
        </div>

        <p className="mt-2 text-gray-600">{idea.shortDescription}</p>
        <p className="mt-4">{idea.detailedDescription}</p>
      </div>

      {/* COMMENTS */}
      <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Comments ({comments.length})
        </h2>

        {/* INPUT */}
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write comment..."
            className="w-full p-3 border rounded-lg"
          />

          {editId ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-6 rounded-lg"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddComment}
              className="bg-black text-white px-6 rounded-lg"
            >
              Add
            </button>
          )}
        </div>

        {/* LIST */}
        <div className="mt-6 space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex justify-between border p-3 rounded-lg"
            >
              <div>
                <p>{c.text}</p>

                <p className="text-xs text-gray-500">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : "No date"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DetailsPage;