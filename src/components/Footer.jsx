import React from "react";
import { Link } from "react-router-dom";
import { GitBranch, ExternalLink, MapPin } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border-primary bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Club Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
                <GitBranch className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-text-primary text-sm">Git Club CHARUSAT</span>
                <span className="ml-1.5 text-[10px] text-accent font-semibold">
                  Challenge Arena
                </span>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Problem Statement 4: <strong className="text-text-primary">Learn by Building</strong>. An interactive student-led engineering
              arena fostering open source culture, peer feedback, and competitive development across CHARUSAT institutes.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <MapPin className="h-3 w-3 text-accent" />
              <span>Charotar University of Science and Technology, Changa, Gujarat</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Arena Dashboard
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-accent transition-colors">
                  Explore Challenges
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-accent transition-colors">
                  Participant Leaderboard
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <span>Git Club Repos</span>
                  <ExternalLink className="w-3 h-3 text-text-tertiary" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Pillars */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              Core Pillars
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Web & Cloud Systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                <span>Applied AI / Machine Learning</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                <span>Open Source Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>Accessible UI/UX Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-primary pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-tertiary">
          <div className="flex items-center gap-1.5">
            <span>Built with deliberate craft for</span>
            <span className="font-semibold text-text-primary">Git Club CHARUSAT</span>
            <span>• Build. Compete. Improve.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px]">v1.0.0-MVP</span>
            <span className="rounded bg-surface-sunken px-2 py-0.5 text-[11px] text-text-tertiary">
              Frontend-first
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
