"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Inter, Playfair_Display } from "next/font/google";

// Define fonts
const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

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
      setIsScrolled(window.scrollY > 10);
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
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/30"
          : "bg-slate-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}>
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => router.push("/")}
          >
            <div className="flex-shrink-0 flex items-center">
              <div className="mr-3 transition-all duration-300 group-hover:rotate-12">
                <BookOpen
                  className={`text-blue-400 transition-all duration-300 ${
                    isScrolled ? "w-5 h-5" : "w-6 h-6"
                  }`}
                />
              </div>
              <span
                className={`${playfair.className} font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-300 ${
                  isScrolled ? "text-xl" : "text-2xl"
                }`}
              >
                Bloggr
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => router.push("/create-post")}
                    className={`${inter.className} relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/20 hover:shadow-blue-400/30`}
                  >
                    Create Post
                    <span className="absolute inset-0 rounded-md bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </button>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className={`${inter.className} text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-200 relative group`}
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
                  </button>
                </>
              ) : (
                <>
                  
                </>
              )}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              {isAuthenticated ? (
                <button
                  className={`${inter.className} bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg shadow-red-500/20 hover:shadow-red-400/30`}
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className={`${inter.className} bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30`}
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </button>
                  <button
                    className={`${inter.className} border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:shadow-lg hover:bg-white/5`}
                    onClick={() => router.push("/signup")}
                  >
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none transition-all duration-200"
            >
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-2 pt-2 pb-4 space-y-2 transition-all duration-300 ${
            isScrolled
              ? "bg-slate-800/95 backdrop-blur-md"
              : "bg-slate-800/95"
          }`}
        >
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/create-post");
                }}
                className={`${inter.className} w-full text-left text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md`}
              >
                Create Post
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/dashboard");
                }}
                className={`${inter.className} w-full text-left text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-slate-700/50`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className={`${inter.className} w-full text-left text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 mt-2 shadow-md`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="#"
                onClick={handleLinkClick}
                className={`${inter.className} text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-slate-700/50`}
              >
                Home
              </a>
              <a
                href="#"
                onClick={handleLinkClick}
                className={`${inter.className} text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-slate-700/50`}
              >
                About
              </a>
              <a
                href="#"
                onClick={handleLinkClick}
                className={`${inter.className} text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-slate-700/50`}
              >
                Contact
              </a>
              <div className="pt-2 pb-2 border-t border-slate-700/50 mt-2">
                <div className="flex flex-col space-y-2 px-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/login");
                    }}
                    className={`${inter.className} bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-3 rounded-md text-base font-medium transition-all duration-200 shadow-md`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/signup");
                    }}
                    className={`${inter.className} border border-slate-600 hover:border-blue-400 text-gray-300 hover:text-white px-4 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-white/5`}
                  >
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