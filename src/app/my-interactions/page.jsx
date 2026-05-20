"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const MyInteraction = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USER COMMENTS =================
  useEffect(() => {
    const fetchMyComments = async () => {
      if (!user?.name) return;

      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/comments/user/${user.name}`
      );

      const data = await res.json();

      setComments(data);
      setLoading(false);
    };

    fetchMyComments();
  }, [user]);

  // ================= LOADING =================
  if (loading) {
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
        Please login to view your interactions
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          My Interactions
        </h1>

        <p className="text-gray-500">
          All comments you have made
        </p>
      </div>

      {/* LIST */}
      <div className="max-w-4xl mx-auto space-y-4">

        {comments.length === 0 ? (
          <div className="text-center text-gray-500">
            No interactions yet
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >

              {/* IDEA LINK (optional improvement) */}
              <p className="text-sm text-gray-500">
                Idea Title:
                <span className="ml-2 text-black dark:text-white">
                  {c.ideaTitle}
                </span>
              </p>

              {/* COMMENT */}
              <p className="mt-2 text-gray-800 dark:text-gray-200">
                {c.text}
              </p>

              {/* DATE */}
              <p className="text-xs text-gray-400 mt-2">
                {c.createdAt
                  ? new Date(c.createdAt).toLocaleString()
                  : ""}
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyInteraction;