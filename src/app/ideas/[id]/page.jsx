"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaRegGrinHearts } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { SkewLoader } from "react-spinners";
import 'animate.css';
const DetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ================= FETCH IDEA =================
 useEffect(() => {
  const fetchIdea = async () => {
    const start = Date.now(); // ⏱ start timer

    try {
      const res = await fetch(`https://idea-vault-server-eight.vercel.app/ideas/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed");

      setIdea(data);
      setLikes(data?.likes || 0);
      setViews(data?.views || 0);
    } catch {
      toast.error("Failed to load idea");
    } finally {
      // ⏱ enforce minimum 2s loading
      const elapsed = Date.now() - start;
      const remaining = 2000 - elapsed;

      setTimeout(() => {
        setLoading(false);
      }, remaining > 0 ? remaining : 0);
    }
  };

  if (id) fetchIdea();
}, [id]);

  // ================= VIEW COUNT =================
  useEffect(() => {
    const addView = async () => {
      try {
        await fetch(`https://idea-vault-server-eight.vercel.app/ideas/${id}/view`, {
          method: "PATCH",
        });
        setViews((prev) => prev + 1);
      } catch {}
    };

    if (id) addView();
  }, [id]);

  // ================= LOAD COMMENTS =================
  const loadComments = async () => {
    try {
      const res = await fetch(`https://idea-vault-server-eight.vercel.app/comments/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error();

      setComments(data);
    } catch {
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    if (id) loadComments();
  }, [id]);

  // ================= LIKE =================
  const handleLike = async () => {
    try {
      const res = await fetch(`https://idea-vault-server-eight.vercel.app/ideas/${id}/like`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error();

      setLikes((prev) => prev + 1);
    } catch {
      toast.error("Like failed");
    }
  };

  // ================= ADD COMMENT =================
  const handleAddComment = async () => {
    if (!user) return toast.error("Login required");
    if (!text.trim()) return toast.error("Comment cannot be empty");

    try {
      const res = await fetch("https://idea-vault-server-eight.vercel.app/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ideaId: id,
          text,
          userEmail: user?.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.message || "Failed to add comment");
      }

      setText("");
      await loadComments();
      toast.success("Comment added");
    } catch {
      toast.error("Server error");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (cid) => {
    try {
      const res = await fetch(
        `https://idea-vault-server-eight.vercel.app/comments/${cid}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.message || "Delete failed");
      }

      await loadComments();
      toast.success("Comment deleted");
    } catch {
      toast.error("Server error");
    }
  };

  // ================= EDIT =================
  const handleEdit = (comment) => {
    setText(comment.text);
    setEditId(comment._id);
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!text.trim()) return toast.error("Empty comment");

    try {
      const res = await fetch(
        `https://idea-vault-server-eight.vercel.app/comments/${editId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data?.message || "Update failed");
      }

      setEditId(null);
      setText("");
      await loadComments();

      toast.success("Comment updated");
    } catch {
      toast.error("Server error");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SkewLoader color="#810B38" />
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10 animate__animated animate__backInUp">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">

        <button
          onClick={() => router.push("/ideas")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          ← Back
        </button>

        <h1 className="text-xl font-bold dark:text-white">
          Idea Details
        </h1>

        <div />
      </div>

      {/* IDEA */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">

        <img
          src={idea.image}
          className="w-full h-72 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-4 dark:text-white">
          {idea.title}
        </h1>

        <div className="flex gap-6 mt-3 text-sm dark:text-white">

          <button onClick={handleLike} className="flex items-center gap-1">
            <FaRegGrinHearts />
            {likes}
          </button>

          <span className="flex items-center gap-1">
            <IoEyeSharp />
            {views}
          </span>

        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {idea.shortDescription}
        </p>

        <p className="mt-4 dark:text-gray-200">
          {idea.detailedDescription}
        </p>
      </div>

      {/* COMMENTS */}
      <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Comments ({comments.length})
        </h2>

        <div className="flex gap-2">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={user ? "Write comment..." : "Login to comment"}
            disabled={!user}
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
              className="border p-4 rounded-xl bg-gray-50 dark:bg-gray-900"
            >

              <div className="flex justify-between">
                <p className="font-semibold dark:text-white">
                  {c.userEmail?.split("@")[0] || "User"}
                </p>

                <span className="text-xs text-gray-500">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              <p className="mt-2 dark:text-gray-200">
                {c.text}
              </p>

              {user?.email === c.userEmail && (
                <div className="flex gap-3 mt-3">

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
              )}

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DetailsPage;