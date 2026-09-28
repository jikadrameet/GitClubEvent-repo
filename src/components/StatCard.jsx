import React from "react";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "indigo", badge }) {
  const colorMap = {
    indigo: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      border: "border-indigo-500/20"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20"
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20"
    },
    sky: {
      bg: "bg-sky-500/10",
      text: "text-sky-400",
      border: "border-sky-500/20"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20"
    }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur transition-all duration-200 hover:border-slate-700 hover:shadow-indigo-500/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
            {badge && (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${scheme.bg} ${scheme.text} border ${scheme.border}`}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`rounded-lg p-2.5 ${scheme.bg} ${scheme.text} border ${scheme.border}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
