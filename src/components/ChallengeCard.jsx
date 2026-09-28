import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Award, ArrowRight, Users, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";
import DifficultyBadge from "./DifficultyBadge";
import CategoryBadge from "./CategoryBadge";
import { getChallengeParticipantStatus } from "../utils/storage";

export default function ChallengeCard({ challenge }) {
  const participantStatus = getChallengeParticipantStatus(challenge.id);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Top Header: Category & Lifecycle Status */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={challenge.category} size="xs" />
          <div className="flex items-center gap-1.5">
            <StatusBadge status={challenge.status} type="lifecycle" size="xs" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-3">
          <Link
            to={`/challenge/${challenge.id}`}
            className="group-hover:text-indigo-400 transition-colors"
          >
            <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
              {challenge.title}
            </h3>
          </Link>
          <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
            {challenge.shortDescription}
          </p>
        </div>

        {/* Tags */}
        {challenge.tags && challenge.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {challenge.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
            {challenge.tags.length > 3 && (
              <span className="rounded bg-slate-800/50 px-1.5 py-0.5 text-[10px] text-slate-500">
                +{challenge.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Meta specs row: Difficulty & Points */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
          <DifficultyBadge difficulty={challenge.difficulty} size="xs" />
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{challenge.points} pts</span>
          </div>
        </div>

        {/* Deadline & Participants */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span>Due {challenge.deadlineFormatted}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-500" />
            <span>{challenge.participantsCount} builders</span>
          </div>
        </div>

        {/* Participant's personal status banner if started */}
        <div className="mt-3.5 flex items-center justify-between rounded-lg bg-slate-850 px-2.5 py-1.5 border border-slate-800 text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            Your Status:
          </span>
          <StatusBadge status={participantStatus} type="participant" size="xs" />
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-2">
        <Link
          to={`/challenge/${challenge.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 border border-slate-700/80 transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
        >
          <span>
            {participantStatus === "In Progress"
              ? "Continue Challenge"
              : participantStatus === "Submitted"
              ? "Review Submission"
              : participantStatus === "Completed"
              ? "View Solution"
              : "View Challenge"}
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
