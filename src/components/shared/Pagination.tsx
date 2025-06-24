import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const params = useSearchParams();

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('page', String(page));
    router.push(`?${newParams.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {'<'}
      </button>
      {Array.from({ length: totalPages }).map((_, page) => (
        <button
          key={page}
          onClick={() => setPage(page + 1)}
          className={`w-10 h-10 rounded-md font-medium transition-colors duration-200 ${
            currentPage === page + 1
              ? 'bg-blue-500 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {'>'}
      </button>
    </div>
  );
} 