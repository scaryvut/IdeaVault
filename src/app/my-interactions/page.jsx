"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MyInteraction = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyComments = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        const res = await fetch(
  `http://localhost:5000/comments/user/${user.email}`
);

        const data = await res.json();

        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyComments();
  }, [user?.id]);

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
        Please login to view your interactions
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          My Interactions
        </h1>

        <p className="text-gray-500">All comments you have made</p>
      </div>

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
              <p className="text-sm text-gray-500">
                Idea Title:
                <span className="ml-2 text-black dark:text-white font-medium">
                  {c.ideaId}
                </span>
              </p>

              <p className="mt-2 text-gray-800 dark:text-gray-200">
                {c.text}
              </p>

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