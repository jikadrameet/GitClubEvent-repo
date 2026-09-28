import React from "react";
import { Zap } from "lucide-react";

export default function DifficultyBadge({ difficulty, size = "sm" }) {
  const sizeClasses = size === "xs" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-0.5";

  const dotActive = "w-1.5 h-1.5 rounded-full";

  switch (difficulty) {
    case "Easy":
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses}`}>
          <span className="flex items-center gap-0.5">
            <span className={`${dotActive} bg-emerald-500`}></span>
            <span className={`${dotActive} bg-emerald-200`}></span>
            <span className={`${dotActive} bg-emerald-200`}></span>
          </span>
          <span>Easy</span>
        </span>
      );
    case "Medium":
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
          <span className="flex items-center gap-0.5">
            <span className={`${dotActive} bg-amber-500`}></span>
            <span className={`${dotActive} bg-amber-500`}></span>
            <span className={`${dotActive} bg-amber-200`}></span>
          </span>
          <span>Medium</span>
        </span>
      );
    case "Hard":
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses}`}>
          <span className="flex items-center gap-0.5">
            <span className={`${dotActive} bg-rose-500`}></span>
            <span className={`${dotActive} bg-rose-500`}></span>
            <span className={`${dotActive} bg-rose-500`}></span>
          </span>
          <span>Hard</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-stone-100 text-stone-600 border border-stone-200 ${sizeClasses}`}>
          <Zap className="w-3 h-3" />
          <span>{difficulty}</span>
        </span>
      );
  }
}
