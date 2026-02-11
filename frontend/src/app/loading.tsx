export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] dark:bg-[#101214]">
      <div className="h-[40px] bg-[#2c2d31]" />
      <div className="h-32 bg-white dark:bg-[#101214] border-b border-gray-100 dark:border-white/5" />
      <div className="h-[50px] bg-white dark:bg-[#101214] border-b border-gray-100 dark:border-white/5" />
      
      <main className="flex-grow pt-8 jannah-container">
        <div className="w-full h-[500px] bg-gray-200 dark:bg-white/5 animate-pulse rounded-sm" />
      </main>
    </div>
  );
}
