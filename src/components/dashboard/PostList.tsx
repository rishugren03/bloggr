"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/shared/PostCard";
import Pagination from "@/components/shared/Pagination";
import { useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const postsPerPage = 3;
  const currentPage = parseInt(params.get("page") || "1", 10);

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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/get?author=${userId}`)
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
          currentPosts.map((post) => (
            <PostCard key={post._id} {...post} showReadMore />
          ))
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
