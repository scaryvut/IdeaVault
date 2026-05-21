"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const ManageProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load user data into form
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const res = await fetch("http://localhost:5000/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, image }),
      });

      // SAFETY: handle non-JSON responses
      const contentType = res.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Server error (non-JSON response)");
      }

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Please login to manage profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
        Manage Profile
      </h1>

      {/* Avatar Preview */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            image ||
            user.image ||
            "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
          }
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
      </div>

      {/* Name */}
      <label className="block mb-2 text-sm font-medium dark:text-white">
        Name
      </label>
      <input
        className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />

      {/* Image */}
      <label className="block mb-2 text-sm font-medium dark:text-white">
        Profile Image URL
      </label>
      <input
        className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />

      {/* Message */}
      {message && (
        <p className="mb-4 text-sm text-center text-blue-600">
          {message}
        </p>
      )}

      {/* Button */}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default ManageProfile;