import React from "react";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function EmptyState({
  title = "No challenges found",
  description = "We couldn't find any challenges matching your current search query or filter criteria.",
  onReset,
  resetLabel = "Clear all filters"
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border-secondary bg-surface-sunken p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-accent mb-4">
        <FolderSearch className="h-7 w-7" />
      </div>
      <h3 className="text-base font-bold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{resetLabel}</span>
        </button>
      )}
    </div>
  );
}
