import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-teal-50 text-accent mb-5">
        <Compass className="h-8 w-8" />
      </div>

      <span className="rounded bg-surface-sunken px-3 py-1 text-xs font-mono font-semibold text-text-secondary">
        Error 404 · Not Found
      </span>

      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
        Page Not Found
      </h1>

      <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 rounded-md bg-surface-sunken px-4 py-2 text-xs font-semibold text-text-primary hover:bg-border-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Explore Challenges</span>
        </Link>
      </div>
    </div>
  );
}
