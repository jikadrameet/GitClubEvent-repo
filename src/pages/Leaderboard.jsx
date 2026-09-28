import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Users,
  Search,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2
} from "lucide-react";
import { getDynamicLeaderboard, getParticipantStats } from "../utils/storage";
import LeaderboardTable from "../components/LeaderboardTable";

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
};

const podiumContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const podiumItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

const sectionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(getDynamicLeaderboard());
  const [stats, setStats] = useState(getParticipantStats());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const refreshData = () => {
    setLeaderboard(getDynamicLeaderboard());
    setStats(getParticipantStats());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("gitclub_storage_update", refreshData);
    return () => window.removeEventListener("gitclub_storage_update", refreshData);
  }, []);

  const currentUser = leaderboard.find((p) => p.isCurrentParticipant) || {
    rank: 4,
    points: stats.totalPoints,
    challengesCompleted: stats.completedCount + stats.submittedCount
  };

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const filteredParticipants = useMemo(() => {
    return leaderboard.filter((p) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDept = p.department.toLowerCase().includes(query);
        const matchesHandle = p.handle.toLowerCase().includes(query);
        if (!matchesName && !matchesDept && !matchesHandle) return false;
      }

      if (selectedDept !== "All") {
        if (!p.department.toLowerCase().includes(selectedDept.toLowerCase())) return false;
      }

      return true;
    });
  }, [leaderboard, searchQuery, selectedDept]);

  const departments = ["All", "CSPIT", "DEPSTAR", "CMPICA", "RPCP"];

  return (
    <motion.div 
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <motion.div variants={sectionVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Git Club CHARUSAT Standings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Leaderboard
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Campus rankings reflecting challenge completions and peer submissions.
          </p>
        </div>

        {/* Your rank */}
        <div className="flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50 p-4 transition-transform hover:-translate-y-0.5 hover:shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-white font-bold text-sm">
            #{currentUser.rank}
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent block">
              Your Standing
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-text-primary">Rank #{currentUser.rank}</span>
              <span className="text-xs text-warning font-semibold">{currentUser.points} pts</span>
            </div>
            <p className="text-[11px] text-text-tertiary">
              {currentUser.challengesCompleted} completed
            </p>
          </div>
        </div>
      </motion.div>

      {/* Podium */}
      <motion.div 
        variants={podiumContainerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
      >
        {/* Silver */}
        {top2 && (
          <motion.div 
            variants={podiumItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative order-2 md:order-1 rounded-lg border border-border-primary bg-white p-5 text-center transition-shadow hover:shadow-md"
          >
            <div className="mx-auto -mt-9 mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-700 font-extrabold text-lg">
              🥈
            </div>
            <h3 className="font-bold text-text-primary text-sm">{top2.name}</h3>
            <p className="text-xs text-text-tertiary font-mono">@{top2.handle}</p>
            <p className="mt-0.5 text-[11px] text-text-tertiary line-clamp-1">{top2.department}</p>
            <div className="mt-3 pt-3 border-t border-border-primary flex items-center justify-between text-xs">
              <span className="text-text-tertiary">Done: {top2.challengesCompleted}</span>
              <span className="font-bold text-warning">{top2.points} pts</span>
            </div>
          </motion.div>
        )}

        {/* Gold */}
        {top1 && (
          <motion.div 
            variants={podiumItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative order-1 md:order-2 rounded-lg border border-amber-200 bg-amber-50/50 p-5 text-center md:-translate-y-1 transition-shadow hover:shadow-md"
          >
            <div className="mx-auto -mt-10 mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-extrabold text-xl ring-2 ring-amber-200">
              🥇
            </div>
            <div className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 mb-1">
              <Sparkles className="w-3 h-3" /> Arena Leader
            </div>
            <h3 className="font-extrabold text-text-primary text-base">{top1.name}</h3>
            <p className="text-xs text-warning font-mono">@{top1.handle}</p>
            <p className="mt-0.5 text-[11px] text-text-tertiary line-clamp-1">{top1.department}</p>
            <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="text-text-secondary">Done: {top1.challengesCompleted}</span>
              <span className="font-extrabold text-warning text-sm">{top1.points} pts</span>
            </div>
          </motion.div>
        )}

        {/* Bronze */}
        {top3 && (
          <motion.div 
            variants={podiumItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative order-3 rounded-lg border border-border-primary bg-white p-5 text-center transition-shadow hover:shadow-md"
          >
            <div className="mx-auto -mt-9 mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700 font-extrabold text-lg">
              🥉
            </div>
            <h3 className="font-bold text-text-primary text-sm">{top3.name}</h3>
            <p className="text-xs text-text-tertiary font-mono">@{top3.handle}</p>
            <p className="mt-0.5 text-[11px] text-text-tertiary line-clamp-1">{top3.department}</p>
            <div className="mt-3 pt-3 border-t border-border-primary flex items-center justify-between text-xs">
              <span className="text-text-tertiary">Done: {top3.challengesCompleted}</span>
              <span className="font-bold text-warning">{top3.points} pts</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Search & filter */}
      <motion.div variants={sectionVariants} className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-border-primary bg-white p-3">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search participant..."
            className="w-full rounded-md border border-border-primary bg-white py-2 pl-9 pr-4 text-xs text-text-primary placeholder-text-tertiary outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <span className="text-xs text-text-tertiary mr-1 hidden sm:inline">Institute:</span>
          {departments.map((dept) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedDept === dept
                  ? "bg-accent text-white"
                  : "bg-surface-sunken text-text-secondary hover:bg-border-primary"
              }`}
            >
              {dept}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={sectionVariants} className="space-y-3">
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span>
            <strong className="text-text-primary">{filteredParticipants.length}</strong> participants
          </span>
          <span className="flex items-center gap-1 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            Highlighted = your profile
          </span>
        </div>
        <LeaderboardTable participants={filteredParticipants} />
      </motion.div>

      {/* CTA */}
      <motion.div 
        variants={sectionVariants} 
        className="rounded-lg border border-border-primary bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-sm font-bold text-text-primary">Boost your standing</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Complete active challenges to earn up to 350 points each.
          </p>
        </div>
        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-dark transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <span>Find Challenges</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
