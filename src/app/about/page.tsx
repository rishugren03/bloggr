import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Bloggr',
  description: 'Learn more about Bloggr, our mission, and our team.',
};

export default function AboutPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-slate-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About Bloggr
        </h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p>
            Welcome to Bloggr, a platform dedicated to writers, thinkers, and storytellers. 
            Our mission is to provide a simple, beautiful, and powerful space for you to share your voice with the world.
          </p>
          <p>
            Whether you're a seasoned author, a passionate hobbyist, or just starting out, Bloggr offers the tools you need to create compelling content. 
            We believe in the power of words to connect, inspire, and drive change.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Vision</h2>
          <p>
            We envision a world where everyone has the opportunity to share their story. We're committed to building an open, inclusive, and supportive community for creators and readers alike.
          </p>
        </div>
      </div>
    </main>
  );
} 