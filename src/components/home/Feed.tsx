"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BloggrFeedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/posts/get")
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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-");
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 text-white pl-12 pr-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors duration-200">
            <span>All Authors</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors duration-200">
            <span>Author 1</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg border border-slate-600 transition-colors duration-200">
            <span>Author 2</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-8 animate-pulse">
                <div className="h-6 bg-slate-700 rounded w-1/3 mb-4" />
                <div className="h-4 bg-slate-700 rounded w-2/3 mb-2" />
                <div className="h-4 bg-slate-700 rounded w-1/2" />
              </div>
            ))
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : paginatedPosts.length === 0 ? (
            <div className="text-gray-400">No posts found.</div>
          ) : (
            paginatedPosts.map((post) => {
              const slug = slugify(post.title);
              const idPart = post._id?.slice(-5) || Math.floor(Math.random() * 100000).toString().padStart(5, "0");
              const postUrl = `/post/${slug}-${idPart}`;
              return (
                <Link href={postUrl} key={post._id} legacyBehavior>
                  <a>
                    <article
                      className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] group cursor-pointer"
                    >
                      <div className="flex flex-col lg:flex-row">
                        <div className="flex-1 p-8">
                          <div className="mb-3">
                            <span className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                              {post.author?.email || "Unknown Author"}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-200">
                            {post.title}
                          </h2>
                          <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            {post.content}
                          </p>
                        </div>
                      </div>
                    </article>
                  </a>
                </Link>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-12">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }).map((_, page) =>
            page < 3 || page === totalPages - 1 || Math.abs(page + 1 - currentPage) <= 1 ? (
              <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentPage === page + 1
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                }`}
              >
                {page + 1}
              </button>
            ) :
              page === 3 && currentPage > 5 ? (
                <span key="ellipsis" className="px-2 text-gray-400">...</span>
              ) : null
          )}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
