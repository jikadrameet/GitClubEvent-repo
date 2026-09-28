import React from "react";
import { Globe, Cpu, GitBranch, Palette, Cloud, Layers } from "lucide-react";

export default function CategoryBadge({ category, size = "sm" }) {
  const sizeClasses = size === "xs" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-0.5";

  const getCategoryConfig = () => {
    switch (category) {
      case "Web Development":
        return {
          icon: Globe,
          classes: "bg-sky-50 text-sky-700 border-sky-200"
        };
      case "AI / ML":
        return {
          icon: Cpu,
          classes: "bg-violet-50 text-violet-700 border-violet-200"
        };
      case "Open Source":
        return {
          icon: GitBranch,
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200"
        };
      case "Design":
        return {
          icon: Palette,
          classes: "bg-pink-50 text-pink-700 border-pink-200"
        };
      case "DevOps & Cloud":
        return {
          icon: Cloud,
          classes: "bg-amber-50 text-amber-700 border-amber-200"
        };
      default:
        return {
          icon: Layers,
          classes: "bg-stone-100 text-stone-600 border-stone-200"
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
