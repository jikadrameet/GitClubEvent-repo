import React from "react";
import { motion } from "framer-motion";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function EmptyState({
  title = "No challenges found",
  description = "We couldn't find any challenges matching your current search query or filter criteria.",
  onReset,
  resetLabel = "Clear all filters"
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border-secondary bg-surface-sunken p-12 text-center"
    >
      <motion.div 
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-accent mb-4"
      >
        <FolderSearch className="h-7 w-7" />
      </motion.div>
      <h3 className="text-base font-bold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
      {onReset && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{resetLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
}
