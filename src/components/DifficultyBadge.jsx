import React from "react";
import { Zap } from "lucide-react";

export default function DifficultyBadge({ difficulty, size = "sm" }) {
  const sizeClasses = size === "xs" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-0.5";

  switch (difficulty) {
    case "Easy":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 ${sizeClasses}`}
        >
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-950"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-950"></span>
          </span>
          <span>Easy</span>
        </span>
      );
    case "Medium":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/50 ${sizeClasses}`}
        >
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950"></span>
          </span>
          <span>Medium</span>
        </span>
      );
    case "Hard":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-rose-950/60 text-rose-400 border border-rose-800/50 ${sizeClasses}`}
        >
          <span className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          </span>
          <span>Hard</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700 ${sizeClasses}`}>
          <Zap className="w-3 h-3" />
          <span>{difficulty}</span>
        </span>
      );
  }
}
