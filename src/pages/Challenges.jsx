import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CHALLENGES_DATA } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import EmptyState from "../components/EmptyState";
import { getChallengeParticipantStatus } from "../utils/storage";

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

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

      if (selectedCategory !== "All Categories") {
        if (challenge.category !== selectedCategory) return false;
      }

      if (selectedDifficulty !== "All Difficulties") {
        if (challenge.difficulty !== selectedDifficulty) return false;
      }

      if (selectedStatus !== "All Statuses") {
        if (challenge.status !== selectedStatus) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "points-desc") return b.points - a.points;
      if (sortBy === "points-asc") return a.points - b.points;
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      return 0;
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
    <motion.div 
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-50 text-accent">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              Challenge Catalog
            </h1>
            <p className="text-xs text-text-secondary">
              Explore challenges, test your skills, and ship real code.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div className="space-y-3" variants={itemVariants}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by keywords (e.g. AI, React, Docker, Portal)..."
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
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filteredChallenges.length > 0 ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: 0.05 } }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredChallenges.map((challenge) => (
                <motion.div 
                  key={challenge.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                >
                  <ChallengeCard challenge={challenge} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <EmptyState
              title="No challenges matched"
              description="Try broadening your search or resetting filters."
              onReset={handleResetFilters}
              resetLabel="Clear all filters"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
