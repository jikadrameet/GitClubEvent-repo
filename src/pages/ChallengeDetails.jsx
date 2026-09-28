import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Award,
  Clock,
  Users,
  ExternalLink,
  CheckCircle,
  PlayCircle,
  Send,
  AlertCircle,
  CheckSquare,
  ShieldCheck,
  Sparkles,
  BookOpen
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

  const challenge = CHALLENGES_DATA.find((c) => c.id === id);

  const [participantStatus, setParticipantStatus] = useState("Not Started");
  const [submissionData, setSubmissionData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justStarted, setJustStarted] = useState(false);

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
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-error mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-text-primary">Challenge Not Found</h1>
        <p className="mt-2 text-sm text-text-secondary">
          The challenge <code className="text-accent font-mono bg-surface-sunken px-1 rounded">"{id}"</code> doesn't exist.
        </p>
        <Link
          to="/challenges"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Challenges</span>
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-6">
      {/* Toast */}
      {justStarted && (
        <div className="fixed top-18 right-6 z-50 rounded-md bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>Challenge started! Status: "In Progress".</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-tertiary">
        <Link to="/challenges" className="hover:text-accent flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Challenges</span>
        </Link>
        <span>/</span>
        <span className="text-text-secondary">{challenge.category}</span>
        <span>/</span>
        <span className="text-text-primary font-medium truncate max-w-xs">{challenge.title}</span>
      </div>

      {/* Header banner */}
      <div className="rounded-lg border border-border-primary bg-white p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={challenge.category} />
              <DifficultyBadge difficulty={challenge.difficulty} />
              <StatusBadge status={challenge.status} type="lifecycle" />
              <span className="rounded bg-surface-sunken px-2 py-0.5 text-xs text-text-tertiary">
                {challenge.estimatedTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              {challenge.title}
            </h1>

            <p className="text-sm text-text-secondary leading-relaxed">
              {challenge.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {challenge.tags?.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded bg-surface-sunken px-2 py-0.5 text-xs font-mono text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Points panel */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 rounded-md bg-surface-sunken p-4">
            <div className="text-left lg:text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block">
                Value
              </span>
              <div className="flex items-center gap-1 text-xl font-extrabold text-warning">
                <Award className="w-5 h-5" />
                <span>{challenge.points} pts</span>
              </div>
            </div>
            <div className="text-right border-l lg:border-l-0 lg:border-t border-border-primary pl-4 lg:pl-0 lg:pt-3">
              <span className="text-[10px] text-text-tertiary block">Deadline</span>
              <span className="text-xs font-semibold text-text-primary">{challenge.deadlineFormatted}</span>
            </div>
          </div>
        </div>

        {/* Action strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border-primary pt-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-text-tertiary">Status:</span>
            <StatusBadge status={participantStatus} type="participant" size="md" />
          </div>

          <div className="flex items-center gap-3">
            {participantStatus === "Not Started" && (
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2 text-xs font-bold text-white hover:bg-accent-dark transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Challenge</span>
              </button>
            )}

            {participantStatus === "In Progress" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Solution</span>
              </button>
            )}

            {participantStatus === "Submitted" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-surface-sunken px-4 py-2 text-xs font-semibold text-text-primary hover:bg-border-primary transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Update Submission</span>
              </button>
            )}

            {participantStatus === "Completed" && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-4 h-4" />
                <span>Completed (+{challenge.points} pts)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Submission record */}
      {submissionData && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-blue-800">Your Submission</h3>
            <span className="text-[10px] text-text-tertiary ml-auto">
              {new Date(submissionData.submittedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-md bg-white p-3 border border-blue-100">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1">Repository</span>
              <a href={submissionData.repoUrl} target="_blank" rel="noopener noreferrer"
                className="text-accent font-mono hover:underline flex items-center gap-1 break-all">
                <span>{submissionData.repoUrl}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
            {submissionData.demoUrl && (
              <div className="rounded-md bg-white p-3 border border-blue-100">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1">Live Preview</span>
                <a href={submissionData.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="text-sky-600 font-mono hover:underline flex items-center gap-1 break-all">
                  <span>{submissionData.demoUrl}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            )}
          </div>

          {submissionData.notes && (
            <div className="mt-3 rounded-md bg-white p-3 border border-blue-100 text-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block mb-1">Notes</span>
              <p className="text-text-secondary italic">{submissionData.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Content: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem */}
          <div className="rounded-lg border border-border-primary bg-white p-6 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <h2 className="text-base font-bold text-text-primary">Problem Statement</h2>
            </div>
            <div className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
              {challenge.problemDescription}
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-lg border border-border-primary bg-white p-6 space-y-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-text-primary">Requirements</h2>
            </div>
            <ul className="space-y-2.5">
              {challenge.requirements?.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-emerald-50 text-emerald-700 border border-emerald-200 mt-0.5">
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  </div>
                  <span className="leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rules */}
          <div className="rounded-lg border border-border-primary bg-white p-6 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <h2 className="text-base font-bold text-text-primary">Rules & Guidelines</h2>
            </div>
            <ul className="space-y-2">
              {challenge.rules?.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Judging */}
          {challenge.judgingCriteria && (
            <div className="rounded-lg border border-border-primary bg-white p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-warning" />
                <h2 className="text-base font-bold text-text-primary">Evaluation Criteria</h2>
              </div>
              <div className="overflow-hidden rounded-md border border-border-primary">
                <table className="w-full text-left text-xs text-text-secondary">
                  <thead className="bg-surface-sunken text-text-tertiary font-semibold border-b border-border-primary">
                    <tr>
                      <th className="px-4 py-2.5">Pillar</th>
                      <th className="px-4 py-2.5 text-right w-20">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-primary">
                    {challenge.judgingCriteria.map((c, i) => (
                      <tr key={i} className="hover:bg-surface-sunken">
                        <td className="px-4 py-2.5 font-medium text-text-primary">{c.aspect}</td>
                        <td className="px-4 py-2.5 text-right font-bold text-warning">{c.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          <div className="rounded-lg border border-border-primary bg-white p-5 space-y-4 sticky top-20">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
              Ready to take this on?
            </h3>

            {participantStatus === "Not Started" && (
              <button
                onClick={handleStart}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-bold text-white hover:bg-accent-dark transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Challenge</span>
              </button>
            )}

            {participantStatus === "In Progress" && (
              <div className="space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Solution</span>
                </button>
                <p className="text-[11px] text-center text-text-tertiary">
                  Submit your GitHub repository when ready.
                </p>
              </div>
            )}

            {participantStatus === "Submitted" && (
              <div className="space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-surface-sunken px-4 py-2 text-xs font-semibold text-text-primary hover:bg-border-primary transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Update Submission</span>
                </button>
                <p className="text-[11px] text-center text-emerald-600 font-medium">
                  ✓ Solution received! Points awarded.
                </p>
              </div>
            )}

            <hr className="border-border-primary" />

            {/* Meta info */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-text-secondary">
                <span>Issued By:</span>
                <span className="font-semibold text-text-primary">{challenge.author}</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>Participants:</span>
                <span className="font-semibold text-text-primary">{challenge.participantsCount}</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>Est. Time:</span>
                <span className="font-semibold text-text-primary">{challenge.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between text-text-secondary">
                <span>Difficulty:</span>
                <span className="font-semibold text-text-primary">{challenge.difficulty}</span>
              </div>
            </div>

            {/* Starter repo */}
            {challenge.starterRepo && (
              <div className="pt-2">
                <a
                  href={challenge.starterRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-surface-sunken px-3 py-2 text-xs font-medium text-text-secondary hover:bg-border-primary hover:text-text-primary transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Starter Template</span>
                  <ExternalLink className="w-3 h-3 text-text-tertiary" />
                </a>
              </div>
            )}

            {/* Deliverables */}
            <div className="pt-3 border-t border-border-primary text-xs text-text-secondary">
              <span className="font-semibold text-text-primary block mb-2">Deliverables:</span>
              <ul className="space-y-1 text-[11px]">
                {challenge.deliverables?.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SubmissionModal
        challenge={challenge}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refreshStatus}
      />
    </div>
  );
}
