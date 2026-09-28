import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Globe, FileText, AlertCircle, ArrowRight, Sparkles, Award } from "lucide-react";
import GithubIcon from "./GithubIcon";
import { submitChallengeSolution } from "../utils/storage";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function SubmissionModal({ challenge, isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState("form"); // 'form' | 'confirm' | 'success'
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const urlPattern = /^(https?:\/\/)?[\da-z.-]+\.[a-z.]{2,6}([/\w .-]*)*\/?$/i;

    if (!repoUrl.trim()) {
      errs.repoUrl = "Repository URL is required.";
    } else if (!repoUrl.includes("github.com") && !repoUrl.includes("gitlab.com")) {
      errs.repoUrl = "Please provide a valid GitHub or GitLab repository URL.";
    }

    if (demoUrl.trim() && !urlPattern.test(demoUrl.trim())) {
      errs.demoUrl = "Please provide a valid URL for the live demo.";
    }

    if (!notes.trim() || notes.trim().length < 15) {
      errs.notes = "Please provide a brief submission note (at least 15 characters).";
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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px]"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg rounded-lg border border-border-primary bg-white shadow-xl p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 rounded-md p-1.5 text-text-tertiary hover:bg-surface-sunken hover:text-text-primary transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {/* STEP 1: Form */}
              {step === "form" && (
                <motion.div key="form" variants={stepVariants} initial="initial" animate="animate" exit="exit">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-accent border border-teal-200">
                      Step 1 of 2
                    </span>
                    <span className="text-xs text-text-tertiary">Simulated Submission</span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary">
                    Submit: {challenge.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-secondary">
                    Provide your public repository and deployment links for Git Club peer review.
                  </p>

                  <form onSubmit={handleProceedToConfirm} className="mt-5 space-y-4">
                    {/* Repository URL */}
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5 flex items-center gap-1.5">
                        <GithubIcon className="w-3.5 h-3.5 text-text-tertiary" />
                        Repository URL <span className="text-error">*</span>
                      </label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/your-username/project"
                        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-all ${
                          errors.repoUrl ? "border-error ring-1 ring-error/20" : "border-border-primary focus:border-accent focus:ring-1 focus:ring-accent/20"
                        }`}
                      />
                      <AnimatePresence>
                        {errors.repoUrl && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 flex items-center gap-1 text-[11px] text-error">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.repoUrl}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Demo URL */}
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-text-tertiary" />
                        Demo URL <span className="text-text-tertiary text-[10px] font-normal">(optional)</span>
                      </label>
                      <input
                        type="url"
                        value={demoUrl}
                        onChange={(e) => setDemoUrl(e.target.value)}
                        placeholder="https://my-project.vercel.app"
                        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-text-primary placeholder-text-tertiary outline-none transition-all ${
                          errors.demoUrl ? "border-error ring-1 ring-error/20" : "border-border-primary focus:border-accent focus:ring-1 focus:ring-accent/20"
                        }`}
                      />
                      <AnimatePresence>
                        {errors.demoUrl && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 flex items-center gap-1 text-[11px] text-error">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.demoUrl}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-text-primary mb-1.5 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-text-tertiary" />
                        Submission Notes <span className="text-error">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Briefly describe key architectural decisions, libraries used, or notable features..."
                        className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none transition-all ${
                          errors.notes ? "border-error ring-1 ring-error/20" : "border-border-primary focus:border-accent focus:ring-1 focus:ring-accent/20"
                        }`}
                      ></textarea>
                      <AnimatePresence>
                        {errors.notes && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 flex items-center gap-1 text-[11px] text-error">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.notes}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-primary">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-md px-4 py-2 text-xs font-medium text-text-secondary hover:bg-surface-sunken hover:text-text-primary transition-colors"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors"
                      >
                        <span>Review Submission</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Confirm */}
              {step === "confirm" && (
                <motion.div key="confirm" variants={stepVariants} initial="initial" animate="animate" exit="exit">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200">
                      Step 2 of 2
                    </span>
                    <span className="text-xs text-text-tertiary">Confirm Your Submission</span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary">Ready to submit?</h3>
                  <p className="mt-1 text-xs text-text-secondary">
                    Please verify your links before locking in your challenge entry.
                  </p>

                  <div className="mt-4 space-y-3 rounded-md bg-surface-sunken p-4 text-xs">
                    <div>
                      <span className="text-text-tertiary block text-[10px] uppercase font-semibold">Repository</span>
                      <span className="text-accent font-mono break-all">{repoUrl}</span>
                    </div>
                    {demoUrl && (
                      <div>
                        <span className="text-text-tertiary block text-[10px] uppercase font-semibold">Live Preview</span>
                        <span className="text-sky-600 font-mono break-all">{demoUrl}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-text-tertiary block text-[10px] uppercase font-semibold">Submission Notes</span>
                      <p className="text-text-secondary mt-0.5 italic">{notes}</p>
                    </div>
                    <div className="pt-2 border-t border-border-primary flex items-center justify-between text-text-secondary text-[11px]">
                      <span>Earnable Points:</span>
                      <span className="font-bold text-warning">+{challenge.points} pts</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="rounded-md px-4 py-2 text-xs font-medium text-text-secondary hover:bg-surface-sunken hover:text-text-primary transition-colors"
                    >
                      ← Back to Edit
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleFinalSubmit}
                      className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Confirm & Submit</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Success */}
              {step === "success" && (
                <motion.div key="success" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="text-center py-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <Sparkles className="h-7 w-7" />
                  </div>

                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 mb-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Submission Received!
                  </span>

                  <h3 className="text-lg font-bold text-text-primary">
                    Challenge Submitted Successfully
                  </h3>

                  <p className="mt-2 text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                    Your solution for <strong>{challenge.title}</strong> has been logged.
                    Your participant score has been updated!
                  </p>

                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}
                    className="my-5 inline-flex items-center gap-2 rounded-md bg-surface-sunken px-4 py-2"
                  >
                    <Award className="w-4 h-4 text-warning" />
                    <span className="text-xs text-text-secondary font-medium">Earned</span>
                    <span className="text-sm font-bold text-warning">+{challenge.points} Points</span>
                  </motion.div>

                  <div className="flex justify-center mt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleClose}
                      className="rounded-md bg-surface-sunken px-5 py-2 text-xs font-semibold text-text-primary hover:bg-border-primary transition-colors"
                    >
                      Done
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
