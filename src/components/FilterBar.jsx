import React from "react";
import { Filter, RotateCcw, SlidersHorizontal, ChevronDown } from "lucide-react";
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
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
      {/* Category Horizontal Chips (Quick Filter) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          Category:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Row: Difficulty, Status, Sorting, and Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-difficulty" className="text-xs text-slate-400">
              Difficulty:
            </label>
            <div className="relative">
              <select
                id="filter-difficulty"
                value={selectedDifficulty}
                onChange={(e) => onSelectDifficulty(e.target.value)}
                className="appearance-none rounded-lg border border-slate-700 bg-slate-800 py-1.5 pl-2.5 pr-7 text-xs font-medium text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff} className="bg-slate-900 text-slate-200">
                    {diff}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-status" className="text-xs text-slate-400">
              Status:
            </label>
            <div className="relative">
              <select
                id="filter-status"
                value={selectedStatus}
                onChange={(e) => onSelectStatus(e.target.value)}
                className="appearance-none rounded-lg border border-slate-700 bg-slate-800 py-1.5 pl-2.5 pr-7 text-xs font-medium text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {STATUS_FILTERS.map((st) => (
                  <option key={st} value={st} className="bg-slate-900 text-slate-200">
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-sort" className="text-xs text-slate-400">
              Sort:
            </label>
            <div className="relative">
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) => onSelectSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-slate-700 bg-slate-800 py-1.5 pl-2.5 pr-7 text-xs font-medium text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="featured" className="bg-slate-900 text-slate-200">
                  Featured / Priority
                </option>
                <option value="points-desc" className="bg-slate-900 text-slate-200">
                  Points (High to Low)
                </option>
                <option value="points-asc" className="bg-slate-900 text-slate-200">
                  Points (Low to High)
                </option>
                <option value="deadline" className="bg-slate-900 text-slate-200">
                  Deadline (Soonest)
                </option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Results Count & Reset Button */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            Showing <strong className="text-white font-semibold">{totalResults}</strong> challenges
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3 text-indigo-400" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
