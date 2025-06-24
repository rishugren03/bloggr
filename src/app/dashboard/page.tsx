"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PostList from "@/components/dashboard/PostList";
import { useAuth } from "@/context/AuthContext";
import { PenSquare } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with create post button */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl font-bold text-center mb-6">
            Your <span className="text-blue-400">Dashboard</span>
          </h1>
          <button
            onClick={() => router.push("/create-post")}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <PenSquare className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {/* Post list */}
        <PostList />
      </div>
    </div>
  );
}