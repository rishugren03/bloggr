"use client";

import React from "react";
import BloggrFeedPage from "@/components/home/Feed";
// import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";

const Home: React.FC = () => {
  return (
    <>
      {/* Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        ::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>

      {/* Main Content Area */}
      <main className="relative">
        {/* Content wrapper with proper spacing for fixed navbar */}
        <div className="pt-16">
          {" "}
          {/* Offset for fixed navbar height */}
          <BloggrFeedPage />
        </div>
      </main>
    </>
  );
};

export default Home;
