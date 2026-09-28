/**
 * Git Club CHARUSAT — Challenge Arena
 * Curated realistic mock challenges for the campus tech community.
 */

export const CHALLENGES_DATA = [
  {
    id: "campus-event-portal",
    title: "Campus Event Portal",
    category: "Web Development",
    difficulty: "Medium",
    status: "Active",
    deadline: "2026-10-15T23:59:59",
    deadlineFormatted: "Oct 15, 2026",
    points: 250,
    estimatedTime: "5 - 7 Hours",
    participantsCount: 42,
    shortDescription: "Build a centralized responsive web app for CHARUSAT student clubs to publish workshops, manage RSVPs, and track attendee check-ins.",
    tags: ["React", "State Management", "Tailwind CSS", "Local Persistence"],
    author: "Git Club CHARUSAT Core",
    starterRepo: "https://github.com/gitclub-charusat/starter-event-portal",
    problemDescription: `Student clubs across CHARUSAT (CSPIT, DEPSTAR, CMPICA, RPCP) organize dozens of hackathons, workshops, and tech talks each semester. Currently, information is scattered across WhatsApp groups, posters, and disparate Google Forms.

Your mission is to engineer a unified, sleek, high-performance Campus Event Portal. The platform must enable club leads to showcase upcoming events with schedules and speaker details, while allowing students to bookmark events, register with one click, and view a personal attendance agenda.`,
    requirements: [
      "Responsive event catalog with category filters (Tech, Cultural, Sports, Academics) and search.",
      "Event details view with countdown timer, speaker profile, venue map link, and agenda schedule.",
      "One-click simulated RSVP toggle with seat availability counter updating in real-time.",
      "My Schedule dashboard tab showing registered events with 'Add to Calendar' ICS download option.",
      "Organizer simulation view to create a new event draft with basic form validation."
    ],
    rules: [
      "Project must be version-controlled with atomic, descriptive Git commits (feat:, fix:, chore:).",
      "Repository must include a comprehensive README.md explaining architecture, setup, and key decisions.",
      "Include a public live deployment link (Vercel, Netlify, or GitHub Pages).",
      "UI must adhere to WCAG AA contrast standards and be mobile-first responsive.",
      "Zero reliance on paid third-party APIs; mock datasets must be bundled locally."
    ],
    judgingCriteria: [
      { aspect: "Code Architecture & Component Reusability", weight: "30%" },
      { aspect: "UI / UX Polish & Mobile Experience", weight: "30%" },
      { aspect: "Feature Completeness & Error Handling", weight: "25%" },
      { aspect: "Git Workflow & Documentation", weight: "15%" }
    ],
    deliverables: [
      "Public GitHub repository URL with full source code",
      "Live deployment preview URL",
      "Short architectural summary & demo credentials/instructions in the submission note"
    ]
  },
  {
    id: "ai-study-assistant",
    title: "AI Study Assistant & Quizzer",
    category: "AI / ML",
    difficulty: "Hard",
    status: "Active",
    deadline: "2026-10-22T23:59:59",
    deadlineFormatted: "Oct 22, 2026",
    points: 350,
    estimatedTime: "8 - 10 Hours",
    participantsCount: 38,
    shortDescription: "Create an interactive browser-based study assistant that converts lecture notes into flashcards, key concepts, and adaptive practice quizzes.",
    tags: ["AI / LLM API", "NLP", "React", "Vector / Heuristics"],
    author: "CHARUSAT AI & Data Science Wing",
    starterRepo: "https://github.com/gitclub-charusat/starter-study-ai",
    problemDescription: `CHARUSAT engineering students tackle demanding curriculums with rigorous mid-terms and lab exams. Retaining dense technical chapters (Data Structures, Operating Systems, Database Management) requires active recall and spaced repetition.

Design and implement an intelligent Study Assistant that accepts raw syllabus text or lecture notes, structures the knowledge into bite-sized concept cards, generates multiple-choice quizzes with explanations, and tracks mastery score over time.`,
    requirements: [
      "Note ingest interface supporting text paste and markdown with instant token count & difficulty meter.",
      "Simulated or live LLM pipeline (Gemini / Claude / OpenAI API or client-side heuristic tokenizer) to extract key concepts.",
      "Interactive flashcard flip deck with 'Knew it' vs 'Review later' swipe interaction.",
      "Adaptive 5-question multiple-choice quiz generator with immediate feedback, score breakdown, and explanation.",
      "Session history stored in localStorage to observe learning streaks and topic proficiency."
    ],
    rules: [
      "All API keys (if using external providers) must be configured via environment variables and never committed.",
      "Provide a robust fallback mock mode so evaluators can run the app without entering their own API key.",
      "Clean separation between AI processing logic and presentation UI.",
      "Graceful error handling for empty notes, rate limits, or network timeouts."
    ],
    judgingCriteria: [
      { aspect: "Prompt Engineering / Heuristic Quality", weight: "35%" },
      { aspect: "Interactive Quiz & Flashcard UX", weight: "30%" },
      { aspect: "Offline / Mock Fallback Resilience", weight: "20%" },
      { aspect: "Code Cleanliness & Documentation", weight: "15%" }
    ],
    deliverables: [
      "GitHub repository URL",
      "Deployed application URL",
      "Brief video walkthrough or animated GIF demonstration in README"
    ]
  },
  {
    id: "charusat-lost-and-found",
    title: "CHARUSAT Lost & Found Network",
    category: "Web Development",
    difficulty: "Medium",
    status: "Active",
    deadline: "2026-10-18T23:59:59",
    deadlineFormatted: "Oct 18, 2026",
    points: 220,
    estimatedTime: "5 - 6 Hours",
    participantsCount: 51,
    shortDescription: "A community board for recovering lost ID cards, calculators, earphones, and notebooks across CHARUSAT campus blocks.",
    tags: ["React", "Image Handling", "Search & Filters", "Status Tracking"],
    author: "Git Club Student Welfare Initiative",
    starterRepo: "https://github.com/gitclub-charusat/starter-lost-found",
    problemDescription: `Every week, students leave water bottles in the Central Library, calculators in CSPIT labs, and ID cards around the canteen. Notice boards get cluttered, and Telegram channels lack structured filtering.

Build a dedicated, clean Lost & Found board tailored for the CHARUSAT campus. Users should easily filter by campus location (CSPIT, DEPSTAR, Central Library, Campus Canteen, Sports Complex), report a lost item or found item with photographic evidence, and initiate a secure claim procedure.`,
    requirements: [
      "Dual tab view: 'Items Found' vs 'Items Lost' with status pills (Open, Claimed, Returned).",
      "Location filter targeting major CHARUSAT landmarks and building blocks.",
      "Report item modal with image URL preview, date found/lost, category tag, and contact anonymity toggle.",
      "Verification claim mechanism where the owner answers a secret detail prompt (e.g. wallpaper color, scratch mark).",
      "Live search by item keywords with instant client-side filtering."
    ],
    rules: [
      "Personal phone numbers must be masked by default for student privacy.",
      "Submissions must implement form validation for dates, locations, and title length.",
      "Use localStorage to persist student reports across browser refreshes.",
      "Responsive layout optimized for handheld mobile use across campus."
    ],
    judgingCriteria: [
      { aspect: "Real-world Utility & Campus Specificity", weight: "30%" },
      { aspect: "UI Polish & Mobile Responsiveness", weight: "30%" },
      { aspect: "Data Validation & Edge Case Handling", weight: "25%" },
      { aspect: "Documentation & Code Organization", weight: "15%" }
    ],
    deliverables: [
      "GitHub repo link",
      "Hosted demo link",
      "Submission note describing safety/privacy choices"
    ]
  },
  {
    id: "github-portfolio-sprint",
    title: "GitHub Developer Portfolio Sprint",
    category: "Open Source",
    difficulty: "Easy",
    status: "Upcoming",
    deadline: "2026-11-01T23:59:59",
    deadlineFormatted: "Nov 01, 2026",
    points: 150,
    estimatedTime: "3 - 4 Hours",
    participantsCount: 89,
    shortDescription: "Craft an open-source dynamic portfolio that fetches real-time public GitHub activity, pinned repositories, and language statistics.",
    tags: ["GitHub API", "Open Source", "Developer Portfolio", "CSS Animations"],
    author: "Git Club CHARUSAT Open Source Cell",
    starterRepo: "https://github.com/gitclub-charusat/starter-portfolio-sprint",
    problemDescription: `A developer's GitHub profile is their modern resume. Yet many student portfolios feature static, outdated project screenshots that do not reflect their daily open-source momentum.

This challenge tasks you with creating a lightning-fast, high-impact developer portfolio template powered by GitHub's public REST API. Anyone should be able to fork your repo, change a single username configuration variable, and immediately have a personalized site highlighting their active streaks, top repos, and contributions.`,
    requirements: [
      "Configuration-driven profile setup (one config.js or JSON file drives name, bio, socials).",
      "Live GitHub API integration pulling avatar, public repositories, commit stats, and star counts.",
      "Repository showcase with language color badges, stargazers, and direct link to live demos.",
      "Sleek dark/light theme switcher with persistent user preference.",
      "Zero-dependency or lightweight animated skill progress indicators."
    ],
    rules: [
      "Must include GitHub rate-limit handling (60 requests/hr for unauthenticated users) with cached mock fallback.",
      "Repository must include an open-source MIT license and clear CONTRIBUTING.md.",
      "Lighthouse performance and accessibility score must exceed 90.",
      "No broken image links or unhandled async rejections."
    ],
    judgingCriteria: [
      { aspect: "Visual Design & Developer Aesthetics", weight: "35%" },
      { aspect: "GitHub API Integration & Rate-limit Handling", weight: "30%" },
      { aspect: "Configurability & Ease of Forking", weight: "20%" },
      { aspect: "Performance & Accessibility Score", weight: "15%" }
    ],
    deliverables: [
      "Open-source GitHub repo with MIT license",
      "Live portfolio demo link",
      "Lighthouse audit screenshot in README"
    ]
  },
  {
    id: "campus-ui-system",
    title: "Campus UI Design System & Component Library",
    category: "Design",
    difficulty: "Medium",
    status: "Upcoming",
    deadline: "2026-11-10T23:59:59",
    deadlineFormatted: "Nov 10, 2026",
    points: 260,
    estimatedTime: "6 - 8 Hours",
    participantsCount: 31,
    shortDescription: "Design and code an accessible, high-contrast UI component kit (buttons, dialogs, badges, tables) tailored for university portals.",
    tags: ["Design System", "Accessibility", "Tailwind CSS", "Storybook / Playground"],
    author: "CHARUSAT Design Chapter",
    starterRepo: "https://github.com/gitclub-charusat/starter-campus-ui",
    problemDescription: `University portals are notorious for inconsistent buttons, illegible tables, and disjointed color schemes across student, faculty, and examination modules.

Create a cohesive, accessible micro-design system named 'CampusUI'. It should provide foundational tokens (typography scale, elevation shadows, primary/accent university colors) and at least 7 battle-tested interactive components displayed in an interactive component playground.`,
    requirements: [
      "Interactive component showcase page with interactive state controls (hover, focus, disabled, loading).",
      "At least 7 core components: Button, Badge, Modal Dialog, Input/Select, Tabs, StatCard, and Data Table.",
      "Accessible keyboard navigation (Tab, Escape to close modals, Arrow keys for tabs).",
      "Copyable code snippets for developers to paste components into their projects.",
      "Tailwind configuration and CSS variables exportable as a theme package."
    ],
    rules: [
      "Must pass strict contrast checks against Dark Slate and Crisp Light backgrounds.",
      "All form components must support assistive technology aria attributes.",
      "No heavy external UI framework dependencies (build cleanly from primitives).",
      "Documentation must specify component prop interfaces clearly."
    ],
    judgingCriteria: [
      { aspect: "Design Consistency, Aesthetics & Typography", weight: "35%" },
      { aspect: "Accessibility & Keyboard Operability", weight: "30%" },
      { aspect: "Component API Design & Code Hygiene", weight: "20%" },
      { aspect: "Interactive Showcase Usability", weight: "15%" }
    ],
    deliverables: [
      "GitHub repo containing the component library",
      "Interactive component showcase live URL",
      "Design token overview document"
    ]
  },
  {
    id: "campus-weather-dashboard",
    title: "Changa Microclimate Weather Station",
    category: "Web Development",
    difficulty: "Easy",
    status: "Completed",
    deadline: "2026-09-15T23:59:59",
    deadlineFormatted: "Sep 15, 2026",
    points: 180,
    estimatedTime: "3 - 4 Hours",
    participantsCount: 76,
    shortDescription: "A specialized weather dashboard monitoring temperature, humidity, and monsoon forecast for the Changa CHARUSAT campus zone.",
    tags: ["OpenWeather API", "Charts", "React", "Weather UI"],
    author: "Git Club CHARUSAT IoT Circle",
    starterRepo: "https://github.com/gitclub-charusat/starter-weather-dashboard",
    problemDescription: `The Changa rural zone in Anand district experiences unique microclimate shifts—sudden monsoon downpours during lab hours, intense midday summer heat, and winter morning fog affecting student commutes from Ahmedabad and Vadodara.

Develop a crisp, responsive weather dashboard showing real-time atmospheric metrics, 5-day precipitation forecasts, commuter advisory badges, and historical temperature trend charts.`,
    requirements: [
      "Real-time weather display for Changa / Anand coordinates with temperature, UV index, humidity, and wind.",
      "Commuter advisory banner (e.g. 'Heavy Rain Expected at 5 PM — Bus Commuters Advised to Plan Ahead').",
      "Hourly precipitation curve and 5-day extended forecast cards.",
      "Metric/Imperial unit toggle with instant recalculation.",
      "Offline caching using localStorage for recent weather telemetry."
    ],
    rules: [
      "Official challenge timeline has concluded; solutions can be submitted for peer-review badges.",
      "Clean UI with meteorological icons indicating atmospheric state.",
      "Fallback mock weather dataset included if API service is unreachable."
    ],
    judgingCriteria: [
      { aspect: "Data Visualization & Chart Clarity", weight: "35%" },
      { aspect: "Commuter Advisory Logic & Context", weight: "30%" },
      { aspect: "Responsive Design & Micro-animations", weight: "20%" },
      { aspect: "Error & Offline Fallbacks", weight: "15%" }
    ],
    deliverables: [
      "GitHub repository URL",
      "Live deployment preview URL",
      "Submission notes on data caching"
    ]
  },
  {
    id: "ai-resume-analyzer",
    title: "Placement Cell AI Resume Matcher",
    category: "AI / ML",
    difficulty: "Hard",
    status: "Completed",
    deadline: "2026-09-20T23:59:59",
    deadlineFormatted: "Sep 20, 2026",
    points: 380,
    estimatedTime: "9 - 12 Hours",
    participantsCount: 64,
    shortDescription: "Analyze student CVs against top placement company job descriptions (TCS, Infosys, Crest Data, Bacancy) to identify missing skills.",
    tags: ["ATS Scoring", "NLP Keyword Extraction", "Placement Prep", "AI Analysis"],
    author: "CHARUSAT Training & Placement Cell & Git Club",
    starterRepo: "https://github.com/gitclub-charusat/starter-resume-matcher",
    problemDescription: `During campus placement drives, hundreds of students submit resumes to companies with varying tech requirements. Many are filtered out early by automated Applicant Tracking Systems (ATS) due to missing keywords or poor formatting.

Build an intelligent resume evaluator. Students paste their resume markdown/text and select a target placement company profile (e.g., Frontend React Engineer, Cloud DevOps Engineer, Junior ML Specialist). The app calculates an ATS compatibility score, pinpoints missing keywords, and suggests actionable bullet improvements.`,
    requirements: [
      "Preloaded target company job profiles curated for CHARUSAT placement drives.",
      "Interactive text/markdown resume input with instant word count and readability grade.",
      "Comprehensive scoring breakdown: Skill Match %, Action Verb Density, Formatting Clarity, and Section Completeness.",
      "Interactive 'Skill Gap Matrix' showing matched skills in green and missing critical requirements in amber.",
      "Actionable recommendations list with simulated AI bullet rewrites."
    ],
    rules: [
      "Challenge timeline concluded; solutions can be reviewed in historical challenge archive.",
      "Client-side text parsing must handle common resume sections without crashing.",
      "Privacy-first: no resume content should be sent to unauthorized third-party trackers."
    ],
    judgingCriteria: [
      { aspect: "Scoring Accuracy & Keyword Extraction Rigor", weight: "35%" },
      { aspect: "Feedback Visual Presentation & Actionability", weight: "30%" },
      { aspect: "Performance & Client-side Parser Robustness", weight: "20%" },
      { aspect: "Documentation & Code Organization", weight: "15%" }
    ],
    deliverables: [
      "GitHub repo URL",
      "Live demo URL",
      "Sample test resumes & JD test cases included in repo"
    ]
  },
  {
    id: "devops-cicd-pipeline",
    title: "Automated GitHub Actions CI/CD Pipeline Lab",
    category: "DevOps & Cloud",
    difficulty: "Hard",
    status: "Active",
    deadline: "2026-10-28T23:59:59",
    deadlineFormatted: "Oct 28, 2026",
    points: 300,
    estimatedTime: "6 - 8 Hours",
    participantsCount: 29,
    shortDescription: "Build a production-grade automated GitHub Actions workflow for linting, security vulnerability scanning, automated testing, and preview deployments.",
    tags: ["GitHub Actions", "Docker", "CI/CD", "Security Linting"],
    author: "Git Club CHARUSAT Cloud & DevOps SIG",
    starterRepo: "https://github.com/gitclub-charusat/starter-cicd-pipeline",
    problemDescription: `Modern software engineering teams rely on continuous integration to catch regressions before they reach production. University project teams often merge untested branches directly into main, breaking staging environments right before presentation deadlines.

Construct a modular, reusable GitHub Actions pipeline for a sample fullstack repository. The pipeline must run linting, run unit tests, execute automated security vulnerability audits (npm audit / trivy / gitleaks), and dispatch preview comments to pull requests upon validation.`,
    requirements: [
      "Multi-stage GitHub Actions workflow yaml with clear parallel jobs.",
      "Automated linting and test coverage enforcement with minimum 80% passing threshold.",
      "Security scanning job that checks for hardcoded API keys or high-severity npm vulnerabilities.",
      "Automated pull request bot comment reporting build status, test counts, and lighthouse scores.",
      "Branch protection rules documentation and fail-safe rollout strategy."
    ],
    rules: [
      "Workflow must be publicly inspectable in the repository `.github/workflows` folder.",
      "Must demonstrate at least 3 pull requests showing successful passes and caught intentional failures.",
      "Secrets management best practices must be documented."
    ],
    judgingCriteria: [
      { aspect: "Pipeline Reliability & Execution Speed", weight: "35%" },
      { aspect: "Security Checks & Vulnerability Detection", weight: "30%" },
      { aspect: "PR Bot Feedback & Developer Experience", weight: "20%" },
      { aspect: "Clarity of Documentation & Workflow Architecture", weight: "15%" }
    ],
    deliverables: [
      "GitHub repository URL with live GitHub Actions run history",
      "Demonstration pull requests exhibiting pipeline checks",
      "Architecture diagram of CI/CD stages"
    ]
  },
  {
    id: "campus-canteen-preorder",
    title: "Campus Canteen Smart Pre-order System",
    category: "Web Development",
    difficulty: "Medium",
    status: "Upcoming",
    deadline: "2026-11-15T23:59:59",
    deadlineFormatted: "Nov 15, 2026",
    points: 240,
    estimatedTime: "5 - 7 Hours",
    participantsCount: 45,
    shortDescription: "A mobile-first web app for students to pre-order lunch and snacks during short 15-minute recess breaks to eliminate canteen queue bottlenecks.",
    tags: ["React", "Cart State", "QR Code Generation", "Local Storage"],
    author: "Git Club CHARUSAT Smart Campus Sprint",
    starterRepo: "https://github.com/gitclub-charusat/starter-canteen-preorder",
    problemDescription: `During the 1:10 PM lunch bell at CHARUSAT, over 3,000 students rush to the campus food courts. Lines stretch 40 people deep, leading to missed meals or arriving late to afternoon laboratory sessions.

Develop a sleek, lightning-fast mobile-first web app allowing students to view daily canteen menus, assemble orders, pick a pickup time slot, generate a simulated digital pickup token with a QR code, and track prep status ('Received', 'Preparing', 'Ready at Counter 2').`,
    requirements: [
      "Interactive canteen menu with dietary filters (Jain, Pure Veg, Beverages, Fast Food) and stock toggles.",
      "Real-time cart with quantity adjustment, bill breakdown with campus tax discount, and pickup time selector.",
      "Order confirmation view generating an SVG QR code token and unique 4-digit pickup PIN.",
      "Kitchen simulation dashboard allowing an operator to mark orders 'In Kitchen' -> 'Ready for Pickup'.",
      "Order history tab in client interface with repeat-order shortcut."
    ],
    rules: [
      "Mobile layout must be exceptionally responsive and touch-friendly.",
      "Cart state and simulated orders must persist in localStorage.",
      "Include realistic mock menu items with images, prices in INR (₹), and prep time estimates."
    ],
    judgingCriteria: [
      { aspect: "Mobile Experience & UX Flow", weight: "35%" },
      { aspect: "Cart State Management & Checkout Simulation", weight: "30%" },
      { aspect: "Kitchen Operator Dual-view Architecture", weight: "20%" },
      { aspect: "Code Cleanliness & Git Commits", weight: "15%" }
    ],
    deliverables: [
      "GitHub repository URL",
      "Deployed application URL",
      "Submission notes on state management design"
    ]
  }
];

export const CATEGORIES = [
  "All Categories",
  "Web Development",
  "AI / ML",
  "Open Source",
  "Design",
  "DevOps & Cloud"
];

export const DIFFICULTIES = ["All Difficulties", "Easy", "Medium", "Hard"];

export const STATUS_FILTERS = ["All Statuses", "Active", "Upcoming", "Completed"];
