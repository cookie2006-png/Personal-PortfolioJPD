import React, { useState, useEffect } from 'react';
import { 
  Code2, Terminal, Cpu, Database, ShieldCheck, ArrowRight, Mail, 
  User, Download, Award, FolderCode, Calendar, UserCheck, 
  Armchair, Activity, MessageSquare, MapPin, Send, Share2, 
  ArrowLeft, Image as ImageIcon, X 
} from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import emailjs from '@emailjs/browser';
import { db } from './firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

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

export default function App() {
  // --- UI & Modal States ---
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // --- Form & Email States ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  // --- Typing Effect State ---
  const [typedText, setTypedText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Form Submission Handler (Firebase + EmailJS) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      // 1. Save submission to Firebase Firestore
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
      });

      // 2. Send Email via EmailJS
      await emailjs.send(
        'service_m0dm1ob',
        'template_1yevc7c',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'coWQOpAiegkx7Z6kb'
      );

      setStatus({
        type: 'success',
        text: 'Message sent successfully! Check your inbox soon.',
      });

      // Clear Form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        text: 'Failed to send message. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

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
                <a href="#contact" className="px-6 py-3 bg-white/5 hover:bg-purple-900/30 text-white rounded-xl text-sm font-semibold transition duration-300 border border-purple-500/30 flex items-center gap-2">
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
              
              <div className="w-44 h-44 rounded-2xl bg-gradient-to-br from-purple-900/50 to-indigo-950/50 border border-purple-500/30 flex items-center justify-center relative shrink-0 shadow-inner overflow-hidden">
                <User className="w-20 h-20 text-purple-400" />
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
                  <div className="text-2xl font-extrabold text-white">8</div>
                  <div className="text-xs text-gray-400">Certificates Earned</div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-purple-500/20 flex items-center gap-5">
                <div className="p-3 bg-purple-900/40 rounded-lg text-purple-400">
                  <FolderCode className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">3</div>
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
              <p className="text-xs text-gray-400">Explore technical projects, continuous certifications, and development toolkits.</p>
            </div>

            <div className="flex justify-center gap-2 bg-white/5 p-1.5 rounded-xl max-w-md mx-auto border border-purple-500/30">
              {['projects', 'certificates', 'tech'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition ${
                    activeTab === tab ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'tech' ? 'Tech Stack' : tab}
                </button>
              ))}
            </div>

            {/* Projects Tab */}
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

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                  <div
                    key={id}
                    onClick={() => setSelectedCert(id)}
                    className="bg-white/5 p-5 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:scale-105 cursor-pointer transition duration-300 text-center space-y-3 group"
                  >
                    <Award className="w-10 h-10 text-purple-400 mx-auto group-hover:text-purple-300" />
                    <h4 className="font-bold text-xs">Certificate #{id}</h4>
                    <p className="text-[10px] text-gray-400">Click to view credential details</p>
                  </div>
                ))}
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

        {/* 4. CONTACT SECTION WITH FADE-IN */}
        <motion.section 
          id="contact" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariant}
          className="min-h-screen px-6 py-20 bg-[#05020a]"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">Get In Touch</h2>
              <p className="text-xs text-gray-400">Feel free to leave a message or connect through my official channels.</p>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-purple-500/30 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl">
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-purple-300">
                  <MessageSquare className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Let's Connect</h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  I am open to discussing software development projects, database roles, and collaborations. Send a message!
                </p>

                <div className="space-y-4 pt-2">
                  <div className="bg-white/5 p-3 rounded-lg border border-purple-500/20 flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-gray-300">jorgedaluzon5@gmail.com</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-purple-500/20 flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-gray-300">San Fernando, Pampanga, Philippines</span>
                  </div>
                </div>
              </div>

              {/* Working Email Form */}
              <div>
                {status.text && (
                  <div className={`p-3 rounded-lg text-xs mb-4 text-center ${
                    status.type === 'success' 
                      ? 'bg-green-900/40 text-green-300 border border-green-500/30' 
                      : 'bg-red-900/40 text-red-300 border border-red-500/30'
                  }`}>
                    {status.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      placeholder="Your name" 
                      className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-400 text-white" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="Your email address" 
                      className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-400 text-white" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1">Message</label>
                    <textarea 
                      rows={3} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required 
                      placeholder="Write your message here..." 
                      className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-400 text-white" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/50 text-white text-xs font-semibold rounded-lg transition duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

            </div>

            {/* Social Links Box */}
            <div className="bg-white/5 p-6 rounded-2xl border border-purple-500/30 space-y-6">
              <div className="flex items-center space-x-3">
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
          <div className="bg-white/5 p-8 rounded-2xl border border-purple-500/40 max-w-md w-full space-y-4 text-center relative">
            <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <Award className="w-16 h-16 text-purple-400 mx-auto" />
            <h3 className="text-xl font-bold">Certificate Credential #{selectedCert}</h3>
            <p className="text-xs text-gray-300">Verified certification in software engineering, UI/UX design, and database administration.</p>
            <button onClick={() => setSelectedCert(null)} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-xs font-semibold rounded-lg transition">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}