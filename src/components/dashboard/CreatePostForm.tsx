"use client";

import { useState } from "react";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a post.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.errors?.[0]?.msg || "Failed to create post");
      }
      setTitle("");
      setContent("");
      setSuccess("Post created successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 bg-[#1e293b] border border-[#334155] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          placeholder="Content"
          className="w-full px-4 py-2 bg-[#1e293b] border border-[#334155] text-white rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-[#3b82f6] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#2563eb] transition"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-400 text-sm mt-2">{success}</div>}
      </form>
    </div>
  );
}
