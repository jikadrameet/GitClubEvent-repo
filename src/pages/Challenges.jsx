import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Target, Sparkles, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { CHALLENGES_DATA } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import { getChallengeParticipantStatus } from "../utils/storage";

export default function Challenges() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All Categories"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    searchParams.get("difficulty") || "All Difficulties"
  );
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "All Statuses"
  );
  const [sortBy, setSortBy] = useState("featured");

  // Keep URL query params in sync
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) setSelectedCategory(categoryParam);

    const statusParam = searchParams.get("status");
    if (statusParam) setSelectedStatus(statusParam);

    const diffParam = searchParams.get("difficulty");
    if (diffParam) setSelectedDifficulty(diffParam);
  }, [searchParams]);

  // Handle storage update to re-render participant progress badges
  const [, setRefreshKey] = useState(0);
  useEffect(() => {
    const handleUpdate = () => setRefreshKey((k) => k + 1);
    window.addEventListener("gitclub_storage_update", handleUpdate);
    return () => window.removeEventListener("gitclub_storage_update", handleUpdate);
  }, []);

  // Filter & Search Logic
  const filteredChallenges = useMemo(() => {
    return CHALLENGES_DATA.filter((challenge) => {
      // 1. Search Query (Matches title, description, or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = challenge.title.toLowerCase().includes(query);
        const matchesDesc = challenge.shortDescription.toLowerCase().includes(query);
        const matchesCategory = challenge.category.toLowerCase().includes(query);
        const matchesTags = challenge.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "All Categories") {
        if (challenge.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Difficulty Filter
      if (selectedDifficulty !== "All Difficulties") {
        if (challenge.difficulty !== selectedDifficulty) {
          return false;
        }
      }

      // 4. Status Filter (Lifecycle status)
      if (selectedStatus !== "All Statuses") {
        if (challenge.status !== selectedStatus) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "points-desc") return b.points - a.points;
      if (sortBy === "points-asc") return a.points - b.points;
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      return 0; // 'featured' retains natural priority order
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus, sortBy]);

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All Categories" ||
    selectedDifficulty !== "All Difficulties" ||
    selectedStatus !== "All Statuses" ||
    sortBy !== "featured";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedDifficulty("All Difficulties");
    setSelectedStatus("All Statuses");
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Challenge Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore university challenges, test your architectural mettle, and ship real code.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by keywords (e.g. AI, React, Lost & Found, Docker, Portal)..."
        />

        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchParams((prev) => {
              if (cat === "All Categories") prev.delete("category");
              else prev.set("category", cat);
              return prev;
            });
          }}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={(diff) => {
            setSelectedDifficulty(diff);
            setSearchParams((prev) => {
              if (diff === "All Difficulties") prev.delete("difficulty");
              else prev.set("difficulty", diff);
              return prev;
            });
          }}
          selectedStatus={selectedStatus}
          onSelectStatus={(st) => {
            setSelectedStatus(st);
            setSearchParams((prev) => {
              if (st === "All Statuses") prev.delete("status");
              else prev.set("status", st);
              return prev;
            });
          }}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredChallenges.length}
          isFiltered={isFiltered}
        />
      </div>

      {/* Challenge Cards Grid or Empty State */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No challenges matched your criteria"
          description="Try broadening your search query or resetting active category, difficulty, and status filters."
          onReset={handleResetFilters}
          resetLabel="Clear all filters"
        />
      )}
    </div>
  );
}
