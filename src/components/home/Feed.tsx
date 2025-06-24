"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
}

interface Author {
  _id: string;
  username: string;
}

export default function BloggrFeedPage({ initialPosts }: { initialPosts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const uniqueAuthors = Array.from(new Map(initialPosts.map(p => [p.author._id, p.author])).values());
    setAuthors(uniqueAuthors);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialPosts]);

  const filteredBySearch = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByAuthor = selectedAuthor
    ? filteredBySearch.filter(post => post.author._id === selectedAuthor)
    : filteredBySearch;

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredByAuthor.length / postsPerPage);
  const paginatedPosts = filteredByAuthor.slice(
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
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      {/* Sticky Search Bar */}
      <div className={`sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 transition-all duration-300 ${isScrolled ? 'pt-16 pb-4' : 'py-4'}`}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header - Only visible when not scrolled */}
        {!isScrolled && (
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-2">Bloggr</h1>
            <p className="text-slate-400">Thoughts, stories and ideas</p>
          </header>
        )}

        {/* Filters - Below search when scrolled */}
        <div className={`mb-8 ${isScrolled ? 'pt-4' : ''}`}>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedAuthor(null)}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                !selectedAuthor ? 'bg-blue-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              All Authors
            </button>
            {authors.map(author => (
              <button
                key={author._id}
                onClick={() => setSelectedAuthor(author._id)}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  selectedAuthor === author._id ? 'bg-blue-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {author.username}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No posts found.</div>
          ) : paginatedPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No posts match your search criteria.</div>
          ) : (
            paginatedPosts.map((post) => {
              const slug = slugify(post.title);
              const postUrl = `/post/${slug}/${post._id}`;
              return (
                <article key={post._id} className="border-b border-slate-700 pb-8">
                  <div className="mb-2 text-sm text-blue-400">
                    {post.author?.username || "Unknown Author"}
                  </div>
                  <Link href={postUrl}>
                    <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h2>
                  </Link>
                  <div 
                    className="text-slate-300 mb-4 line-clamp-3 prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  <Link href={postUrl}>
                    <span className="text-blue-400 hover:underline cursor-pointer">Read more →</span>
                  </Link>
                </article>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                className={`w-10 h-10 rounded-md font-medium transition-colors duration-200 ${
                  currentPage === page + 1
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}