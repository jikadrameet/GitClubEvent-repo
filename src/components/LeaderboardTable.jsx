import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Flame, CheckCircle } from "lucide-react";

export default function LeaderboardTable({ participants }) {
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 font-bold text-xs">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-bold text-xs">
            🥉
          </div>
        );
      default:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-sunken text-text-tertiary font-mono text-xs font-semibold">
            {rank}
          </div>
        );
    }
  };

  const tableVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border-primary bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-text-primary">
          <thead className="border-b border-border-primary bg-surface-sunken text-[11px] uppercase tracking-wider text-text-tertiary font-semibold">
            <tr>
              <th scope="col" className="px-4 py-3 w-14 text-center">Rank</th>
              <th scope="col" className="px-4 py-3">Participant</th>
              <th scope="col" className="px-4 py-3 hidden sm:table-cell">Department</th>
              <th scope="col" className="px-4 py-3 text-center">Done</th>
              <th scope="col" className="px-4 py-3 hidden md:table-cell">Streak</th>
              <th scope="col" className="px-4 py-3 text-right">Score</th>
            </tr>
          </thead>
          <motion.tbody 
            className="divide-y divide-border-primary"
            variants={tableVariants}
            initial="initial"
            animate="animate"
          >
            {participants.map((user) => {
              const isYou = user.isCurrentParticipant;

              return (
                <motion.tr
                  variants={rowVariants}
                  key={user.id}
                  className={`transition-colors duration-100 ${
                    isYou
                      ? "bg-teal-50/60 border-l-2 border-l-accent"
                      : "hover:bg-surface-sunken"
                  }`}
                >
                  {/* Rank */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    <div className="flex justify-center">{getRankBadge(user.rank)}</div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${
                          isYou
                            ? "bg-accent text-white"
                            : "bg-surface-sunken text-text-secondary"
                        }`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`font-semibold text-sm ${isYou ? "text-accent" : "text-text-primary"}`}>
                            {user.name}
                          </span>
                          {isYou && (
                            <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">
                              You
                            </span>
                          )}
                          {user.badge && !isYou && (
                            <span className="hidden lg:inline-flex rounded bg-surface-sunken px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary">
                              {user.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-text-tertiary font-mono">@{user.handle}</span>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-4 py-3.5 whitespace-nowrap hidden sm:table-cell text-xs text-text-secondary">
                    {user.department}
                  </td>

                  {/* Completed */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    <span className="inline-flex items-center gap-1 rounded bg-surface-sunken px-2 py-0.5 text-xs font-semibold text-text-primary">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      {user.challengesCompleted}
                    </span>
                  </td>

                  {/* Streak */}
                  <td className="px-4 py-3.5 whitespace-nowrap hidden md:table-cell text-xs">
                    <div className="flex items-center gap-1 text-warning font-medium">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{user.streak}</span>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1 font-bold">
                      <Award className="w-3.5 h-3.5 text-warning" />
                      <span className="text-sm text-text-primary font-mono">{user.points}</span>
                      <span className="text-[11px] text-text-tertiary font-normal">pts</span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
