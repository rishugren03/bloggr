"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PostList from "@/components/dashboard/PostList";
import { useAuth } from "@/context/AuthContext";

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
    <div className="min-h-screen bg-[#0f172a] text-white py-16 px-6 flex flex-col items-center">
      <button
        onClick={() => router.push("/create-post")}
        className="mb-12 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold rounded-full shadow-lg animate-bounce hover:scale-105 hover:from-purple-600 hover:to-blue-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
        style={{ minWidth: 240 }}
      >
        + Create a Post
      </button>
      <PostList />
    </div>
  );
}
