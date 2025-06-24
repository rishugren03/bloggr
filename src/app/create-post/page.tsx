"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostForm from "@/components/dashboard/CreatePostForm";
import { useAuth } from "@/context/AuthContext";

export default function CreatePostPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f172a]">
        <p className="text-white text-lg">Loading editor...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <CreatePostForm />
    </div>
  );
} 