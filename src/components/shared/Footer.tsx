import { BookOpen, Heart, Twitter, Github, Linkedin } from "lucide-react";
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/i_amrishu",
      icon: <Twitter className="w-5 h-5" />
    },
    {
      name: "GitHub",
      href: "https://github.com/rishugren03/bloggr",
      icon: <Github className="w-5 h-5" />
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/rishu-kumar-68455a213/",
      icon: <Linkedin className="w-5 h-5" />
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" }
  ];

  return (
    <footer className="bg-slate-800 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xl font-bold text-white">Bloggr</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md text-sm leading-relaxed">
              Your ultimate platform for discovering and sharing amazing stories, 
              insights, and content from writers around the world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Explore</h3>
            <nav>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center"
                    >
                      <span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Stay Updated</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest posts
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-slate-700 text-white px-4 py-2 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} Bloggr. All rights reserved.
          </p>
          <div className="flex items-center mt-4 sm:mt-0">
            <Heart className="w-4 h-4 text-red-400 mr-1" />
            <p className="text-slate-500 text-sm">
              Made for writers and readers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
