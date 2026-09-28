import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "teal", badge }) {
  const colorMap = {
    teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    sky: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
    purple: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
    indigo: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  };

  const scheme = colorMap[color] || colorMap.teal;

  return (
    <motion.div 
      whileHover={{ y: -3, boxShadow: "0 6px 12px rgba(0,0,0,0.05)" }}
      className="bg-white border border-border-primary rounded-lg p-4 transition-colors duration-150"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">{title}</p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight text-text-primary">{value}</span>
            {badge && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${scheme.bg} ${scheme.text}`}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-0.5 text-[11px] text-text-tertiary">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`rounded-md p-2 ${scheme.bg} ${scheme.text}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
