import React from "react";
import { Link } from "react-router-dom";
import { GitBranch, Heart, ExternalLink, Terminal, MapPin, Code2 } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Club Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base">Git Club CHARUSAT</span>
                <span className="ml-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Challenge Arena
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Problem Statement 4: <strong>Learn by Building</strong>. An interactive student-led engineering
              arena fostering open source culture, peer feedback, and competitive development across CHARUSAT institutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-indigo-400" />
              <span>Charotar University of Science and Technology, Changa, Gujarat</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Arena Dashboard
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-indigo-400 transition-colors">
                  Explore Challenges
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-indigo-400 transition-colors">
                  Participant Leaderboard
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Git Club Repos</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Pillars */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Core Pillars
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Web & Cloud Systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Applied AI / Machine Learning</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Open Source Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                <span>Accessible UI/UX Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Built with deliberate craft for</span>
            <span className="font-semibold text-slate-300">Git Club CHARUSAT</span>
            <span>• Build. Compete. Improve.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-mono text-[11px]">v1.0.0-MVP (Frontend-First)</span>
            <span className="rounded bg-slate-900 px-2 py-1 text-[11px] border border-slate-800 text-slate-400">
              No server required
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
