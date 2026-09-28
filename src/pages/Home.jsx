import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Code2,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  Terminal,
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

  const activeChallenges = CHALLENGES_DATA.filter((c) => c.status === "Active");
  const upcomingChallenges = CHALLENGES_DATA.filter((c) => c.status === "Upcoming");

  return (
    <div className="space-y-14 pb-16">
      {/* Reset toast */}
      {resetMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-md bg-accent px-4 py-3 text-xs font-semibold text-white shadow-lg flex items-center gap-2 animate-fade-in">
          <RotateCcw className="w-4 h-4" />
          <span>Progress restored to default!</span>
        </div>
      )}

      {/* HERO SECTION — Clean, purposeful, no ambient glows */}
      <section className="pt-12 sm:pt-20 pb-4">
        <div className="mx-auto max-w-4xl text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-md bg-teal-50 px-3 py-1.5 text-xs font-semibold text-accent border border-teal-200 mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Problem Statement 4 · Git Club CHARUSAT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            Challenge Arena
          </h1>
          <p className="mt-2 text-lg sm:text-xl font-medium text-accent tracking-tight">
            Learn by Building.
          </p>

          <p className="mt-5 max-w-xl mx-auto text-base text-text-secondary leading-relaxed">
            The competitive arena for CHARUSAT student engineers.
            Tackle real-world challenges, submit repositories, and rise up the campus leaderboard.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              <Rocket className="w-4 h-4" />
              <span>Explore Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/leaderboard"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-text-primary border border-border-primary hover:bg-surface-sunken transition-colors"
            >
              <Trophy className="w-4 h-4 text-warning" />
              <span>View Leaderboard</span>
            </Link>
          </div>

          {/* Pillars — simple inline list, not floating cards */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            {[
              { icon: Code2, label: "Real Campus Tasks", desc: "Tailored for CHARUSAT", color: "text-accent" },
              { icon: GitPullRequest, label: "Git First", desc: "Clean commits & docs", color: "text-emerald-600" },
              { icon: Trophy, label: "Live Ranking", desc: "Cross-department competition", color: "text-warning" },
              { icon: Terminal, label: "Simulated Submissions", desc: "Browser persistence", color: "text-sky-600" },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="rounded-md border border-border-primary bg-white p-3">
                <div className={`flex items-center gap-1.5 ${color} text-xs font-semibold`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>
                <p className="mt-1 text-[11px] text-text-tertiary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRESS SECTION */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6" id="my-progress">
        <div className="rounded-lg border border-border-primary bg-white p-6 sm:p-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-border-primary">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-text-primary tracking-tight">
                  Your Progress
                </h2>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="mt-1 text-xs text-text-secondary">
                Track challenges, earned points, and submission records.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-md bg-surface-sunken px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-border-primary hover:text-text-primary transition-colors"
                title="Reset local participant data"
              >
                <RotateCcw className="w-3.5 h-3.5 text-text-tertiary" />
                <span>Reset</span>
              </button>
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-1.5 rounded-md bg-teal-50 px-3 py-1.5 text-xs font-semibold text-accent border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                <span>Standings</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              title="Total Score"
              value={`${stats.totalPoints} pts`}
              subtitle="Arena points"
              icon={Trophy}
              color="amber"
              badge="Top 10%"
            />
            <StatCard
              title="Done"
              value={`${stats.completedCount + stats.submittedCount}`}
              subtitle={`${stats.completedCount} verified · ${stats.submittedCount} review`}
              icon={CheckCircle2}
              color="emerald"
            />
            <StatCard
              title="In Progress"
              value={`${stats.inProgressCount}`}
              subtitle="Active challenges"
              icon={PlayCircle}
              color="teal"
            />
            <StatCard
              title="Completion"
              value={`${stats.completionPercentage}%`}
              subtitle={`${stats.completedCount + stats.submittedCount} of ${stats.totalAvailableChallenges}`}
              icon={Rocket}
              color="sky"
            />
          </div>

          {/* Progress bar */}
          <div className="mt-5 rounded-md bg-surface-sunken p-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-text-secondary font-medium">Challenge Roadmap</span>
              <span className="text-accent font-bold">{stats.completionPercentage}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border-primary">
              <div
                className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.max(stats.completionPercentage, 5)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVE CHALLENGES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h2 className="text-xl font-bold tracking-tight text-text-primary">Active Challenges</h2>
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              Open for participation. Pick one and start building.
            </p>
          </div>
          <Link
            to="/challenges?status=Active"
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            <span>View all ({activeChallenges.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeChallenges.slice(0, 3).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      {/* UPCOMING */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="text-xl font-bold tracking-tight text-text-primary">Upcoming</h2>
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              Review requirements and plan your stack before they open.
            </p>
          </div>
          <Link
            to="/challenges?status=Upcoming"
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
          >
            <span>View all ({upcomingChallenges.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingChallenges.slice(0, 3).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — Timeline, not cards */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-lg border border-border-primary bg-white p-7">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">How it works</span>
            <h2 className="mt-1.5 text-xl font-bold text-text-primary tracking-tight">
              The Arena Journey
            </h2>
            <p className="mt-1.5 text-sm text-text-secondary">
              From curiosity to production-ready open source projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discover & Filter", desc: "Browse by category, difficulty, and tech stack." },
              { step: "02", title: "Inspect & Start", desc: "Read requirements, judging criteria, then begin." },
              { step: "03", title: "Submit Solution", desc: "Link your GitHub repo and live preview." },
              { step: "04", title: "Climb Leaderboard", desc: "Earn points and recognition across campus." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-md border border-border-primary bg-surface-sunken p-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent font-bold text-xs mb-2.5">
                  {step}
                </div>
                <h3 className="text-sm font-bold text-text-primary">{title}</h3>
                <p className="mt-1 text-xs text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Ready to Build Your Next Milestone?
          </h2>
          <p className="mt-2 max-w-lg mx-auto text-sm text-text-secondary">
            Join fellow CHARUSAT developers. Dive into the Challenge Arena today.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent-dark transition-colors"
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
