import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GitBranch, Trophy, Target, Menu, X, Award, Flame, User, Sparkles } from "lucide-react";
import { getParticipantStats, getDynamicLeaderboard } from "../utils/storage";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState(getParticipantStats());
  const [userRank, setUserRank] = useState(4);
  const location = useLocation();

  const updateStats = () => {
    const s = getParticipantStats();
    setStats(s);
    const leaderboard = getDynamicLeaderboard();
    const current = leaderboard.find((p) => p.isCurrentParticipant);
    if (current) {
      setUserRank(current.rank);
    }
  };

  useEffect(() => {
    updateStats();
    window.addEventListener("gitclub_storage_update", updateStats);
    return () => {
      window.removeEventListener("gitclub_storage_update", updateStats);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Arena", path: "/" },
    { label: "Challenges", path: "/challenges" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GitBranch className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white tracking-tight text-base sm:text-lg">
                    Git Club
                  </span>
                  <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/30">
                    CHARUSAT
                  </span>
                </div>
                <span className="text-[11px] font-medium tracking-wide text-slate-400">
                  Challenge Arena <span className="text-slate-600">•</span> <span className="text-indigo-400/90">Learn by Building</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-800">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-slate-850 text-white border border-slate-700 shadow-sm"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Participant Quick Summary & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Participant Mini Stats (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-800 px-3 py-1.5">
              <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800 text-xs">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-bold text-white">{stats.totalPoints}</span>
                <span className="text-slate-400">pts</span>
              </div>

              <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800 text-xs">
                <Trophy className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-slate-400">Rank</span>
                <span className="font-bold text-indigo-300">#{userRank}</span>
              </div>

              <Link
                to="/leaderboard"
                className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-indigo-400 transition-colors"
                title="View on Leaderboard"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>You</span>
              </Link>
            </div>

            {/* Explore CTA on desktop */}
            <Link
              to="/challenges"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-500/30 hover:bg-indigo-500 transition-all active:scale-95"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Browse Arena</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 shadow-xl backdrop-blur-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-slate-850 text-indigo-400 border border-slate-700"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile User Stats summary */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Your Stats:</span>
              <span className="text-amber-400 font-bold">{stats.totalPoints} pts</span>
              <span className="text-slate-600">•</span>
              <span className="text-indigo-400 font-bold">Rank #{userRank}</span>
            </div>
            <Link
              to="/leaderboard"
              className="text-xs font-medium text-indigo-400 hover:underline"
            >
              Leaderboard →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
