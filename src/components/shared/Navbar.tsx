"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ResponsiveNavbar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop: number = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLinkClick = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50"
          : "bg-slate-900 shadow-lg"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-14" : "h-16"
          }`}>
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              router.push("/");
            }}>
            <div className="flex-shrink-0 flex items-center">
              <div className="mr-3 transition-transform duration-300 hover:scale-110">
                <BookOpen
                  className={`transition-all duration-300 ${
                    isScrolled ? "w-5 h-5" : "w-6 h-6"
                  }`}
                />
              </div>
              <span
                className={`font-bold transition-all duration-300 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}>
                Bloggr
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => router.push("/create-post")}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group bg-blue-600 rounded-md shadow hover:bg-blue-700"
                  >
                    Create Post
                  </button>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group"
                  >
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="#"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a
                    href="#"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group">
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a
                    href="#"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 relative group">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              {isAuthenticated ? (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95 ml-2"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                    onClick={() => {
                      router.push("/login");
                    }}>
                    Login
                  </button>
                  <button
                    className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95 hover:bg-white/5"
                    onClick={() => {
                      router.push("/signup");
                    }}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200 hover:scale-110 active:scale-95">
              {isMenuOpen ? (
                <X className="block h-6 w-6 transition-transform duration-300 rotate-180" />
              ) : (
                <Menu className="block h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-80 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
        }`}>
        <div
          className={`px-2 pt-2 pb-3 space-y-1 transition-all duration-300 ${
            isScrolled
              ? "bg-slate-800/95 backdrop-blur-md border-b border-slate-700/50"
              : "bg-slate-800"
          }`}>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/create-post");
                }}
                className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-200 hover:bg-blue-600 rounded-md hover:translate-x-1 bg-blue-600 mb-2"
              >
                Create Post
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/dashboard");
                }}
                className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-200 hover:bg-slate-700 rounded-md hover:translate-x-1"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-red-400 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-200 hover:bg-red-600 rounded-md hover:translate-x-1 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="#"
                onClick={handleLinkClick}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-200 hover:bg-slate-700 rounded-md hover:translate-x-1">
                Home
              </a>
              <a
                href="#"
                onClick={handleLinkClick}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-200 hover:bg-slate-700 rounded-md hover:translate-x-1">
                About
              </a>
              <a
                href="#"
                onClick={handleLinkClick}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-all duration-200 hover:bg-slate-700 rounded-md hover:translate-x-1">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex flex-col space-y-2 px-3">
                  <button
                    onClick={handleLinkClick}
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg">
                    Login
                  </button>
                  <button
                    onClick={handleLinkClick}
                    className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-white/5">
                    Sign Up
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
