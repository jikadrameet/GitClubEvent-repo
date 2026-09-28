import React, { useState } from "react";
import { X, CheckCircle, Globe, FileText, AlertCircle, ArrowRight, Sparkles, Award } from "lucide-react";
import GithubIcon from "./GithubIcon";
import { submitChallengeSolution } from "../utils/storage";

export default function SubmissionModal({ challenge, isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState("form"); // 'form' | 'confirm' | 'success'
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

    if (!repoUrl.trim()) {
      errs.repoUrl = "Repository URL is required.";
    } else if (!repoUrl.includes("github.com") && !repoUrl.includes("gitlab.com")) {
      errs.repoUrl = "Please provide a valid GitHub or GitLab repository URL.";
    }

    if (demoUrl.trim() && !urlPattern.test(demoUrl.trim())) {
      errs.demoUrl = "Please provide a valid URL for the live demo (e.g., https://your-demo.vercel.app).";
    }

    if (!notes.trim() || notes.trim().length < 15) {
      errs.notes = "Please provide a brief submission note (at least 15 characters) describing your solution.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToConfirm = (e) => {
    e.preventDefault();
    if (validate()) {
      setStep("confirm");
    }
  };

  const handleFinalSubmit = () => {
    submitChallengeSolution(challenge.id, {
      repoUrl,
      demoUrl,
      notes
    });
    setStep("success");
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setStep("form");
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Form Input */}
        {step === "form" && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400 border border-indigo-500/30">
                Step 1 of 2
              </span>
              <span className="text-xs text-slate-400">Simulated Project Submission</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Submit Solution: {challenge.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Provide your public repository and deployment links for Git Club peer review.
            </p>

            <form onSubmit={handleProceedToConfirm} className="mt-5 space-y-4">
              {/* Repository URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  GitHub Repository URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/your-username/campus-event-portal"
                  className={`w-full rounded-xl border bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all ${
                    errors.repoUrl ? "border-rose-500 ring-1 ring-rose-500" : "border-slate-800 focus:border-indigo-500"
                  }`}
                />
                {errors.repoUrl && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.repoUrl}</span>
                  </p>
                )}
              </div>

              {/* Live Demo URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Live Preview / Demo URL <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://my-campus-event-portal.vercel.app"
                  className={`w-full rounded-xl border bg-slate-950 px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all ${
                    errors.demoUrl ? "border-rose-500 ring-1 ring-rose-500" : "border-slate-800 focus:border-indigo-500"
                  }`}
                />
                {errors.demoUrl && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.demoUrl}</span>
                  </p>
                )}
              </div>

              {/* Submission Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Submission Notes / Architecture Summary <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly describe key architectural decisions, libraries used, or notable features implemented..."
                  className={`w-full rounded-xl border bg-slate-950 px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all ${
                    errors.notes ? "border-rose-500 ring-1 ring-rose-500" : "border-slate-800 focus:border-indigo-500"
                  }`}
                ></textarea>
                {errors.notes && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.notes}</span>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
                >
                  <span>Review Submission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Confirmation Preview */}
        {step === "confirm" && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-500/30">
                Step 2 of 2
              </span>
              <span className="text-xs text-slate-400">Confirm Your Submission</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Ready to submit?
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Please verify your links before locking in your challenge entry.
            </p>

            <div className="mt-4 space-y-3 rounded-xl bg-slate-950 p-4 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Repository</span>
                <span className="text-indigo-400 font-mono break-all">{repoUrl}</span>
              </div>
              {demoUrl && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Live Preview</span>
                  <span className="text-sky-400 font-mono break-all">{demoUrl}</span>
                </div>
              )}
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Submission Notes</span>
                <p className="text-slate-300 mt-0.5 italic">{notes}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px]">
                <span>Earnable Points:</span>
                <span className="font-bold text-amber-400">+{challenge.points} pts</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                ← Back to Edit
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-500 transition-all active:scale-95"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Confirm & Submit Entry</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success State */}
        {step === "success" && (
          <div className="text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner mb-4 animate-bounce">
              <Sparkles className="h-8 w-8 text-emerald-400" />
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30 mb-2">
              <CheckCircle className="w-3.5 h-3.5" />
              Submission Received!
            </span>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Challenge Submitted Successfully
            </h3>

            <p className="mt-2 text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your solution for <strong>{challenge.title}</strong> has been logged to the local arena ledger.
              Your participant score has been updated!
            </p>

            <div className="my-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 border border-slate-800">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-300 font-medium">Earned</span>
              <span className="text-sm font-bold text-amber-400">+{challenge.points} Points</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
