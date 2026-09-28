import React from "react";
import { Filter, RotateCcw, ChevronDown } from "lucide-react";
import { CATEGORIES, DIFFICULTIES, STATUS_FILTERS } from "../data/challenges";

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  selectedStatus,
  onSelectStatus,
  sortBy,
  onSelectSortBy,
  onResetFilters,
  totalResults,
  isFiltered
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border-primary bg-white p-4">
      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary whitespace-nowrap flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5 text-accent" />
          Category:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-accent text-white"
                  : "bg-surface-sunken text-text-secondary hover:bg-border-primary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-primary pt-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-difficulty" className="text-xs text-text-tertiary">
              Difficulty:
            </label>
            <div className="relative">
              <select
                id="filter-difficulty"
                value={selectedDifficulty}
                onChange={(e) => onSelectDifficulty(e.target.value)}
                className="appearance-none rounded-md border border-border-primary bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-status" className="text-xs text-text-tertiary">
              Status:
            </label>
            <div className="relative">
              <select
                id="filter-status"
                value={selectedStatus}
                onChange={(e) => onSelectStatus(e.target.value)}
                className="appearance-none rounded-md border border-border-primary bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {STATUS_FILTERS.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-sort" className="text-xs text-text-tertiary">
              Sort:
            </label>
            <div className="relative">
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) => onSelectSortBy(e.target.value)}
                className="appearance-none rounded-md border border-border-primary bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                <option value="featured">Featured / Priority</option>
                <option value="points-desc">Points (High to Low)</option>
                <option value="points-asc">Points (Low to High)</option>
                <option value="deadline">Deadline (Soonest)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
            </div>
          </div>
        </div>

        {/* Results & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-tertiary">
            Showing <strong className="text-text-primary font-semibold">{totalResults}</strong> challenges
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 rounded-md bg-surface-sunken px-2.5 py-1 text-xs font-medium text-text-secondary hover:bg-border-primary hover:text-text-primary transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3 text-accent" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
