export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between container mx-auto px-4">
        <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="hidden md:flex gap-4">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb Skeleton */}
        <div className="w-48 h-4 bg-gray-200 rounded mb-8 animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Hero Skeleton (Gray Box) */}
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg animate-pulse mb-8" />
            
            {/* List Skeletons */}
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex gap-4 mb-6">
                 <div className="w-1/3 h-32 bg-gray-200 rounded animate-pulse" />
                 <div className="w-2/3 space-y-3 py-2">
                    <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                 </div>
               </div>
            ))}
          </div>

          <div className="hidden lg:block lg:col-span-1">
             <div className="h-full w-full bg-gray-100 rounded animate-pulse min-h-[500px]" />
          </div>
        </div>
      </main>
    </div>
  );
}
