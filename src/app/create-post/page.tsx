"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePostForm from "@/components/dashboard/CreatePostForm";
import { useAuth } from "@/context/AuthContext";

export default function CreatePostPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <CreatePostForm />
    </div>
  );
} 