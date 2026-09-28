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
    <div className="group relative flex flex-col justify-between bg-white border border-border-primary rounded-lg p-5 transition-all duration-200 hover:border-border-secondary hover:shadow-sm">
      {/* Top: Category & Status */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={challenge.category} size="xs" />
          <StatusBadge status={challenge.status} type="lifecycle" size="xs" />
        </div>

        {/* Title & Description */}
        <div className="mt-3">
          <Link
            to={`/challenge/${challenge.id}`}
            className="group-hover:text-accent transition-colors"
          >
            <h3 className="text-base font-bold text-text-primary line-clamp-1 tracking-tight">
              {challenge.title}
            </h3>
          </Link>
          <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary line-clamp-2">
            {challenge.shortDescription}
          </p>
        </div>

        {/* Tags */}
        {challenge.tags && challenge.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {challenge.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-text-secondary"
              >
                {tag}
              </span>
            ))}
            {challenge.tags.length > 3 && (
              <span className="rounded bg-surface-sunken px-1.5 py-0.5 text-[11px] text-text-tertiary">
                +{challenge.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Difficulty & Points */}
        <div className="mt-4 flex items-center justify-between border-t border-border-primary pt-3">
          <DifficultyBadge difficulty={challenge.difficulty} size="xs" />
          <div className="flex items-center gap-1 text-xs font-semibold text-warning">
            <Award className="w-3.5 h-3.5" />
            <span>{challenge.points} pts</span>
          </div>
        </div>

        {/* Deadline & Participants */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-text-tertiary">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Due {challenge.deadlineFormatted}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{challenge.participantsCount} builders</span>
          </div>
        </div>

        {/* Your status row */}
        <div className="mt-3 flex items-center justify-between rounded-md bg-surface-sunken px-2.5 py-1.5 text-[11px]">
          <span className="text-text-secondary flex items-center gap-1">
            <Clock className="w-3 h-3 text-text-tertiary" />
            Your Status:
          </span>
          <StatusBadge status={participantStatus} type="participant" size="xs" />
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-2">
        <Link
          to={`/challenge/${challenge.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-surface-sunken px-3 py-2 text-xs font-semibold text-text-primary transition-all hover:bg-accent hover:text-white"
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
