import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Code2 } from "lucide-react";
import emailjs from "emailjs-com";

const ACCENT = "text-blue-400";

const DATA = {
  name: "SIVABAKKIYAN I",
  role: "AI & ML Student | 3rd Year",
  tagline: "Building intelligent systems with AI/ML that impact real lives.",
  avatar: "/my photo.jpg",
  location: "Coimbatore, India",
  email: "sivabakkiyan22@gmail.com",
  phone: "7397152006",
  socials: {
    github: "https://github.com/Sivabakkiyan",
    linkedin: "https://linkedin.com/in/sivabakkiyan-i-2b54a0294",
  },
  about: `Hi, I’m Sivabakkiyan, a 3rd-year Artificial Intelligence and Machine Learning student at Sri Shakthi Institute of Engineering and Technology, Coimbatore, currently holding a CGPA of 8.35. I completed my schooling at SRMV Swami Shivananda Higher Secondary School, graduating with 83% in 12th standard.

I am deeply passionate about exploring the intersection of technology and intelligence, with a keen interest in Machine Learning, Computer Vision, and Natural Language Processing. Beyond academics, I enjoy working on real-world projects, from building intelligent chatbots to designing AI-powered solutions that create impact.

I strongly believe in learning by doing — whether it’s coding in Python, experimenting with data, or building small innovations that solve big problems. With a curious mindset, I’m always looking for opportunities to explore, experiment, and excel.

My vision is to grow into an AI engineer who builds technology that empowers people and contributes to a smarter, more connected world.`,
  skills: [
    { name: "Python" },
    { name: "Java" },
    { name: "C" },
    { name: "SQL / NoSQL" },
    { name: "JavaScript (HTML, CSS)" },
    { name: "TensorFlow / PyTorch" },
    { name: "OpenCV" },
    { name: "NLP / CV" },
    { name: "Docker / Linux" },
  ],
  projects: [
    {
      title: "Gunshot Detection",
      summary: "Real-time detection system using RNN and MFCC with 91% accuracy.",
      details: "Developed a real-time gunshot detection system using Recurrent Neural Networks (RNNs) and MFCC-based feature extraction. The model achieved 91% accuracy in distinguishing gunshot sounds from background noise. Designed with a microphone array and real-time alert interface, the system is intended for public safety, law enforcement, and surveillance applications.",
      img: "/gunshot detection image .png",
      tags: ["Python", "RNN", "MFCC", "Audio Processing"],
    },
    {
      title: "AI Based Handwriting Notes Generator",
      summary: "AI tool converting text/speech into realistic handwritten notes.",
      details: "Built an AI-powered tool that converts typed or spoken text into realistic human-like handwritten notes. The system supports customizations such as font style, color, spacing, and paper type (ruled, grid, plain), and generates outputs in image/PDF formats. Implemented using Python (OpenCV, PIL, PyMuPDF, SpeechRecognition), it bridges the gap between traditional handwriting aesthetics and digital convenience, making it especially useful for students and educators.",
      img: "/handwriting.png",
      tags: ["Python", "OpenCV", "DL", "Image Processing"],
    },
    {
      title: "Console Dictionary",
      summary: "Command-line dictionary with authentication & leaderboard.",
      details: "Developed a command-line dictionary application with features like word search, addition, deletion, and update, supporting user authentication for personalized experience .Implemented a leaderboard to track and display top users, enhancing user engagement and  learning motivation.",
      img: "/dictionary console.png",
      tags: ["Python", "SQL", "File Handling"],
    },
  ],
  certifications: [
    {
      name: "Cloud Computing – NPTEL",
      link: "/Cloud Computing (1).pdf",
      description: "Certificate for completion of Cloud Computing course by NPTEL.",
    },
    {
      name: "Introduction to Large Language Models – NPTEL",
      link: "/llm.pdf",
      description: "Certificate for Introduction to Large Language Models course by NPTEL.",
    },
  ],
  achievements: [
    {
      title: "1st Prize – Prompt Engineering Competition at NGP College, Coimbatore",
      certificate:"/prompt forgge ngp.jpg",
    },
    {
      title: "Workshop on Prompt Engineering, Sri Shakthi Institute of Engineering and Technology",
      certificate: "/certificate-kalam-workshop.jpg"
    },
    {
      title: "Workshop on unleashing the power of generative AI and intelligent agents: transforming the future, NGP College",
      certificate: "/workshop-ngp.jpg"
    },
  ],
};

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white text-slate-900 rounded-2xl p-8 max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-red-600 hover:text-red-800"
          aria-label="Close"
        >
          &times;
        </button>
        <img src={project.img} alt={project.title} className="w-32 h-32 mx-auto mb-4 rounded-lg" />
        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        <p className="mb-4 opacity-80">{project.details}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs border border-blue-400 text-blue-600 rounded px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white text-slate-900 rounded-2xl p-6 max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-red-600 hover:text-red-800"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4">{certificate.name || certificate.title}</h3>
        {certificate.description && <p className="mb-4">{certificate.description}</p>}
        <a href={certificate.link || certificate.certificate} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          <img src={certificate.link || certificate.certificate} alt={certificate.name || certificate.title} className="w-full h-auto rounded-md" />
          Open Certificate
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ p, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-900 rounded-2xl p-5 shadow-lg hover:shadow-blue-500/40 transition relative overflow-hidden"
      onClick={onClick}
    >
      <img src={p.img} alt={p.title} className="w-16 h-16 mb-3" />
      <h3 className={`text-xl font-bold mb-2 ${ACCENT} cursor-pointer hover:underline`}>
        {p.title}
      </h3>
      <p className="opacity-80 mb-3">{p.summary}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t, i) => (
          <span key={i} className="text-xs border border-blue-400 text-blue-400 rounded px-2 py-1">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg px-4 py-2 flex items-center justify-center min-w-[130px] ${className}`}
    >
      {children}
    </button>
  );
}

// -- MODERN SKILLS SECTION CARD DESIGN (NO CIRCLES, NO PERCENTAGES) --
function SkillsSection() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className={`text-2xl font-bold mb-8 ${ACCENT}`}>Skills</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {DATA.skills.map((skill, idx) => (
          <div
            key={idx}
            className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/20 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg hover:scale-105 hover:shadow-blue-400/30 transition-transform duration-300 backdrop-blur"
          >
            <div className="bg-blue-500/10 rounded-full p-3 mb-3 group-hover:bg-blue-500/20 transition">
            
            </div>
            <span className="text-lg text-blue-300 font-semibold tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// -------- MAIN APP --------

export default function Portfolio() {
  const [modalProject, setModalProject] = useState(null);
  const [modalCertificate, setModalCertificate] = useState(null);
  const form = useRef();

  useEffect(() => {
    emailjs.init("BTj3IJu6NrJVyDs68");
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_yozyaar", "template_lpex21w", form.current)
      .then(
        () => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800 flex justify-between items-center px-8 h-16">
        <h1 className={`font-bold tracking-tight ${ACCENT}`}>{DATA.name}</h1>
        <nav className="flex gap-6 items-center text-sm">
          <a href="#about" className="hover:text-blue-400">About</a>
          <a href="#skills" className="hover:text-blue-400">Skills</a>
          <a href="#projects" className="hover:text-blue-400">Projects</a>
          <a href="#achievements" className="hover:text-blue-400">Achievements / Workshops</a>
          <a href="#contact" className="hover:text-blue-400">Contact</a>
          <a href={DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-blue-400" title="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href={DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 ml-2" title="Resume">
            Resume
          </a>
        </nav>
      </header>

      <section className="pt-28 pb-20 text-center">
        <motion.img
          src={DATA.avatar}
          className="w-48 h-48 mx-auto rounded-full border-4 border-blue-400 shadow-[0_0_20px_#3b82f6]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          alt="Avatar"
        />
        <h2 className="text-3xl font-bold mt-4">{DATA.role}</h2>
        <p className="max-w-2xl mx-auto mt-4 opacity-80">{DATA.tagline}</p>
      </section>

      <section id="about" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className={`text-2xl font-bold mb-4 ${ACCENT}`}>About Me</h2>
        <p className="opacity-90 leading-relaxed">{DATA.about}</p>
      </section>

      {/* --------- MODERN SKILLS SECTION --------- */}
      <SkillsSection />

      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className={`text-2xl font-bold mb-6 ${ACCENT}`}>Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {DATA.projects.map((p, i) => (
            <ProjectCard key={i} p={p} onClick={() => setModalProject(p)} />
          ))}
        </div>
      </section>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
      <CertificateModal certificate={modalCertificate} onClose={() => setModalCertificate(null)} />

      <section id="achievements" className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${ACCENT}`}>Achievements / Workshops</h2>
          {DATA.achievements.map((a, i) => (
            <div key={i} className="flex justify-between items-center gap-6 border-b border-slate-700 pb-3">
              <span>{a.title}</span>
              {a.certificate && (
                <Button onClick={() => setModalCertificate(a)}>View Certificate</Button>
              )}
            </div>
          ))}
        </div>
        <div>
          <h2 className={`text-2xl font-bold mb-4 ${ACCENT}`}>Certifications</h2>
          {DATA.certifications.map((c, i) => (
            <div key={i} className="flex justify-between items-center gap-6 border-b border-slate-700 pb-3">
              <span>{c.name}</span>
              <Button onClick={() => setModalCertificate(c)}>View Certificate</Button>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-4xl mx-auto px-6 py-20 text-center relative">
        <h2 className={`text-2xl font-bold mb-6 ${ACCENT}`}>Get in Touch</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-slate-900 rounded-2xl p-6 shadow-[0_0_20px_#3b82f6] space-y-4"
        >
          <input
            name="user_name"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-slate-800 border border-blue-500/50"
            required
          />
          <input
            name="user_email"
            placeholder="Your Email"
            type="email"
            className="w-full p-3 rounded bg-slate-800 border border-blue-500/50"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="w-full p-3 rounded bg-slate-800 border border-blue-500/50 min-h-[120px]"
            required
          />
          <Button type="submit">
            Send <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </section>

      <footer className="py-8 text-center opacity-70">
        © {new Date().getFullYear()} {DATA.name} | Built with ⚡
      </footer>
    </div>
  );
}
