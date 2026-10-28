import { Project, Service, Experience, SkillCategory } from '../types';

export const personalInfo = {
  name: "Alisha Fatima Nasir",
  role: "Fullstack Developer & Creative Technologist",
  specialization: "React, Vanilla JavaScript Architectures, Cloud & AI Systems",
  location: "Garden East, Karachi, Pakistan",
  email: "alishaahmed502@gmail.com",
  phone: "0335-3641052",
  instagram: "https://www.instagram.com/alisha_ahmed84/",
  status: "Open to Remote Roles & Relocation",
  summary: "Fullstack developer with proven experience building responsive, interactive web systems from pure vanilla JavaScript architectures to React frontends, robust REST APIs, MongoDB, and Redis caching. Containerized workflows with Docker and AWS (ECR, ECS, EC2, IAM) for horizontally scaled deployments. Experienced in JavaScript LLM engineering (LangChain.js, RAG pipelines, vector embeddings) and GSAP 3D interactive interfaces.",
  education: [
    {
      degree: "Bachelor of Computer Science / Software Engineering",
      institution: "Sindh Madressatul Islam University (SMIU)",
      location: "Karachi, Pakistan",
      period: "2022 to In Process (Expected 2026)",
      notes: "Google Developer Student Club (GDSC) Active Member, SMIU 4th Summit Conference delegate"
    },
    {
      degree: "Intermediate in Pre-Engineering & Computer Science",
      institution: "Government College for Women, Shahrah-e-Liaquat",
      location: "Karachi, Pakistan",
      period: "2020 to 2022",
      notes: "Advanced Mathematics, Analytical Sciences, and Foundational Systems"
    },
    {
      degree: "Matriculation in Science",
      institution: "Pak Grammar School",
      location: "Karachi, Pakistan",
      period: "2019 to 2020",
      notes: "Graduated with High Academic Distinction in Science & Mathematics"
    }
  ],
  certifications: [
    "Google Developer Student Club (GDSC)",
    "SMIU 4th Summit Conference Delegate",
    "Expert Level Typing & Systems Speed Certification",
    "Creatics IT Frontend Engineering Internship Certificate"
  ],
  languages: ["English (Fluent)", "Urdu (Native)"]
};

export const servicesData: Service[] = [
  {
    id: "frontend-arch",
    title: "Modern Frontend & 3D Interactive UI",
    description: "Developing blazing fast, fluid user interfaces with React, JavaScript, modern CSS, and GSAP animations that capture attention while maintaining accessibility and speed.",
    skills: ["React.js", "GSAP 3D Animations", "JavaScript ES6+", "Tailwind CSS", "Responsive UI"],
    iconName: "Layout",
    deliverables: [
      "Custom responsive web applications",
      "Interactive 3D scroll and micro animations",
      "Component libraries and design systems",
      "High performance web optimization"
    ]
  },
  {
    id: "ai-llm",
    title: "AI & LLM Solutions Engineering",
    description: "Architecting intelligent applications powered by large language models, retrieval augmented generation (RAG), vector databases, and autonomous agents.",
    skills: ["LangChain", "LangGraph", "Vector Embeddings", "RAG Pipelines", "AI Workflows"],
    iconName: "Cpu",
    deliverables: [
      "AI assisted content management systems",
      "Knowledge base vector semantic search",
      "Dynamic prompt orchestration pipelines",
      "Automated intelligent agent workflows"
    ]
  },
  {
    id: "fullstack-realtime",
    title: "Fullstack & Real-Time Web Services",
    description: "Building robust end to end applications with RESTful APIs, low latency WebSocket communication, dynamic caching, and geolocation integrations.",
    skills: ["REST APIs", "Socket.IO", "Node.js", "MongoDB", "Redis", "OpenCage Geocoding"],
    iconName: "Radio",
    deliverables: [
      "Bidirectional real time communication hubs",
      "Geospatial mapping and route tracking",
      "Scalable API development and documentation",
      "In memory caching and state persistence"
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & Containerization",
    description: "Containerizing services with Docker and deploying reliable architectures on AWS with horizontal scaling and resilient system design.",
    skills: ["Docker", "AWS ECS", "AWS ECR", "AWS EC2", "IAM Security", "System Scaling"],
    iconName: "Cloud",
    deliverables: [
      "Dockerized microservice configurations",
      "AWS cloud deployment pipelines",
      "Service system design and load resilience",
      "Secure IAM roles and permission policies"
    ]
  },
  {
    id: "compiler-rules",
    title: "Custom Rule Engines & Logic Compilers",
    description: "Creating custom parsers and rule evaluation engines that interpret dynamic user defined conditions in real time for enterprise workflows.",
    skills: ["Compiler Logic", "Abstract Syntax Trees", "Rule Engines", "Algorithm Optimization"],
    iconName: "Terminal",
    deliverables: [
      "Dynamic expression and rule evaluators",
      "Tokenizers and custom query parsers",
      "Safe sandboxed runtime logic validators",
      "Configurable decision processing engines"
    ]
  }
];

export const experienceData: Experience = {
  role: "Frontend Developer Trainee & Intern",
  company: "Creatics Information Technology Company",
  location: "68 Jinnah Co-operative Housing Society, 7/8 PECHS Block, Shahrah-e-Faisal, Karachi, Pakistan",
  period: "August 2025 to September 2025",
  badge: "Verified Internship",
  description: "Completed frontend engineering responsibilities at Creatics Information Technology Company. Built high fidelity responsive web applications, implemented dynamic UI features, and collaborated with engineering teams on production standards.",
  responsibilities: [
    "Developed clean, modern interactive web interfaces using HTML5, CSS3, JavaScript, and React",
    "Enhanced user experiences through fluid micro interactions, layout responsiveness, and performance tuning",
    "Collaborated cross functionally within the IT team to translate wireframes into production grade components",
    "Received official certification of performance commended by Human Resources leadership"
  ],
  technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Git", "REST APIs", "Responsive Design"],
  certificateAvailable: true
};

export const projectsData: Project[] = [
  {
    id: "parksense",
    title: "ParkSense: Smart Parking Management System",
    subtitle: "Real-Time Slot Allocation, Automated Billing & Occupancy Prediction",
    description: "An automated single page parking management system built with pure vanilla modular JavaScript and HTML5/CSS3. Solves time wasted searching for parking and revenue lost through manual ticketing and overstays with dynamic slot allocation, QR ticket generation, rules based billing, and dynamic surge pricing.",
    tags: ["Vanilla JS Modules", "HTML5 Canvas", "localStorage DB", "Priority Queue", "Dynamic Surge Pricing", "SVG & Canvas Charts"],
    category: "smart-systems",
    liveUrl: "https://park-sense-2026.netlify.app/",
    problemSolved: "Drivers waste time searching for parking, and operators lose revenue through manual ticketing, overstays, and poor slot utilization. ParkSense automates slot allocation, billing, and usage prediction in one unified system.",
    userRoles: [
      { role: "Admin", description: "Manages lots, dynamic pricing rules, user roles, and high level occupancy analytics" },
      { role: "Attendant", description: "Handles vehicle entry, automatic nearest slot assignment, exit scanning, and payment processing" },
      { role: "Driver", description: "Finds and reserves slots across 3 floors, views live availability, history logs, and printable receipts" }
    ],
    coreModules: [
      "Live 3-Floor Parking Map (Green = free, Red = occupied, Yellow = reserved, Blue = EV, Gray = out of service) with hover tooltips",
      "Vehicle Entry with plate validation, vehicle type auto-assignment (bike, car, SUV, EV), and canvas drawn QR ticket",
      "Vehicle Exit & Billing engine with 10-min grace period, overstay penalty, night discount, and printable receipt",
      "Reservation System with conflict prevention and 15-min late no-show auto-release countdown",
      "Live Simulation Mode with continuous vehicle arrival and departure traffic generator",
      "Dashboard KPIs with animated count-up numbers and canvas charts (line, bar, donut, peak-hour heatmap)",
      "Peak-Hour Prediction forecasting using weighted moving averages with confidence indicators",
      "Dynamic Pricing engine activating +20% surge pricing when occupancy exceeds 80%"
    ],
    algorithms: [
      { name: "Nearest-Slot Allocation", complexity: "O(log N)", description: "Min-heap priority queue allocating nearest free slot to entrance based on distance metric" },
      { name: "Interval Overlap Conflict Detection", complexity: "O(N)", description: "Detects overlapping reservation windows preventing double bookings" },
      { name: "Rules Chaining Billing Engine", complexity: "O(1)", description: "Calculates duration, applies vehicle rates, grace periods, daily caps, and overstay fines" },
      { name: "Weighted Moving Average Forecasting", complexity: "O(K)", description: "Predicts peak hour occupancy based on historical weekday hourly patterns" },
      { name: "Hash Map O(1) Index Lookup", complexity: "O(1)", description: "Instant plate number and unique ticket barcode query and status retrieval" }
    ],
    highlights: [
      "Pure Vanilla JS Architecture with 7 modular separation files (storage, parking, billing, prediction, charts, ui, app)",
      "Live interactive 3-floor parking grid with animated vehicle entry path visualization",
      "Canvas drawn QR ticket generator and printable receipt modal with payment selector",
      "Dynamic surge pricing badge with +20% / -10% rate shifts based on live threshold occupancy",
      "Live traffic simulation engine generating realistic arrivals, departures, and KPI fluctuations"
    ],
    metrics: "Automates 60+ slots across 3 floors with sub-millisecond slot assignment",
    demoType: "parksense",
    featured: true,
    accentColor: "#10b981"
  },
  {
    id: "smartdesk",
    title: "SmartDesk: Smart Office Management System",
    subtitle: "Interactive Floor Plan, Smart Room & Desk Booking, IoT Energy Simulation",
    description: "A multi-page-feeling single page application built with vanilla JavaScript modules and CSS glassmorphism. Centralizes conference room reservations, hot-desking, employee attendance tracking, drag-and-drop maintenance Kanban tickets, and automated IoT energy conservation.",
    tags: ["Vanilla JS Modules", "SVG Floor Map", "Kanban Drag & Drop", "Energy Simulation", "Priority Queue", "Attendance Tracking"],
    category: "smart-systems",
    liveUrl: "https://smartofficedesk.netlify.app/",
    problemSolved: "Offices waste time and resources on manual room booking, desk allocation, attendance tracking, maintenance complaints, and wasted energy in empty rooms. SmartDesk centralizes all operations into one intuitive real-time dashboard.",
    userRoles: [
      { role: "Admin", description: "Manages entire office layout, reviews department analytics, peak usage hours, and energy savings" },
      { role: "Employee", description: "Books conference rooms and hot-desks, logs daily attendance with live clock, and raises support tickets" },
      { role: "Maintenance Staff", description: "Tracks and resolves facility tickets with priority-sorted drag-and-drop Kanban workflow" }
    ],
    coreModules: [
      "Executive Dashboard with animated count-up KPI metrics and canvas analytics (attendance, energy, ticket status)",
      "Interactive Office Floor Map rendered with SVG/CSS rooms and desks with live status colors and tooltips",
      "Room & Desk Booking System with interval conflict detection and visual timeline calendar",
      "Attendance Management with live clock check-in/out, late vs on-time detection, and CSV export",
      "Smart Energy IoT Simulation with automated device shut-off in empty rooms after 5 mins and 'Saved Today' log",
      "Maintenance Tickets Kanban board with drag-and-drop status transitions and priority auto-sorting",
      "Notifications hub with badge counter and slide-in toast alerts for bookings and conflicts",
      "Admin Analytics with peak usage heatmaps and average ticket resolution times"
    ],
    algorithms: [
      { name: "Booking Conflict Detection", complexity: "O(N)", description: "Interval overlap algorithm preventing concurrent meeting room reservations" },
      { name: "Priority Queue Ticket Dispatch", complexity: "O(log N)", description: "Auto-sorts maintenance issues by urgency (High/Critical first) for rapid dispatch" },
      { name: "Smart Desk Recommendation", complexity: "O(D)", description: "Recommends optimal available hot-desk based on employee department and past seating preferences" }
    ],
    highlights: [
      "Zero external frameworks: pure vanilla HTML5, CSS3 glassmorphism, and modular ES6 JavaScript",
      "Interactive SVG floor plan with real-time status pulses and direct desk reservation",
      "IoT energy conservation simulator logging watts saved when empty room appliances shut off",
      "Smooth drag-and-drop Kanban board with priority auto-sorting for maintenance workflows",
      "Comprehensive attendance system with live clock, status flags, and CSV report export"
    ],
    metrics: "Eliminates room booking collisions and logs real-time energy conservation",
    demoType: "smartdesk",
    featured: true,
    accentColor: "#38bdf8"
  },
  {
    id: "aivora-cms",
    title: "Aivora CMS",
    subtitle: "AI Powered Content Management System",
    description: "An intelligent content management system that integrates modern generative AI workflows into production web publishing, featuring automated copy generation, vector semantic categorization, and smart editorial tooling.",
    tags: ["React", "AI & LLM", "LangChain.js", "Vector Embeddings", "RAG", "Tailwind CSS"],
    category: "ai",
    highlights: [
      "Intelligent content generation pipeline with prompt control",
      "Semantic tagging using high dimensional vector embeddings",
      "Real time editorial preview with modular component drafting",
      "Smart summarization and SEO meta attribute generation"
    ],
    metrics: "Accelerates content workflows by 4x",
    demoType: "cms",
    videoUrl: "https://jumpshare.com/s/WsmO8q3hdqGkLPYAB508",
    videoPlatform: "jumpshare",
    featured: true,
    accentColor: "#06b6d4"
  },
  {
    id: "uber-clone",
    title: "Uber Clone Real Time Ride App",
    subtitle: "Real Time Ride Booking with Geocoding",
    description: "A comprehensive ride hailing platform built with instant bidirectional driver and passenger communication via Socket.IO, accompanied by real time location geocoding powered by the OpenCage Maps API.",
    tags: ["Socket.IO", "OpenCage Maps API", "React", "Node.js", "MongoDB", "Realtime WebSockets"],
    category: "realtime",
    highlights: [
      "Instant driver dispatch and status broadcast via WebSockets",
      "Interactive pickup and dropoff geocoding via OpenCage",
      "Live fare estimation and dynamic routing calculation",
      "Driver proximity alerts and passenger booking confirmations"
    ],
    metrics: "Sub 50ms WebSocket latency",
    demoType: "ride",
    videoUrl: "https://jumpshare.com/s/H15K1xr6zJgOmKB8h9j7",
    videoPlatform: "jumpshare",
    featured: true,
    accentColor: "#3b82f6"
  },
  {
    id: "fanta-landing",
    title: "Fanta 3D Experience",
    subtitle: "GSAP Scroll Animations and Interactive UI",
    description: "A visually captivating marketing showcase designed with GSAP 3D interactive transformations, delivering dynamic scroll orchestrated bottle motions, floating flavor bubbles, and rich micro interactions.",
    tags: ["GSAP 3D", "JavaScript", "CSS3 3D Transforms", "Interactive UI", "HTML5"],
    category: "frontend",
    highlights: [
      "Interactive 3D bottle rotation responding to cursor and scroll",
      "Dynamic flavor switcher with synchronized ambient palette shifts",
      "GSAP timeline animations for particle and bubble physics",
      "Responsive layout optimized for smooth 60fps rendering"
    ],
    metrics: "Silky 60fps GPU accelerated animations",
    demoType: "fanta",
    videoUrl: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158196/fanta_kdkchv.mp4",
    videoPlatform: "direct",
    featured: true,
    accentColor: "#f97316"
  },
  {
    id: "rules-compiler",
    title: "Customizable Rules Compiler",
    subtitle: "Compiler Logic and Dynamic Rule Engine",
    description: "A customizable programming rule compiler and runtime engine that accepts user defined conditional rules, parses syntax tokens into abstract syntax trees, and dynamically evaluates outcomes in microseconds.",
    tags: ["Compiler Logic", "AST Parsing", "Rule Engine", "JavaScript", "System Design"],
    category: "systems",
    highlights: [
      "Custom lexical tokenizer and recursive descent expression parser",
      "Safe runtime execution sandbox preventing script injection",
      "Dynamic data binding supporting nested JSON evaluation",
      "Instant visual syntax error detection and debug diagnostics"
    ],
    metrics: "Processes 10,000+ rule evaluations per second",
    demoType: "compiler",
    videoUrl: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158423/compiler_s8dvxg.mp4",
    videoPlatform: "direct",
    featured: true,
    accentColor: "#a855f7"
  },
  {
    id: "significo-website",
    title: "Significo Platform UI",
    subtitle: "Modern Responsive React Interface",
    description: "A high fidelity digital platform interface featuring clean typography, modular card layouts, subtle depth effects, and smooth interaction states inspired by modern SaaS design standards.",
    tags: ["React", "Modern UI", "Tailwind CSS", "Interactive States", "Component Architecture"],
    category: "frontend",
    highlights: [
      "Pixel perfect modular component design system",
      "Intuitive navigation and accessible state handling",
      "Interactive filterable card showcases with smooth transitions",
      "Mobile first responsive architecture"
    ],
    metrics: "100% Mobile & Desktop responsiveness score",
    demoType: "significo",
    videoUrl: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789157989/significo_iv5ol6.mp4",
    videoPlatform: "direct",
    featured: true,
    accentColor: "#10b981"
  },
  {
    id: "gym-webpage",
    title: "PowerPulse Gym Platform",
    subtitle: "Interactive Fitness UI & Workout Hub",
    description: "An energetic fitness web portal built with responsive layout mechanics, class schedule filters, interactive membership calculators, and vibrant visual storytelling.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Interactive UI"],
    category: "frontend",
    highlights: [
      "Interactive BMI and calorie requirement calculator",
      "Dynamic weekly class schedule filtered by intensity",
      "Modern dark aesthetic with high contrast neon highlights",
      "Smooth modal registration and trainer showcase"
    ],
    metrics: "Engaging user engagement with zero dependencies",
    demoType: "gym",
    videoUrl: "https://res.cloudinary.com/dk9s4baeq/video/upload/v1789158374/gym_dnlg52.mp4",
    videoPlatform: "direct",
    featured: true,
    accentColor: "#ec4899"
  },
  {
    id: "airport-management",
    title: "Airport Management System (AMS)",
    subtitle: "Flight Operations, Gate Scheduling & Passenger Boarding",
    description: "A comprehensive terminal operations interface managing live flight arrivals and departures, gate assignments, baggage status, and passenger boarding pipelines.",
    tags: ["JavaScript ES6", "Event Architecture", "DOM Engine", "Terminal Scheduling", "localStorage"],
    category: "systems",
    problemSolved: "Airports face flight delays, gate collisions, and manual passenger coordination issues. AMS streamlines terminal gate dispatching, boarding queues, and live flight status updates.",
    highlights: [
      "Live departures and arrivals flight status timetable with real-time state switches",
      "Terminal gate allocation matrix preventing gate collision conflicts",
      "Passenger check-in verification and automated boarding pass generation",
      "Baggage tracking stage log from check-in to transit carousel"
    ],
    metrics: "Coordinates 24+ flight routes across multiple terminal concourses",
    demoType: "ams",
    featured: false,
    accentColor: "#0284c7"
  },
  {
    id: "flight-booking",
    title: "AeroGlide Flight Booking Platform",
    subtitle: "Interactive Seat Map, Route Search & Fare Engine",
    description: "An interactive flight reservation system featuring dynamic route discovery, multi-tier pricing calculation, and an interactive cabin seat-selection grid with real-time seat availability.",
    tags: ["JavaScript", "Interactive SVG Seat Map", "Dynamic Pricing Engine", "CSS Grid", "localStorage"],
    category: "web-apps",
    problemSolved: "Complex airline checkout flows confuse travelers with opaque seat fees and slow booking forms. AeroGlide simplifies flight discovery and seat selection into a unified responsive flow.",
    highlights: [
      "Interactive aircraft cabin layout with window, aisle, and extra-legroom seat selection",
      "Multi-city and direct route filter with date and cabin class options",
      "Dynamic fare breakdown calculating baggage fees, seat premiums, and taxes",
      "Instant printable digital boarding pass with confirmation barcode"
    ],
    metrics: "Real-time cabin seat map rendering with zero layout lag",
    demoType: "flight",
    featured: false,
    accentColor: "#38bdf8"
  },
  {
    id: "media-player",
    title: "WaveFlow Web Media Player",
    subtitle: "Custom Audio Engine with Real-Time Frequency Visualizer",
    description: "A sleek, responsive web audio player featuring an HTML5 Web Audio API frequency visualizer, custom playlist queue, dynamic seeking, and sound equalizer.",
    tags: ["Web Audio API", "HTML5 Canvas Visualizer", "JavaScript", "Audio Processing", "CSS Modern"],
    category: "frontend",
    problemSolved: "Native browser media players offer clunky UI and no visual feedback. WaveFlow combines real-time frequency canvas animations, playlist queues, and tactile equalizer controls.",
    highlights: [
      "Live HTML5 Canvas audio spectrum visualizer rendering real-time sound frequencies",
      "Custom seekbar scrubbing, volume booster, and track shuffle/repeat modes",
      "Dynamic playlist manager with custom audio queue handling and ID3 metadata reading",
      "Keyboard shortcuts (Space for Play/Pause, Arrow keys for seek and volume)"
    ],
    metrics: "Real-time 60fps audio waveform canvas rendering",
    demoType: "media",
    featured: false,
    accentColor: "#a855f7"
  },
  {
    id: "quiz-platform",
    title: "MasteryHub Assessment & Quiz Engine",
    subtitle: "Timed Interactive Testing Engine with Instant Evaluation",
    description: "An interactive testing platform with countdown timers, randomized question banks, instant score breakdown, question review, and custom result certifications.",
    tags: ["JavaScript ES6", "Timer Mechanics", "State Machine", "Score Analytics", "localStorage"],
    category: "web-apps",
    problemSolved: "Static assessment tools fail to provide timely feedback or realistic testing conditions. MasteryHub delivers timed test-taking, instant scoring, and analytical performance breakdowns.",
    highlights: [
      "Precision countdown timer per question with auto-submit protection",
      "Randomized question sequence with multi-category technical domains",
      "Instant score breakdown with performance analytics and answer rationale",
      "Downloadable completion certificate with personalized score report"
    ],
    metrics: "Instantaneous score calculation and detailed accuracy analytics",
    demoType: "quiz",
    featured: false,
    accentColor: "#f59e0b"
  },
  {
    id: "shopping-cart",
    title: "SwiftCart E-Commerce & Checkout Engine",
    subtitle: "Dynamic Cart State, Promo Codes & Tax Calculations",
    description: "A high-performance e-commerce shopping cart featuring dynamic item quantity adjustments, live tax and shipping calculations, promotional coupon validation, and state persistence.",
    tags: ["JavaScript", "State Management", "Coupon Validation Engine", "localStorage", "Responsive Design"],
    category: "web-apps",
    problemSolved: "Slow cart calculations and buggy coupon logic cause cart abandonment. SwiftCart offers instant client-side updates, coupon rules, and transparent fee breakdowns.",
    highlights: [
      "Sub-millisecond cart item quantity updates and live total re-calculation",
      "Discount coupon validation engine with percentage and flat-rate promo codes",
      "Automated shipping and tax tiered calculation based on order value",
      "Persistent order state in localStorage with clean checkout modal"
    ],
    metrics: "100% Client-side state persistence across reloads",
    demoType: "cart",
    featured: false,
    accentColor: "#10b981"
  },
  {
    id: "blog-website",
    title: "Ink & Thought Editorial Blog",
    subtitle: "Typography-First Markdown Publishing Experience",
    description: "An elegant, typography-focused editorial publishing platform designed for deep reading, featuring category filtering, estimated reading time, reading progress indicators, and clean layout.",
    tags: ["JavaScript", "Modern Typography", "Reading Progress Engine", "Tag Filtering", "Responsive Design"],
    category: "frontend",
    problemSolved: "Modern blogs are cluttered with intrusive popups and unreadable layouts. Ink & Thought prioritizes typographical comfort, reading progress tracking, and distraction-free viewing.",
    highlights: [
      "Clean editorial typographic layout with optimal line length and contrast",
      "Live scroll reading progress bar and automatic reading time calculator",
      "Multi-tag filtering across tech, design, and architecture articles",
      "Dark and light reading mode with adjustable text scale"
    ],
    metrics: "Optimized readability with sub-second page rendering",
    demoType: "blog",
    featured: false,
    accentColor: "#eab308"
  },
  {
    id: "search-filter",
    title: "OmniFilter Instant Search Engine",
    subtitle: "Sub-Millisecond Client-Side Fuzzy Search & Facet Index",
    description: "A lightning-fast client-side search and facet indexing tool that filters high-density datasets with fuzzy string matching, multi-column sorting, and instant debounced updates.",
    tags: ["JavaScript", "Fuzzy Search Algorithm", "Debounced Query Engine", "Multi-Facet Filtering", "DOM Optimization"],
    category: "systems",
    problemSolved: "Laggy search bars degrade user experience when browsing catalogs. OmniFilter implements fast client-side fuzzy indexing with instantaneous substring highlighting.",
    highlights: [
      "Fuzzy matching algorithm with highlighted search substring matches",
      "Multi-attribute filter matrix (category, price range, ratings, in-stock status)",
      "Debounced keystroke processing preventing frame drops during rapid typing",
      "Zero-dependency vanilla JavaScript implementation with instantaneous response"
    ],
    metrics: "Filters 500+ records in under 2ms",
    demoType: "search",
    featured: false,
    accentColor: "#06b6d4"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    icon: "Monitor",
    skills: [
      { name: "React.js", level: 95, highlight: true },
      { name: "JavaScript (ES6+)", level: 95, highlight: true },
      { name: "GSAP 3D Animations", level: 90, highlight: true },
      { name: "HTML5 & CSS3", level: 98 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Responsive UI Design", level: 95 }
    ]
  },
  {
    title: "AI & LLM Technologies",
    icon: "Brain",
    skills: [
      { name: "LangChain", level: 88, highlight: true },
      { name: "LangGraph", level: 85, highlight: true },
      { name: "RAG Architectures", level: 88, highlight: true },
      { name: "Vector Embeddings", level: 86 },
      { name: "Vector Databases", level: 84 },
      { name: "LLM App Engineering", level: 90 }
    ]
  },
  {
    title: "Backend & Databases",
    icon: "Server",
    skills: [
      { name: "REST APIs", level: 92, highlight: true },
      { name: "Socket.IO Realtime", level: 90, highlight: true },
      { name: "MongoDB", level: 85 },
      { name: "Redis In Memory Caching", level: 84 },
      { name: "Node.js & Express", level: 88 }
    ]
  },
  {
    title: "Cloud, DevOps & System Design",
    icon: "CloudRain",
    skills: [
      { name: "Docker Containerization", level: 86, highlight: true },
      { name: "AWS (ECR, ECS, EC2, IAM)", level: 84, highlight: true },
      { name: "Horizontal Scaling", level: 82 },
      { name: "Service System Design", level: 85 },
      { name: "Git & Version Control", level: 92 }
    ]
  },
  {
    title: "Programming Languages & Foundations",
    icon: "Code2",
    skills: [
      { name: "JavaScript (ES6+ / Node.js)", level: 95, highlight: true },
      { name: "TypeScript", level: 92, highlight: true },
      { name: "Java", level: 86, highlight: true },
      { name: "Python", level: 85 },
      { name: "C Programming", level: 82 },
      { name: "Compiler & Logic Systems", level: 85 }
    ]
  }
];
