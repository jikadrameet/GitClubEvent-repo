import React from "react";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function EmptyState({
  title = "No challenges found",
  description = "We couldn't find any challenges matching your current search query or filter criteria.",
  onReset,
  resetLabel = "Clear all filters"
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner mb-4">
        <FolderSearch className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{resetLabel}</span>
        </button>
      )}
    </div>
  );
}
