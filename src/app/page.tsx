import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BloggrFeedPage from "@/components/home/Feed";

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/get`, {
      cache: 'no-store', // Ensures fresh data on every request for SSR
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main>
        <BloggrFeedPage initialPosts={posts} />
      </main>
     
    </>
  );
}
