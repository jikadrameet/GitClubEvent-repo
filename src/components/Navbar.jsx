import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GitBranch, Trophy, Target, Menu, X, Award } from "lucide-react";
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
    { label: "Home", path: "/" },
    { label: "Challenges", path: "/challenges" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border-primary bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white transition-transform group-hover:scale-105">
                <GitBranch className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-text-primary text-sm tracking-tight">
                  Git Club
                </span>
                <span className="hidden sm:inline text-[10px] font-semibold text-accent bg-accent-light px-1.5 py-0.5 rounded">
                  CHARUSAT
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? "bg-surface-sunken text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-sunken"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Stats pill — desktop */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Award className="h-3.5 w-3.5 text-warning" />
                <span className="font-semibold text-text-primary">{stats.totalPoints}</span>
                <span>pts</span>
              </div>
              <span className="text-border-secondary">·</span>
              <Link
                to="/leaderboard"
                className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
              >
                <span className="font-medium">Rank</span>
                <span className="font-bold text-accent">#{userRank}</span>
              </Link>
            </div>

            {/* CTA — desktop */}
            <Link
              to="/challenges"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Browse</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center rounded-md p-1.5 text-text-secondary hover:bg-surface-sunken hover:text-text-primary"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-primary bg-white px-4 pt-2 pb-4 animate-fade-in-down">
          <div className="space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-surface-sunken text-accent"
                    : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-border-primary flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="font-medium text-text-primary">Stats:</span>
              <span className="text-warning font-semibold">{stats.totalPoints} pts</span>
              <span className="text-border-secondary">·</span>
              <span className="text-accent font-semibold">Rank #{userRank}</span>
            </div>
            <Link to="/leaderboard" className="text-xs font-medium text-accent hover:underline">
              Leaderboard →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
