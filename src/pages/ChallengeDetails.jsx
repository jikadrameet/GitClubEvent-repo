import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Award,
  Clock,
  Users,
  GitBranch,
  ExternalLink,
  CheckCircle,
  PlayCircle,
  Send,
  AlertCircle,
  CheckSquare,
  ShieldCheck,
  Sparkles,
  BookOpen,
  HelpCircle
} from "lucide-react";
import GithubIcon from "../components/GithubIcon";
import { CHALLENGES_DATA } from "../data/challenges";
import StatusBadge from "../components/StatusBadge";
import DifficultyBadge from "../components/DifficultyBadge";
import CategoryBadge from "../components/CategoryBadge";
import SubmissionModal from "../components/SubmissionModal";
import {
  getChallengeParticipantStatus,
  getChallengeSubmission,
  startChallenge
} from "../utils/storage";

export default function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the challenge by ID
  const challenge = CHALLENGES_DATA.find((c) => c.id === id);

  // Participant state
  const [participantStatus, setParticipantStatus] = useState("Not Started");
  const [submissionData, setSubmissionData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justStarted, setJustStarted] = useState(false);

  // Sync participant status
  const refreshStatus = () => {
    if (challenge) {
      const status = getChallengeParticipantStatus(challenge.id);
      const sub = getChallengeSubmission(challenge.id);
      setParticipantStatus(status);
      setSubmissionData(sub);
    }
  };

  useEffect(() => {
    refreshStatus();
    window.addEventListener("gitclub_storage_update", refreshStatus);
    return () => window.removeEventListener("gitclub_storage_update", refreshStatus);
  }, [id, challenge]);

  if (!challenge) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">Challenge Not Found</h1>
        <p className="mt-2 text-sm text-slate-400">
          The challenge identifier <code className="text-indigo-400 font-mono">"{id}"</code> does
          not exist in the arena catalog.
        </p>
        <Link
          to="/challenges"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Challenges</span>
        </Link>
      </div>
    );
  }

  const handleStart = () => {
    startChallenge(challenge.id);
    setJustStarted(true);
    setTimeout(() => setJustStarted(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Toast notification when started */}
      {justStarted && (
        <div className="fixed top-20 right-6 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-semibold text-white shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle className="w-4 h-4" />
          <span>Challenge started! Status updated to "In Progress".</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/challenges" className="hover:text-indigo-400 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Challenges</span>
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400">{challenge.category}</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-200 font-medium truncate max-w-xs">{challenge.title}</span>
      </div>

      {/* Top Banner / Hero Box */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <CategoryBadge category={challenge.category} />
              <DifficultyBadge difficulty={challenge.difficulty} />
              <StatusBadge status={challenge.status} type="lifecycle" />
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400 border border-slate-700/60">
                {challenge.estimatedTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {challenge.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {challenge.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {challenge.tags?.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-slate-800/90 px-2.5 py-1 text-xs font-mono text-slate-300 border border-slate-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Stats Panel (Points, Deadline) */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 rounded-xl bg-slate-950/70 p-4 border border-slate-800">
            <div className="text-left lg:text-right">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Challenge Value
              </span>
              <div className="flex items-center gap-1 text-2xl font-black text-amber-400">
                <Award className="w-6 h-6 text-amber-400" />
                <span>{challenge.points} pts</span>
              </div>
            </div>

            <div className="text-right border-l lg:border-l-0 lg:border-t border-slate-800 pl-4 lg:pl-0 lg:pt-3">
              <span className="text-[11px] text-slate-400 block">Deadline</span>
              <span className="text-xs font-semibold text-slate-200">
                {challenge.deadlineFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Participant Action Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-400">Your Current Status:</span>
            <StatusBadge status={participantStatus} type="participant" size="md" />
          </div>

          {/* Dynamic Action Buttons based on participant status */}
          <div className="flex items-center gap-3">
            {participantStatus === "Not Started" && (
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Challenge</span>
              </button>
            )}

            {participantStatus === "In Progress" && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Solution</span>
                </button>
              </div>
            )}

            {participantStatus === "Submitted" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Update Submission</span>
                </button>
              </div>
            )}

            {participantStatus === "Completed" && (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <CheckCircle className="w-4 h-4" />
                <span>Challenge Completed (+{challenge.points} pts)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Submitted Solution Banner if already submitted */}
      {submissionData && (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-blue-300">
              Your Active Submission Record
            </h3>
            <span className="text-[10px] text-slate-500 ml-auto">
              Submitted: {new Date(submissionData.submittedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Repository Link
              </span>
              <a
                href={submissionData.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 font-mono hover:underline flex items-center gap-1 break-all"
              >
                <span>{submissionData.repoUrl}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>

            {submissionData.demoUrl && (
              <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Live Preview Link
                </span>
                <a
                  href={submissionData.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 font-mono hover:underline flex items-center gap-1 break-all"
                >
                  <span>{submissionData.demoUrl}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            )}
          </div>

          {submissionData.notes && (
            <div className="mt-3 rounded-lg bg-slate-900/80 p-3 border border-slate-800 text-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Submission Notes
              </span>
              <p className="text-slate-300 italic">{submissionData.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Main Content Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Problem, Requirements, Rules */}
        <div className="lg:col-span-2 space-y-8">
          {/* Problem Statement */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Problem Statement & Context</h2>
            </div>
            <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
              {challenge.problemDescription}
            </div>
          </div>

          {/* Key Requirements Checklist */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Functional Requirements</h2>
            </div>
            <p className="text-xs text-slate-400">
              Your solution should satisfy all mandatory criteria below for full evaluation points:
            </p>

            <ul className="space-y-3 pt-2">
              {challenge.requirements?.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mt-0.5">
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>
                  <span className="leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenge Rules & Constraints */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Rules & Submission Guidelines</h2>
            </div>

            <ul className="space-y-2.5">
              {challenge.rules?.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Judging Criteria Breakdown */}
          {challenge.judgingCriteria && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Evaluation Criteria</h2>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-2.5">Evaluation Pillar</th>
                      <th className="px-4 py-2.5 text-right w-24">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {challenge.judgingCriteria.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-850/50">
                        <td className="px-4 py-2.5 font-medium">{c.aspect}</td>
                        <td className="px-4 py-2.5 text-right font-bold text-amber-400">
                          {c.weight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Challenge Info & Starter Assets */}
        <div className="space-y-6">
          {/* Action Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 sticky top-24">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Ready to take this on?
            </h3>

            {participantStatus === "Not Started" && (
              <button
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Challenge Now</span>
              </button>
            )}

            {participantStatus === "In Progress" && (
              <div className="space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Solution</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  Challenge in progress. Submit your GitHub repository URL when complete.
                </p>
              </div>
            )}

            {participantStatus === "Submitted" && (
              <div className="space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Update Submission</span>
                </button>
                <p className="text-[11px] text-center text-emerald-400 font-medium">
                  ✓ Solution received! Verified for leaderboard points.
                </p>
              </div>
            )}

            <hr className="border-slate-800" />

            {/* Challenge Info Meta */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Issued By:</span>
                <span className="font-semibold text-slate-200">{challenge.author}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Active Participants:</span>
                <span className="font-semibold text-slate-200">{challenge.participantsCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Estimated Time:</span>
                <span className="font-semibold text-slate-200">{challenge.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Difficulty Tier:</span>
                <span className="font-semibold text-slate-200">{challenge.difficulty}</span>
              </div>
            </div>

            {/* Starter Repo Link */}
            {challenge.starterRepo && (
              <div className="pt-2">
                <a
                  href={challenge.starterRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-medium text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>Starter Template Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            )}

            {/* Deliverables summary */}
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-2">Required Deliverables:</span>
              <ul className="space-y-1 text-[11px]">
                {challenge.deliverables?.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal Dialog */}
      <SubmissionModal
        challenge={challenge}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refreshStatus}
      />
    </div>
  );
}
