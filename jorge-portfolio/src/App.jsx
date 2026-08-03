import React, { useState, useEffect } from 'react';
import {
  Code2, Terminal, Cpu, Database, ShieldCheck, ArrowRight, Mail,
  User, Download, Award, FolderCode, Calendar, UserCheck,
  Armchair, Activity, MessageSquare, MapPin, Share2,
  ArrowLeft, Image as ImageIcon, X
} from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaCode, FaHeadset, FaHashtag } from 'react-icons/fa';

// -------------------------------------------------------------
// ASSETS IMPORTS
// -------------------------------------------------------------
import profileImg from './assets/profile.jpg';
import cert1 from './assets/certificates/Building-Story-base-Design-Cert.png';
import cert2 from './assets/certificates/Clean-Refine-and-Visualize-Data- with-IBM-Walson-Studio.png';
import cert3 from './assets/certificates/Conducting-Usability-and-Gathering-Feedback-Cert.png';
import cert4 from './assets/certificates/Conduction-UX-Research-Cert.png';
import cert5 from './assets/certificates/Data-Fundamentals-Cert.png';
import cert6 from './assets/certificates/Data-Science-in-Our-World-Cert.png';
import cert7 from './assets/certificates/Introduction-to-Data-Concept-Cert.png';
import cert8 from './assets/certificates/Introduction-to-UX-Design-Cert.png';
import cert9 from './assets/certificates/Overview-of-Data-Tools-and-Languages-Cert.png';
import cert10 from './assets/certificates/Python-Cisco-Cert.png';
import cert11 from './assets/certificates/Wireframing-and-Prototyping-Cert.png';
import cert12 from './assets/certificates/Working-Collaboratively-with-Teams-on-UX-Design-Projects-Cert.png';
import cert13 from './assets/certificates/Your-Future-in-UX-Design-The-Job-Landscape-Cert.png';

import web1 from './assets/webdesign/E-commerce-Design.png';
import web2 from './assets/webdesign/FilipinoTVShow-web-Design.png';
import web3 from './assets/webdesign/Airplane-Company-Design.png';
import web4 from './assets/webdesign/FEU-LadyTamaraw-Web-Design.png';

// -------------------------------------------------------------
// ANIMATION VARIANTS FOR SCROLL FADE EFFECT
// -------------------------------------------------------------
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// -------------------------------------------------------------
// DATA OBJECTS
// -------------------------------------------------------------
const projectData = {
  attendance: {
    title: "Student Attendance Monitoring System",
    desc: "A desktop application designed to simplify recording, managing, and monitoring student attendance. Instructors can track presence, cut down manual record-keeping, and generate summaries for class participation analysis.",
    tech: ["Java", "MySQL", "Swing", "OOP"],
    features: [
      "Student registration and profile management",
      "Course, year level, and section organization",
      "Daily attendance recording (Present, Absent, Late)",
      "Attendance history and tracking",
      "Search and filter student records",
      "Attendance summary and reports",
      "User-friendly interface for instructors",
      "Secure admin access"
    ],
    iconType: "userCheck"
  },
  reservation: {
    title: "Express Seat Reservation System",
    desc: "A reservation management system allowing passengers to reserve seats for scheduled trips. Streamlines the booking workflow by tracking seat availability, passenger details, and active reservation logs.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    features: [
      "Passenger registration",
      "Trip schedule management",
      "Interactive seat selection",
      "Real-time seat availability",
      "Reservation confirmation",
      "Booking history",
      "Reservation cancellation and updates",
      "Admin dashboard for managing trips and reservations"
    ],
    iconType: "armchair"
  },
  clinic: {
    title: "Clinic Management System",
    desc: "A healthcare management app assisting medical clinics in organizing patient records, appointment queues, doctor consultations, and medical services into a streamlined digital workflow.",
    tech: ["Java", "MySQL", "Figma", "CSS3"],
    features: [
      "Patient registration and medical records",
      "Appointment scheduling",
      "Doctor consultation management",
      "Electronic medical history",
      "Prescription recording",
      "Billing and payment management",
      "Search and update patient information",
      "Reports and patient visit history"
    ],
    iconType: "activity"
  }
};

const webDesignData = [
  {
    id: 1,
    title: "E-Commerce Design",
    desc: "Modern UI/UX web layout designed for online store browsing, product catalogs, and cart checkouts.",
    tech: ["Figma", "UI/UX", "Web Design"],
    image: web1
  },
  {
    id: 2,
    title: "Filipino TV Show Design",
    desc: "Interactive streaming and promotional interface concept themed for popular Filipino television networks.",
    tech: ["Figma", "UI/UX", "Entertainment"],
    image: web2
  },
  {
    id: 3,
    title: "Airplane Company Design",
    desc: "Sleek flight booking dashboard interface customized for commercial airline itineraries and flight scheduling.",
    tech: ["Figma", "UI/UX", "Dashboard"],
    image: web3
  },
  {
    id: 4,
    title: "FEU Tamaraw Design",
    desc: "Dynamic digital showcase platform designed for FEU Tamaraws athletics and community news.",
    tech: ["Figma", "Branding", "UI/UX"],
    image: web4
  }
];

const certificatesList = [
  {
    id: 1,
    title: "Building Story-based Design",
    issuer: "IBM",
    desc: "Digital credential issued by IBM covering user story creation, narrative design frameworks, and user empathy.",
    image: cert1
  },
  {
    id: 2,
    title: "Clean, Refine, and Visualize Data",
    issuer: "IBM",
    desc: "Digital credential issued by IBM demonstrating proficiency in data cleaning, transformation, and visualizations.",
    image: cert2
  },
  {
    id: 3,
    title: "Conducting Usability and Gathering Feedback",
    issuer: "IBM",
    desc: "Digital credential issued by IBM validating skills in usability testing and user interaction analysis.",
    image: cert3
  },
  {
    id: 4,
    title: "Conducting UX Research",
    issuer: "IBM",
    desc: "Digital credential issued by IBM focusing on primary user research and qualitative interviews.",
    image: cert4
  },
  {
    id: 5,
    title: "Data Fundamentals",
    issuer: "IBM",
    desc: "Digital credential issued by IBM introducing foundational data concepts and relational database architecture.",
    image: cert5
  },
  {
    id: 6,
    title: "Data Science in Our World",
    issuer: "IBM",
    desc: "Digital credential issued by IBM exploring real-world analytical workflows and predictive models.",
    image: cert6
  },
  {
    id: 7,
    title: "Introduction to Data Concepts",
    issuer: "IBM",
    desc: "Digital credential issued by IBM covering data structures, storage systems, and processing models.",
    image: cert7
  },
  {
    id: 8,
    title: "Introduction to UX Design",
    issuer: "IBM",
    desc: "Digital credential issued by IBM covering core UI/UX principles, design thinking, and wireframes.",
    image: cert8
  },
  {
    id: 9,
    title: "Overview of Data Tools and Languages",
    issuer: "IBM",
    desc: "Digital credential issued by IBM covering query languages and essential data engineering tools.",
    image: cert9
  },
  {
    id: 10,
    title: "Python Essentials",
    issuer: "IBM",
    desc: "Digital credential issued by IBM validating programming logic, functions, and object-oriented concepts.",
    image: cert10
  },
  {
    id: 11,
    title: "Wireframing and Prototyping",
    issuer: "IBM",
    desc: "Digital credential issued by IBM focusing on low-to-high fidelity wireframing and interactive prototypes.",
    image: cert11
  },
  {
    id: 12,
    title: "Working Collaboratively with Teams",
    issuer: "IBM",
    desc: "Digital credential issued by IBM highlighting Agile methodologies and collaborative software development.",
    image: cert12
  },
  {
    id: 13,
    title: "Your Future in UX Design",
    issuer: "IBM",
    desc: "Digital credential issued by IBM focusing on industry UX standards and professional design readiness.",
    image: cert13
  }
];

const techStack = [
  { name: 'HTML5', icon: 'fa-brands fa-html5 text-orange-500' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt text-blue-500' },
  { name: 'JavaScript', icon: 'fa-brands fa-js text-yellow-400' },
  { name: 'PHP', icon: 'fa-brands fa-php text-purple-400' },
  { name: 'MySQL', icon: 'fa-solid fa-database text-blue-400' },
  { name: 'Figma', icon: 'fa-brands fa-figma text-pink-400' },
  { name: 'Canva', icon: 'fa-solid fa-palette text-cyan-400' },
  { name: 'Flutter', icon: 'fa-solid fa-mobile-screen text-sky-400' },
  { name: 'Dart', icon: 'fa-solid fa-code text-blue-500' },
  { name: 'Java', icon: 'fa-brands fa-java text-orange-400' },
  { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap text-purple-500' },
];

const servicesData = [
  {
    id: 'it-support',
    title: 'IT Support & Maintenance',
    icon: <FaLaptopCode className="text-3xl text-purple-400" />,
    briefDesc: 'Comprehensive hardware/software troubleshooting and setup.',
    fullDesc: 'Comprehensive hardware/software troubleshooting, local network configuration, database administration, system updates, and preventative maintenance.',
    subServices: [
      {
        id: 'hardware-software',
        title: 'Hardware & Software Troubleshooting',
        desc: 'Diagnosing system errors, operating system installations, software configuration, and system optimizations.'
      },
      {
        id: 'network-setup',
        title: 'Local Network Setup',
        desc: 'Router setup, Wi-Fi configuration, printer sharing, and local network connectivity fixes.'
      },
      {
        id: 'db-admin',
        title: 'Database Administration & Maintenance',
        desc: 'Database installation, backup management, query optimization, and structured record handling.'
      }
    ]
  },
  {
    id: 'admin-assistance',
    title: 'Administrative Assistance',
    icon: <FaCode className="text-3xl text-purple-400" />,
    briefDesc: 'Structured data entry, meeting documentation, and workflow tracking.',
    fullDesc: 'Structured data entry, meeting documentation, digital file organization, schedule planning, and council/administrative workflow tracking.',
    subServices: [
      {
        id: 'data-entry',
        title: 'Data Entry & Spreadsheet Management',
        desc: 'Organizing complex sheets, compiling data summaries, and maintaining clean records.'
      },
      {
        id: 'documentation',
        title: 'Meeting Minutes & Documentation',
        desc: 'Drafting formal meeting minutes, organizational resolutions, and official document formatting.'
      },
      {
        id: 'workflow-tracking',
        title: 'Workflow Tracking & File Management',
        desc: 'Digital file organization, task management board setup, and project tracking.'
      }
    ]
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    icon: <FaHeadset className="text-3xl text-purple-400" />,
    briefDesc: 'Helpdesk ticketing, inquiry handling, and technical support.',
    fullDesc: 'Helpdesk ticketing management, prompt user communication, problem resolution, onboarding guidance, and structured feedback collection.',
    subServices: [
      {
        id: 'helpdesk',
        title: 'Helpdesk & Ticket Handling',
        desc: 'Filtering user inquiries, resolving technical questions, and documenting recurring support issues.'
      },
      {
        id: 'onboarding',
        title: 'User Onboarding Guidance',
        desc: 'Guiding new system users through step-by-step account setups and application walk-throughs.'
      },
      {
        id: 'feedback-coll',
        title: 'Feedback Collection & Response Management',
        desc: 'Gathering structured user feedback and responding quickly across support channels.'
      }
    ]
  },
  {
    id: 'smm',
    title: 'Social Media Management',
    icon: <FaHashtag className="text-3xl text-purple-400" />,
    briefDesc: 'Content creation, design graphics, and promotional layouts.',
    fullDesc: 'Content calendar planning, dark/light theme graphics design, announcement releases, and targeted community engagement strategies.',
    subServices: [
      {
        id: 'graphic-design',
        title: 'Graphic Design & Layouts',
        desc: 'Custom social media graphics, event banners, dark/monochromatic layouts, and announcement designs.'
      },
      {
        id: 'content-calendar',
        title: 'Content Planning & Scheduling',
        desc: 'Scheduling regular announcements, structuring digital posts, and content calendar management.'
      },
      {
        id: 'community-mgmt',
        title: 'Community Engagement',
        desc: 'Monitored engagement, responding to student/user inquiries, and managing page feedback.'
      }
    ]
  }
];

export default function App() {
  // --- UI & Modal States ---
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
  const [showAllCerts, setShowAllCerts] = useState(false);

  // --- Typing Effect State ---
  const [typedText, setTypedText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Default Gmail Mailto link with pre-filled subject
  const placeholderBody = encodeURIComponent(
    `Hi Jorge,

I am reaching out regarding:
[ ] Availing a Service / Virtual Assistant
[ ] Job Opportunity / Hiring

Service / Assistance Needed:
(If you are availing a service or assistant, kindly indicate the specific service or assistance you want to avail here)

Message / Details:
(Write your message here)
`
  );
  const mailToLink = "mailto:jorgedaluzon5@gmail.com?subject=Availing%20an%20Assistant%20%2F%20Contact%20for%20hiring";

  // Dynamic Typing Loop
  useEffect(() => {
    const roles = ["Software Developer", "UI/UX Designer", "Database Administrator"];
    const currentRole = roles[roleIdx];

    const timer = setTimeout(() => {
      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);
      } else {
        setTypedText(currentRole.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);
      }

      if (!isDeleting && charIdx === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 40 : 90);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Helper to render icon inside component context
  const renderProjectIcon = (type) => {
    if (type === 'userCheck') return <UserCheck className="w-12 h-12 text-purple-400" />;
    if (type === 'armchair') return <Armchair className="w-12 h-12 text-purple-400" />;
    return <Activity className="w-12 h-12 text-purple-400" />;
  };

  const visibleCerts = showAllCerts ? certificatesList : certificatesList.slice(0, 6);

  return (
    <div className="bg-[#05020a] text-white min-h-screen font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white">

      {/* SPLASH MOTION SCREEN */}
      {showSplash && (
        <div className="fixed inset-0 z-50 bg-[#05020a] flex flex-col items-center justify-center space-y-6 transition-opacity duration-1000">
          <div className="flex items-center space-x-6 animate-pulse">
            <Code2 className="w-8 h-8 text-purple-400" />
            <Terminal className="w-8 h-8 text-purple-300" />
            <Cpu className="w-8 h-8 text-purple-400" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Welcome To My
            </h1>
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 tracking-tight">
              Portfolio Website
            </h2>
          </div>

          <div>
            <span className="px-4 py-1.5 rounded-full text-xs text-purple-300 bg-purple-900/40 border border-purple-500/30 font-mono">
              @ JRG Development
            </span>
          </div>
        </div>
      )}

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#05020a]/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
            JRG
          </div>

          <div className="flex gap-6 md:gap-8 text-xs md:text-sm font-medium">
            <a href="#home" className="text-gray-300 hover:text-purple-400 transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-purple-400 transition">About</a>
            <a href="#portfolio" className="text-gray-300 hover:text-purple-400 transition">Portfolio</a>
            <a href="#contact" className="text-gray-300 hover:text-purple-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      <div className="pt-20">

        {/* 1. HERO SECTION WITH FADE-IN */}
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariant}
          className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-b from-[#05020a] via-[#0d0722] to-[#05020a]"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition duration-500">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-purple-300/70">developer_environment.v2</span>
              </div>

              <div className="space-y-4 font-mono text-xs md:text-sm">
                <div className="text-purple-400"><span className="text-indigo-400">const</span> developer = &#123;</div>
                <div className="pl-4 text-gray-300">name: <span className="text-green-400">'Jorge Daluzon'</span>,</div>
                <div className="pl-4 text-gray-300">role: <span className="text-yellow-400">'BSIT Student & Developer'</span>,</div>
                <div className="pl-4 text-gray-300">location: <span className="text-purple-300">'San Fernando, Pampanga'</span></div>
                <div className="text-purple-400">&#125;;</div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Database className="w-5 h-5 animate-pulse" />
                    <span>Database & Systems Active</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="px-3 py-1.5 text-xs rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30 font-medium inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" /> Available for Projects
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Passionate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 border-r-2 border-purple-400 pr-1">
                  {typedText}
                </span>
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Crafting intuitive desktop applications, reservation software, healthcare management systems, and functional UI/UX experiences tailored for real-world operations.
              </p>

              <div className="flex gap-4 pt-4">
                <a href="#portfolio" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition duration-300 flex items-center gap-2 shadow-lg shadow-purple-600/30">
                  Explore Work <ArrowRight className="w-4 h-4" />
                </a>
                <a href={mailToLink} className="px-6 py-3 bg-white/5 hover:bg-purple-900/30 text-white rounded-xl text-sm font-semibold transition duration-300 border border-purple-500/30 flex items-center gap-2">
                  Contact Me <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </motion.section>

        {/* 2. ABOUT ME SECTION WITH FADE-IN */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariant}
          className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#05020a]"
        >
          <div className="max-w-5xl w-full space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">About Me</h2>
              <p className="text-xs text-purple-400 font-medium">✨ Transforming ideas into interactive software solutions ✨</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 flex flex-col md:flex-row items-center gap-10">

              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-purple-900/50 to-indigo-950/50 border-2 border-purple-500/40 flex items-center justify-center relative shrink-0 shadow-2xl shadow-purple-600/20 overflow-hidden group">
                <img 
                  src={profileImg} 
                  alt="Jorge Daluzon" 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500" 
                />
              </div>

              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold">Hello, I'm <span className="text-purple-400">Jorge Daluzon</span></h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Information Technology student based in San Fernando, Pampanga. Dedicated to building reliable desktop and web applications, designing database architectures, and engineering user-centric software interfaces.
                </p>
                <div className="pt-2">
                  <a
                    href="/assets/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-xs font-semibold rounded-lg transition duration-300 shadow-md"
                  >
                    <Download className="w-4 h-4" /> Download Resume
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-purple-500/20 flex items-center gap-5">
                <div className="p-3 bg-purple-900/40 rounded-lg text-purple-400">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">13</div>
                  <div className="text-xs text-gray-400">Certificates Earned</div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-purple-500/20 flex items-center gap-5">
                <div className="p-3 bg-purple-900/40 rounded-lg text-purple-400">
                  <FolderCode className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">7</div>
                  <div className="text-xs text-gray-400">Total Projects</div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-purple-500/20 flex items-center gap-5">
                <div className="p-3 bg-purple-900/40 rounded-lg text-purple-400">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">2+</div>
                  <div className="text-xs text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. PORTFOLIO SHOWCASE WITH FADE-IN */}
        <motion.section
          id="portfolio"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariant}
          className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#05020a] via-[#0b061d] to-[#05020a]"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">Portfolio Showcase</h2>
              <p className="text-xs text-gray-400">Explore technical software, web designs, continuous certifications, and development toolkits.</p>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex justify-center gap-2 bg-white/5 p-1.5 rounded-xl max-w-xl mx-auto border border-purple-500/30">
              {[
                { key: 'projects', label: 'Systems' },
                { key: 'webdesign', label: 'Web Design' },
                { key: 'services', label: 'Services' },
                { key: 'certificates', label: 'Certificates' },
                { key: 'tech', label: 'Tech Stack' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition ${activeTab === tab.key ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Systems Projects Tab */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(projectData).map(([key, proj]) => (
                  <div key={key} className="bg-white/5 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition duration-300 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="h-40 bg-purple-950/40 rounded-lg flex items-center justify-center border border-purple-500/10 overflow-hidden">
                        {renderProjectIcon(proj.iconType)}
                      </div>
                      <h3 className="font-bold text-base">{proj.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-3">{proj.desc}</p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="w-full py-2 bg-purple-600/30 hover:bg-purple-600/60 text-purple-200 text-xs font-medium rounded-lg border border-purple-500/40 transition"
                    >
                      Read More
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Web Design Projects Tab */}
            {activeTab === 'webdesign' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {webDesignData.map((web) => (
                  <div key={web.id} className="bg-white/5 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition duration-300 p-5 space-y-4">
                    <div className="h-52 bg-purple-950/40 rounded-lg border border-purple-500/10 overflow-hidden">
                      <img src={web.image} alt={web.title} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-base text-purple-200">{web.title}</h3>
                      <p className="text-xs text-gray-400">{web.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {web.tech.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-purple-900/40 border border-purple-500/30 text-purple-300 text-[10px] rounded-md font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesData.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/5 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition duration-300 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="h-40 bg-purple-950/40 rounded-lg flex items-center justify-center border border-purple-500/10 overflow-hidden text-purple-400 text-4xl">
                        {service.icon}
                      </div>

                      <h3 className="font-bold text-base text-purple-200">{service.title}</h3>

                      <p className="text-xs text-gray-400 leading-relaxed">
                        {service.briefDesc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedServiceCategory(service)}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-purple-600/20 transition duration-300 flex items-center justify-center gap-1"
                      >
                        View More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certificates Tab with Show More / Less */}
            {activeTab === 'certificates' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {visibleCerts.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="bg-white/5 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:scale-[1.02] cursor-pointer transition duration-300 p-4 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="h-44 bg-purple-950/40 rounded-lg border border-purple-500/10 overflow-hidden">
                          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h4 className="font-bold text-sm text-purple-200">{cert.title}</h4>
                        <span className={`inline-block px-2 py-0.5 text-[10px] rounded font-semibold ${cert.issuer === 'IBM' ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30' : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                          }`}>
                          Issued by {cert.issuer}
                        </span>
                        <p className="text-xs text-gray-400 line-clamp-2">{cert.desc}</p>
                      </div>
                      <div className="pt-2 text-right">
                        <span className="text-[10px] text-purple-300 underline font-mono">View details →</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SHOW MORE / SHOW LESS BUTTON */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowAllCerts(!showAllCerts)}
                    className="px-6 py-2.5 bg-purple-600/40 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-semibold rounded-xl border border-purple-500/50 transition duration-300"
                  >
                    {showAllCerts ? 'Show Less' : `Show More (${certificatesList.length - 6} More Certificates)`}
                  </button>
                </div>
              </div>
            )}

            {/* Tech Stack Tab */}
            {activeTab === 'tech' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl border border-purple-500/20 flex flex-col items-center gap-2">
                    <i className={`${tech.icon} text-2xl`} />
                    <span className="text-xs font-semibold">{tech.name}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </motion.section>

        {/* 4. CONTACT SECTION WITH DIRECT CLICKABLE GMAIL */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariant}
          className="min-h-screen px-6 py-20 bg-[#05020a]"
        >
          <div className="max-w-4xl mx-auto space-y-12">

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">Get In Touch</h2>
              <p className="text-xs text-gray-400">Click below to send a direct message or hire via Gmail.</p>
            </div>

            {/* Direct Gmail Contact Card */}
            <div className="bg-white/5 p-8 rounded-2xl border border-purple-500/30 shadow-2xl space-y-6 text-center">
              <div className="flex items-center justify-center space-x-3 text-purple-300">
                <MessageSquare className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Let's Connect</h3>
              </div>

              <p className="text-xs md:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                I am available for software development, database administrative roles, and technical assistant tasks. Click my official email below to open Gmail directly with a pre-formatted hiring request.
              </p>

              {/* Directly Clickable Gmail Button */}
              <div className="pt-4 flex justify-center">
                <a
                  href={mailToLink}
                  className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-6 py-4 rounded-xl border border-purple-400/40 flex items-center space-x-4 shadow-xl shadow-purple-600/30 transition duration-300 transform hover:-translate-y-1"
                >
                  <Mail className="w-6 h-6 text-white group-hover:scale-110 transition" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-mono text-purple-200">Official Gmail Contact</div>
                    <div className="text-sm md:text-base font-extrabold text-white">jorgedaluzon5@gmail.com</div>
                  </div>
                </a>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>San Fernando, Pampanga, Philippines</span>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="bg-white/5 p-6 rounded-2xl border border-purple-500/30 space-y-6">
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Share2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Social Networks</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a href="https://www.facebook.com/sidddd18" target="_blank" rel="noreferrer" className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:bg-purple-900/30 transition flex items-center space-x-3 group">
                  <i className="fa-brands fa-facebook text-xl text-blue-500 group-hover:scale-110 transition" />
                  <span className="text-xs font-semibold">Facebook</span>
                </a>

                <a href="https://github.com/cookie2006-png" target="_blank" rel="noreferrer" className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:bg-purple-900/30 transition flex items-center space-x-3 group">
                  <i className="fa-brands fa-github text-xl text-purple-300 group-hover:scale-110 transition" />
                  <span className="text-xs font-semibold">GitHub</span>
                </a>

                <a href="https://www.linkedin.com/in/jorgedaluzon186/" target="_blank" rel="noreferrer" className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:bg-purple-900/30 transition flex items-center space-x-3 group">
                  <i className="fa-brands fa-linkedin text-xl text-blue-400 group-hover:scale-110 transition" />
                  <span className="text-xs font-semibold">LinkedIn</span>
                </a>

                <a href="https://www.instagram.com/shttxx.kokiss_/" target="_blank" rel="noreferrer" className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:bg-purple-900/30 transition flex items-center space-x-3 group">
                  <i className="fa-brands fa-instagram text-xl text-pink-500 group-hover:scale-110 transition" />
                  <span className="text-xs font-semibold">Instagram</span>
                </a>
              </div>
            </div>

          </div>
        </motion.section>

      </div>

      {/* SUB-SERVICES CONTAINER / MODAL */}
      {selectedServiceCategory && (
        <div className="fixed inset-0 z-50 bg-[#05020a]/90 backdrop-blur-md overflow-y-auto p-4 md:p-8 flex items-center justify-center">
          <div className="bg-[#0c061a] border border-purple-500/40 rounded-2xl max-w-4xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl my-8">
            <button
              onClick={() => setSelectedServiceCategory(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 border border-purple-500/20 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-500/30">
                  {selectedServiceCategory.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-purple-200">{selectedServiceCategory.title}</h3>
                  <p className="text-xs text-gray-400">{selectedServiceCategory.fullDesc}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300">
                Available Specific Services
              </h4>

              {/* SEPARATED CONTAINERS FOR EACH SUB-SERVICE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedServiceCategory.subServices.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white/5 rounded-xl border border-purple-500/20 p-4 flex flex-col justify-between space-y-4 hover:border-purple-400 transition"
                  >
                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-purple-100">{sub.title}</h5>
                      <p className="text-xs text-gray-400 leading-relaxed">{sub.desc}</p>
                    </div>

                    <a
                      href={`mailto:jorgedaluzon5@gmail.com?subject=Availing%20Service%3A%20${encodeURIComponent(sub.title)}&body=Hi%20Jorge%2C%20I%20am%20interested%20in%20availing%20your%20service%3A%20${encodeURIComponent(sub.title)}.`}
                      className="w-full text-center py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-md transition duration-300 block"
                    >
                      Avail Service
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedServiceCategory(null)}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg text-gray-300 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#05020a] overflow-y-auto">
          <div className="p-6 md:p-12 min-h-screen flex flex-col justify-between max-w-7xl mx-auto space-y-8">
            <div>
              <button
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-purple-500/30 hover:bg-purple-900/40 text-xs font-semibold transition"
              >
                <ArrowLeft className="w-4 h-4 text-purple-400" /> Back to Portfolio
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-purple-300">{selectedProject.title}</h2>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.desc}</p>

                <div className="space-y-3 pt-4 border-t border-purple-500/20">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-64 bg-white/5 rounded-2xl border border-purple-500/30 flex items-center justify-center overflow-hidden">
                  <ImageIcon className="w-20 h-20 text-purple-400" />
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-purple-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside">
                    {selectedProject.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c061a] p-6 rounded-2xl border border-purple-500/40 max-w-md w-full space-y-4 text-center relative">
            <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="h-48 bg-purple-950/40 rounded-lg overflow-hidden border border-purple-500/20">
              <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-purple-200">{selectedCert.title}</h3>
            <span className="inline-block px-2.5 py-1 text-xs rounded bg-purple-900/40 text-purple-300 border border-purple-500/30">
              Issued by {selectedCert.issuer}
            </span>
            <p className="text-xs text-gray-300">{selectedCert.desc}</p>
            <button onClick={() => setSelectedCert(null)} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-xs font-semibold rounded-lg transition">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}