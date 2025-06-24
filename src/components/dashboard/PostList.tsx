"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not logged in");
      setLoading(false);
      return;
    }
    const payload = parseJwt(token);
    const userId = payload?.user?.id;
    if (!userId) {
      setError("Invalid token");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/api/posts/get?author=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="max-w-5xl w-full mx-auto p-6">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        My Posts
      </h3>
      <div className="grid gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-4" />
              <div className="h-4 bg-gray-700 rounded w-2/3 mb-2" />
              <div className="h-4 bg-gray-700 rounded w-1/2" />
            </div>
          ))
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : currentPosts.length === 0 ? (
          <div className="text-gray-400">No posts found.</div>
        ) : (
          currentPosts.map((post, index) => (
            <div
              key={post._id}
              className="flex flex-col md:flex-row gap-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-white mb-2">
                  {post.title}
                </h4>
                <div
                  className="text-gray-300 post-content-preview"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <span className="text-xs text-gray-400 mt-2">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-md text-white flex items-center justify-center ${
              currentPage === i + 1 ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-600 transition-all duration-200`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
