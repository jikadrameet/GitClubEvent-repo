import React from "react";
import { Trophy, Award, Medal, Flame, CheckCircle, ExternalLink, Sparkles } from "lucide-react";

export default function LeaderboardTable({ participants }) {
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold text-xs shadow-sm">
            🥇 1
          </div>
        );
      case 2:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold text-xs shadow-sm">
            🥈 2
          </div>
        );
      case 3:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40 font-bold text-xs shadow-sm">
            🥉 3
          </div>
        );
      default:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-400 font-mono text-xs font-semibold">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/70 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            <tr>
              <th scope="col" className="px-5 py-3.5 w-16 text-center">
                Rank
              </th>
              <th scope="col" className="px-5 py-3.5">
                Participant
              </th>
              <th scope="col" className="px-5 py-3.5 hidden sm:table-cell">
                Campus / Institute
              </th>
              <th scope="col" className="px-5 py-3.5 text-center">
                Completed
              </th>
              <th scope="col" className="px-5 py-3.5 hidden md:table-cell">
                Streak
              </th>
              <th scope="col" className="px-5 py-3.5 text-right font-bold text-slate-200">
                Total Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {participants.map((user) => {
              const isYou = user.isCurrentParticipant;

              return (
                <tr
                  key={user.id}
                  className={`transition-colors duration-150 ${
                    isYou
                      ? "bg-indigo-950/40 border-l-4 border-l-indigo-500 hover:bg-indigo-950/60"
                      : "hover:bg-slate-850/50"
                  }`}
                >
                  {/* Rank */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">{getRankBadge(user.rank)}</div>
                  </td>

                  {/* Participant Name & Badge */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                          isYou
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-slate-800 text-slate-200 border border-slate-700"
                        }`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-sm ${
                              isYou ? "text-indigo-300 font-bold" : "text-white"
                            }`}
                          >
                            {user.name}
                          </span>
                          {isYou && (
                            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/40 uppercase tracking-wider">
                              You
                            </span>
                          )}
                          {user.badge && !isYou && (
                            <span className="hidden lg:inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-700">
                              {user.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 font-mono">@{user.handle}</span>
                      </div>
                    </div>
                  </td>

                  {/* Campus / Department */}
                  <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell text-xs text-slate-400">
                    <span>{user.department}</span>
                  </td>

                  {/* Completed */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 border border-slate-700/60">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>{user.challengesCompleted}</span>
                    </span>
                  </td>

                  {/* Streak */}
                  <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-amber-400 font-medium">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{user.streak}</span>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5 font-bold">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-base text-white font-mono">{user.points}</span>
                      <span className="text-xs text-slate-500 font-normal">pts</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
