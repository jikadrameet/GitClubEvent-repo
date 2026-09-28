import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft, Home, GitBranch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner mb-6">
        <Compass className="h-10 w-10 animate-pulse" />
      </div>

      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono font-semibold text-indigo-400 border border-slate-700">
        Error 404 • Route Not Found
      </span>

      <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white">
        Lost in the Repository?
      </h1>

      <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
        The arena page or challenge route you're looking for doesn't exist or may have been refactored.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Arena Home</span>
        </Link>

        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Explore Challenges</span>
        </Link>
      </div>
    </div>
  );
}
