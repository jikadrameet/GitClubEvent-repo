import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Code2,
  Trophy,
  Users,
  ArrowRight,
  Flame,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  Clock,
  Terminal,
  Compass,
  GitPullRequest,
  RotateCcw
} from "lucide-react";
import { CHALLENGES_DATA } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";
import StatCard from "../components/StatCard";
import { getParticipantStats, resetParticipantProgress } from "../utils/storage";

export default function Home() {
  const [stats, setStats] = useState(getParticipantStats());
  const [resetMessage, setResetMessage] = useState(false);

  const updateStats = () => {
    setStats(getParticipantStats());
  };

  useEffect(() => {
    updateStats();
    window.addEventListener("gitclub_storage_update", updateStats);
    return () => {
      window.removeEventListener("gitclub_storage_update", updateStats);
    };
  }, []);

  const handleReset = () => {
    if (window.confirm("Reset your participant progress back to default demo state?")) {
      resetParticipantProgress();
      setResetMessage(true);
      setTimeout(() => setResetMessage(false), 3000);
    }
  };

  // Group challenges
  const activeChallenges = CHALLENGES_DATA.filter((c) => c.status === "Active");
  const upcomingChallenges = CHALLENGES_DATA.filter((c) => c.status === "Upcoming");

  return (
    <div className="space-y-16 pb-16">
      {/* Reset notification toast if triggered */}
      {resetMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <RotateCcw className="w-4 h-4" />
          <span>Progress state restored to default!</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-8">
        {/* Glow ambient background effects */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-sky-600/15 to-transparent blur-3xl"></div>

        <div className="mx-auto max-w-5xl text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/30 mb-6 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Problem Statement 4 • Git Club CHARUSAT</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
            Git Club Challenge Arena
            <span className="block mt-2 text-gradient-accent">
              Learn by Building.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <strong>Build. Compete. Improve.</strong> The official competitive arena for CHARUSAT student engineers.
            Tackle real-world club challenges, submit simulated repositories, and rise up the campus leaderboard.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              <span>Explore Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/leaderboard"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800/90 px-6 py-3.5 text-sm font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>View Leaderboard</span>
            </Link>
          </div>

          {/* Quick Pillars Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                <Code2 className="w-4 h-4" />
                <span>Real Campus Tasks</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Tailored challenges for CHARUSAT needs</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <GitPullRequest className="w-4 h-4" />
                <span>Git First Workflow</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Atomic commits & clean documentation</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <Trophy className="w-4 h-4" />
                <span>Live Ranking</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Compete across CSPIT, DEPSTAR & CMPICA</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Simulated Submissions</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">Instant feedback & browser persistence</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTICIPANT PROGRESS CARD (Requirement 7) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="my-progress">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Your Participant Progress
                </h2>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                  Active Builder
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Track your ongoing challenges, earned arena points, and submission records.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
                title="Reset local participant data to initial test state"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Demo State</span>
              </button>

              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors"
              >
                <span>Check Standings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Score"
              value={`${stats.totalPoints} pts`}
              subtitle="Arena points accumulated"
              icon={Trophy}
              color="amber"
              badge="Top 10%"
            />
            <StatCard
              title="Completed / Submitted"
              value={`${stats.completedCount + stats.submittedCount}`}
              subtitle={`${stats.completedCount} verified • ${stats.submittedCount} under review`}
              icon={CheckCircle2}
              color="emerald"
            />
            <StatCard
              title="In Progress"
              value={`${stats.inProgressCount}`}
              subtitle="Challenges actively working on"
              icon={PlayCircle}
              color="indigo"
            />
            <StatCard
              title="Arena Completion"
              value={`${stats.completionPercentage}%`}
              subtitle={`${stats.completedCount + stats.submittedCount} of ${stats.totalAvailableChallenges} catalog tasks`}
              icon={Rocket}
              color="sky"
            />
          </div>

          {/* Progress Bar Visualization */}
          <div className="mt-6 rounded-xl bg-slate-950 p-4 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Overall Challenge Roadmap</span>
              <span className="text-indigo-400 font-bold">{stats.completionPercentage}% Completed</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${Math.max(stats.completionPercentage, 5)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVE CHALLENGES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white">Active Challenges</h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Open for immediate participation. Pick a challenge, start building, and submit your solution.
            </p>
          </div>

          <Link
            to="/challenges?status=Active"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View all active ({activeChallenges.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.slice(0, 3).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      {/* UPCOMING CHALLENGES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <h2 className="text-2xl font-bold tracking-tight text-white">Upcoming Sprints</h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Get ahead of the curve. Review requirements and plan your tech stack before the timer starts.
            </p>
          </div>

          <Link
            to="/challenges?status=Upcoming"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View all upcoming ({upcomingChallenges.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingChallenges.slice(0, 3).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS / JOURNEY STEPPER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Step-by-Step Flow
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The Challenge Arena Journey
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Engineered to take students from curiosity to production-ready open source projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm mb-3 border border-indigo-500/20">
                01
              </div>
              <h3 className="text-sm font-bold text-white">Discover & Filter</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                Filter by Web, AI/ML, Open Source, and difficulty to match your skillset.
              </p>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm mb-3 border border-indigo-500/20">
                02
              </div>
              <h3 className="text-sm font-bold text-white">Inspect & Start</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                Read deep project requirements, judging criteria, and start the challenge clock.
              </p>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm mb-3 border border-indigo-500/20">
                03
              </div>
              <h3 className="text-sm font-bold text-white">Simulate Submission</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                Link your GitHub repository and live preview link with architectural notes.
              </p>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm mb-3 border border-indigo-500/20">
                04
              </div>
              <h3 className="text-sm font-bold text-white">Climb Leaderboard</h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                Earn verified challenge points and gain recognition across CHARUSAT departments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-8 sm:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Build Your Next Milestone?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-slate-300">
            Join fellow CHARUSAT developers taking on Problem Statement 4. Dive into the Challenge Arena today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/40 hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              <span>Browse All Challenges</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
