"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || data.errors?.[0]?.msg || "Signup failed");
      }
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 rounded-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-white">Sign up</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#1e293b] border border-[#334155] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-md transition"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
              {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
              {success && <div className="text-green-400 text-sm mt-2">{success}</div>}
            </div>
          </form>

          <div className="text-center text-sm text-white">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-300 hover:text-blue-400 underline ml-1">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
