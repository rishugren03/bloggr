import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
  slug: string;
  excerpt?: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Bloggr`,
    description: post.excerpt || 'A post on Bloggr',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'A post on Bloggr',
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author?.username || 'Unknown Author'],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/get`, {
      next: { revalidate: 3600 } // Revalidate the list every hour
    });

    if (!res.ok) {
      return [];
    }

    const posts: Post[] = await res.json();

    return posts
      .filter(post => post.slug)
      .map((post) => ({
        slug: post.slug,
        id: post._id,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/getbyid/${id}`, {
      next: { revalidate: 60 }, // Revalidate the data every 60 seconds
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <article className="max-w-3xl mx-auto">
            <header className="mb-10">
              <div className="mb-4">
                <span className="text-sm text-blue-400 font-medium">
                  {post.author?.username || 'Unknown Author'}
                </span>
                <span className="mx-2 text-slate-600">•</span>
                <time 
                  dateTime={post.createdAt} 
                  className="text-sm text-slate-500"
                >
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
            </header>

            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
}