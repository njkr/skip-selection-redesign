export function SkipCardSkeleton() {
  const skeletonBaseClass =
    "bg-gray-200 dark:bg-slate-700 rounded animate-pulse";
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-md">
      <div className="p-0">
        <div className={`aspect-[16/10] w-full ${skeletonBaseClass}`} />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className={`h-6 w-3/4 mb-2 ${skeletonBaseClass}`} />
        <div className={`h-4 w-1/2 mb-4 ${skeletonBaseClass}`} />
        <div className={`h-8 w-1/3 mb-auto ${skeletonBaseClass}`} />{" "}
        <div className={`h-5 w-2/5 mt-3 ${skeletonBaseClass}`} />{" "}
      </div>

      <div className="p-4">
        <div className={`h-12 w-full ${skeletonBaseClass}`} />
      </div>
    </div>
  );
}
