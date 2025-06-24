import Link from 'next/link';

export interface PostCardProps {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; email: string };
  createdAt?: string;
  showReadMore?: boolean;
}

export default function PostCard({ _id, title, content, author, createdAt, showReadMore = true }: PostCardProps) {
  function slugify(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }
  const slug = slugify(title);
  const postUrl = `/post/${slug}/${_id}`;

  return (
    <article className="border-b border-slate-700 pb-8">
      <div className="mb-2 text-sm text-blue-400">
        {author?.email || 'Unknown Author'}
        {createdAt && (
          <span className="ml-2 text-xs text-slate-400">{new Date(createdAt).toLocaleDateString()}</span>
        )}
      </div>
      <Link href={postUrl}>
        <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
          {title}
        </h2>
      </Link>
      <div
        className="text-slate-300 mb-4 line-clamp-3 prose prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {showReadMore && (
        <Link href={postUrl}>
          <span className="text-blue-400 hover:underline cursor-pointer">Read more →</span>
        </Link>
      )}
    </article>
  );
} 