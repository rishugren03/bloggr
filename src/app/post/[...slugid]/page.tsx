"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
  const params = useParams();
  const slugParams = params.slugid as string[];
  const id = slugParams?.[slugParams.length - 1];

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Post ID not found in URL");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/posts/getbyid/${id}`)
      .then((res) => {
        if (!res.ok) {
            if (res.status === 400) throw new Error("Invalid Post ID format");
            throw new Error("Post not found");
        };
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }
  if (error || !post) {
    return <div className="min-h-screen flex items-center justify-center text-red-400">{error || "Post not found"}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white py-16 px-4">
      <div className="max-w-2xl w-full bg-slate-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-6 text-gray-400 text-sm">
          By {post.author?.email || "Unknown Author"} &middot; {new Date(post.createdAt).toLocaleString()}
        </div>
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </div>
  );
} 