import React from "react";
import { CheckCircle2, Clock, PlayCircle, Send, Sparkles, AlertCircle } from "lucide-react";

/**
 * Distinguishes both challenge lifecycle status (Active, Upcoming, Completed)
 * and participant progress status (Not Started, In Progress, Submitted, Completed).
 * Uses explicit icons and high-contrast badges for accessibility.
 */
export default function StatusBadge({ status, type = "participant", size = "sm" }) {
  const sizeClasses = size === "xs"
    ? "text-[11px] px-2 py-0.5"
    : size === "md"
    ? "text-xs px-3 py-1"
    : "text-xs px-2.5 py-0.5";

  // Participant personal status
  if (type === "participant") {
    switch (status) {
      case "In Progress":
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 ${sizeClasses}`}
            title="Challenge In Progress"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <PlayCircle className="w-3.5 h-3.5" />
            <span>In Progress</span>
          </span>
        );
      case "Submitted":
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 ${sizeClasses}`}
            title="Solution Submitted"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submitted</span>
          </span>
        );
      case "Completed":
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${sizeClasses}`}
            title="Challenge Completed"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case "Not Started":
      default:
        return (
          <span
            className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700/60 ${sizeClasses}`}
            title="Not Started"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Not Started</span>
          </span>
        );
    }
  }

  // Challenge lifecycle status (Active, Upcoming, Completed)
  switch (status) {
    case "Active":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${sizeClasses}`}
          title="Active Challenge — Open for submissions"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Active</span>
        </span>
      );
    case "Upcoming":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 ${sizeClasses}`}
          title="Upcoming Challenge — Opens soon"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Upcoming</span>
        </span>
      );
    case "Completed":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 ${sizeClasses}`}
          title="Challenge Closed — Historical archive"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
          <span>Closed</span>
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700 ${sizeClasses}`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{status}</span>
        </span>
      );
  }
}
