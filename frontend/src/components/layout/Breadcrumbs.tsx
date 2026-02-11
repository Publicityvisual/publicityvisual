"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p !== "");

  if (pathname === "/") return null;

  return (
    <nav className="jannah-container py-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
      <Link href="/" className="flex items-center gap-1.5 hover:text-[#f14d5d] transition-colors">
        <Home size={12} />
        Inicio
      </Link>
      
      {paths.map((path, i) => {
        const href = `/${paths.slice(0, i + 1).join("/")}`;
        const isLast = i === paths.length - 1;
        const normalizedPath = path.replace(/-/g, " ");

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight size={10} className="opacity-40" />
            {isLast ? (
              <span className="text-gray-800 dark:text-white/80">{normalizedPath}</span>
            ) : (
              <Link href={href} className="hover:text-[#f14d5d] transition-colors lowercase first-letter:uppercase">
                {normalizedPath}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
