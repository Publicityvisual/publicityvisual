"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StickySidebarProps {
  children: React.ReactNode;
  className?: string;
  topOffset?: number;
}

export function StickySidebar({ children, className, topOffset = 80 }: StickySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sidebarRef}
      className={cn("sticky transition-all duration-300", className)}
      style={{ top: `${topOffset}px` }}
    >
      {children}
    </div>
  );
}
