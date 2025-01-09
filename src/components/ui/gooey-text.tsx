import React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GooeyText = ({ children, className, ...props }: GooeyTextProps) => {
  return (
    <div 
      className={cn(
        "relative transition-all duration-200 hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div 
        className="absolute inset-0 blur-lg opacity-50 bg-pink-200 dark:bg-pink-800"
        style={{
          transform: "translate(0, 0)",
          animation: "gooey 8s ease-in-out infinite"
        }}
      />
      <style jsx>{`
        @keyframes gooey {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(5px, -5px) scale(1.05);
          }
          66% {
            transform: translate(-5px, 5px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};