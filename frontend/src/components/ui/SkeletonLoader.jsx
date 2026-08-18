export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 animate-pulse shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <div className="h-5 bg-slate-200 rounded w-2/3 dark:bg-slate-700"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-100 rounded dark:bg-slate-600"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6 dark:bg-slate-600"></div>
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-5 bg-slate-100 rounded w-12 dark:bg-slate-600"></div>
            <div className="h-5 bg-slate-100 rounded w-12 dark:bg-slate-600"></div>
          </div>
        </div>
      ))}
    </div>
  );
}