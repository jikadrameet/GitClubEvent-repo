/**
 * Git Club CHARUSAT — Challenge Arena Leaderboard Data
 * Realistic sample participants representing students across campus departments.
 */

export const INITIAL_LEADERBOARD = [
  {
    id: "user-1",
    rank: 1,
    name: "Aarav Patel",
    handle: "aarav_p",
    department: "CSPIT - Computer Engineering",
    points: 880,
    challengesCompleted: 4,
    challengesAttempted: 5,
    streak: "14 days",
    badge: "Master Builder",
    recentActivity: "Completed Campus Event Portal"
  },
  {
    id: "user-2",
    rank: 2,
    name: "Diya Shah",
    handle: "diyashah_dev",
    department: "DEPSTAR - Information Technology",
    points: 820,
    challengesCompleted: 4,
    challengesAttempted: 4,
    streak: "9 days",
    badge: "AI Specialist",
    recentActivity: "Submitted AI Study Assistant"
  },
  {
    id: "user-3",
    rank: 3,
    name: "Rohan Mehta",
    handle: "rohan_cloud",
    department: "CSPIT - Computer Science",
    points: 750,
    challengesCompleted: 3,
    challengesAttempted: 4,
    streak: "12 days",
    badge: "DevOps Pioneer",
    recentActivity: "Submitted Automated CI/CD Pipeline"
  },
  {
    id: "current-user",
    rank: 4,
    isCurrentParticipant: true,
    name: "You (CHARUSAT Dev)",
    handle: "student_builder",
    department: "CSPIT / DEPSTAR Tech Cell",
    points: 430, // Will be dynamically augmented by completed/submitted challenges in storage
    challengesCompleted: 2,
    challengesAttempted: 3,
    streak: "6 days",
    badge: "Rising Contributor",
    recentActivity: "Started Campus Event Portal"
  },
  {
    id: "user-4",
    rank: 5,
    name: "Ananya Joshi",
    handle: "ananya_ux",
    department: "DEPSTAR - Computer Science",
    points: 410,
    challengesCompleted: 2,
    challengesAttempted: 3,
    streak: "5 days",
    badge: "UI Virtuoso",
    recentActivity: "Completed Campus UI System"
  },
  {
    id: "user-5",
    rank: 6,
    name: "Karan Desai",
    handle: "karan_foss",
    department: "CMPICA - MCA",
    points: 360,
    challengesCompleted: 2,
    challengesAttempted: 2,
    streak: "7 days",
    badge: "Git Enthusiast",
    recentActivity: "Completed GitHub Portfolio Sprint"
  },
  {
    id: "user-6",
    rank: 7,
    name: "Pooja Varma",
    handle: "pooja_codes",
    department: "CSPIT - Information Technology",
    points: 310,
    challengesCompleted: 1,
    challengesAttempted: 2,
    streak: "3 days",
    badge: "Quick Starter",
    recentActivity: "Submitted Changa Weather Station"
  },
  {
    id: "user-7",
    rank: 8,
    name: "Devanshu Trivedi",
    handle: "dev_trivedi",
    department: "CSPIT - Computer Engineering",
    points: 250,
    challengesCompleted: 1,
    challengesAttempted: 2,
    streak: "4 days",
    badge: "Problem Solver",
    recentActivity: "Completed Lost & Found Network"
  },
  {
    id: "user-8",
    rank: 9,
    name: "Sneha Parmar",
    handle: "sneha_p",
    department: "RPCP - Pharma Tech",
    points: 180,
    challengesCompleted: 1,
    challengesAttempted: 1,
    streak: "2 days",
    badge: "Curious Explorer",
    recentActivity: "Completed Changa Weather Station"
  },
  {
    id: "user-9",
    rank: 10,
    name: "Harshil Bhatt",
    handle: "harshil_b",
    department: "DEPSTAR - IT",
    points: 150,
    challengesCompleted: 1,
    challengesAttempted: 2,
    streak: "1 day",
    badge: "Newcomer",
    recentActivity: "Started Campus Event Portal"
  }
];
