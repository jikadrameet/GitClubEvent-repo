import React from "react";
import { Globe, Cpu, GitBranch, Palette, Cloud, Layers } from "lucide-react";

export default function CategoryBadge({ category, size = "sm" }) {
  const sizeClasses = size === "xs" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-0.5";

  const getCategoryConfig = () => {
    switch (category) {
      case "Web Development":
        return {
          icon: Globe,
          classes: "bg-sky-950/50 text-sky-400 border-sky-800/40"
        };
      case "AI / ML":
        return {
          icon: Cpu,
          classes: "bg-purple-950/50 text-purple-400 border-purple-800/40"
        };
      case "Open Source":
        return {
          icon: GitBranch,
          classes: "bg-emerald-950/50 text-emerald-400 border-emerald-800/40"
        };
      case "Design":
        return {
          icon: Palette,
          classes: "bg-pink-950/50 text-pink-400 border-pink-800/40"
        };
      case "DevOps & Cloud":
        return {
          icon: Cloud,
          classes: "bg-amber-950/50 text-amber-400 border-amber-800/40"
        };
      default:
        return {
          icon: Layers,
          classes: "bg-slate-800 text-slate-300 border-slate-700"
        };
    }
  };

  const { icon: Icon, classes } = getCategoryConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${classes} ${sizeClasses}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{category}</span>
    </span>
  );
}
