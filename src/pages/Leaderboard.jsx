import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  Medal,
  Users,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  GitBranch
} from "lucide-react";
import { getDynamicLeaderboard, getParticipantStats } from "../utils/storage";
import LeaderboardTable from "../components/LeaderboardTable";

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

  // Find current participant's entry
  const currentUser = leaderboard.find((p) => p.isCurrentParticipant) || {
    rank: 4,
    points: stats.totalPoints,
    challengesCompleted: stats.completedCount + stats.submittedCount
  };

  // Top 3 Podium
  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  // Filter participants
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
        if (!p.department.toLowerCase().includes(selectedDept.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [leaderboard, searchQuery, selectedDept]);

  const departments = ["All", "CSPIT", "DEPSTAR", "CMPICA", "RPCP"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header & Your Rank Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30 mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Git Club CHARUSAT Standings</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Participant Leaderboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Real-time campus rankings reflecting challenge completions and verified peer submissions.
          </p>
        </div>

        {/* Your Rank Summary Card (Requirement 8) */}
        <div className="flex items-center gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 p-4 sm:p-5 shadow-lg backdrop-blur">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xl shadow-md shadow-indigo-600/30">
            #{currentUser.rank}
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300 block">
              Your Campus Standing
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">Rank #{currentUser.rank}</span>
              <span className="text-xs text-amber-400 font-semibold">{currentUser.points} pts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {currentUser.challengesCompleted} challenges completed
            </p>
          </div>
        </div>
      </div>

      {/* TOP 3 PODIUM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Silver - 2nd place */}
        {top2 && (
          <div className="relative order-2 md:order-1 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 text-center shadow-lg transition-all hover:border-slate-600">
            <div className="mx-auto -mt-10 mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-950 font-black text-xl shadow-lg">
              🥈 2
            </div>
            <h3 className="font-bold text-white text-base">{top2.name}</h3>
            <p className="text-xs text-slate-400 font-mono">@{top2.handle}</p>
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">{top2.department}</p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Completed: {top2.challengesCompleted}</span>
              <span className="font-bold text-amber-400">{top2.points} pts</span>
            </div>
          </div>
        )}

        {/* Gold - 1st place */}
        {top1 && (
          <div className="relative order-1 md:order-2 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-slate-900/90 to-slate-900 p-6 text-center shadow-2xl transition-all hover:border-amber-500/60 md:-translate-y-2">
            <div className="mx-auto -mt-12 mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-amber-950 font-black text-2xl shadow-xl shadow-amber-500/20 ring-4 ring-amber-500/20">
              🥇 1
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30 mb-1">
              <Sparkles className="w-3 h-3" /> Arena Leader
            </div>
            <h3 className="font-black text-white text-lg">{top1.name}</h3>
            <p className="text-xs text-amber-400 font-mono">@{top1.handle}</p>
            <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{top1.department}</p>
            <div className="mt-4 pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs">
              <span className="text-slate-300">Completed: {top1.challengesCompleted}</span>
              <span className="font-black text-amber-300 text-sm">{top1.points} pts</span>
            </div>
          </div>
        )}

        {/* Bronze - 3rd place */}
        {top3 && (
          <div className="relative order-3 md:order-3 rounded-2xl border border-amber-800/40 bg-slate-900/80 p-6 text-center shadow-lg transition-all hover:border-amber-700/60">
            <div className="mx-auto -mt-10 mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-600 text-white font-black text-xl shadow-lg">
              🥉 3
            </div>
            <h3 className="font-bold text-white text-base">{top3.name}</h3>
            <p className="text-xs text-slate-400 font-mono">@{top3.handle}</p>
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">{top3.department}</p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Completed: {top3.challengesCompleted}</span>
              <span className="font-bold text-amber-400">{top3.points} pts</span>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH & DEPARTMENT FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or handle..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Department Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Institute:</span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedDept === dept
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700/60"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* LEADERBOARD TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Displaying <strong className="text-white">{filteredParticipants.length}</strong> ranked participants
          </span>
          <span className="flex items-center gap-1 text-indigo-400">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Highlighted row is your active profile
          </span>
        </div>

        <LeaderboardTable participants={filteredParticipants} />
      </div>

      {/* CTA to earn more points */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Want to boost your standing?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Pick up an active challenge, submit your GitHub repository, and gain up to 350 points per milestone!
          </p>
        </div>
        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-all flex-shrink-0"
        >
          <span>Find Open Challenges</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
