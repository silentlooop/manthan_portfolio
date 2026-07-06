import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import type { Variants } from "framer-motion";

// --- NAVIGATION COMPONENT ---
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const goToWorkSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    window.location.href = "/#work";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 md:px-6 md:py-4 bg-[#111111] border-b border-white/5 transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="text-white font-sfmono text-base md:text-lg font-bold tracking-tight hover:opacity-80 transition-opacity z-50 relative">
          SiL3nTL00p
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-sfmono text-gray-400">
          <a href="/#work" onClick={goToWorkSection} className="hover:text-white transition-colors cursor-pointer">
            work
          </a>

          <a href="/blogs" className="hover:text-white transition-colors cursor-pointer">
            blogs
          </a>

          <Link to="/shaped" className="hover:text-white transition-colors">
            ~/me
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-xl z-50 relative focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "≡"}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#111111] z-40 flex flex-col justify-start pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-5">
              <motion.a
                custom={0}
                variants={linkVariants}
                href="/#work"
                onClick={goToWorkSection}
                className="text-xl font-semibold text-gray-500 tracking-tight font-sfmono"
              >
                work
              </motion.a>
              <motion.a
                custom={1}
                variants={linkVariants}
                href="/blogs"
                className="text-xl font-semibold text-gray-500 tracking-tight font-sfmono"
                onClick={() => setIsOpen(false)}
              >
                blogs
              </motion.a>
              <motion.a
                custom={2}
                variants={linkVariants}
                href="/shaped"
                className="text-xl font-semibold text-gray-500 tracking-tight font-sfmono"
                onClick={() => setIsOpen(false)}
              >
                ~/me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


// --- FONT STYLES ---
const monoFont = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontWeight: 400,
  letterSpacing: '-0.02em'
};

const displayFont = {
  fontFamily: '"Neue Haas Unica", "IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: 700,
};

// --- HELPERS ---
function ProjectMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <h3 className="text-[13px] md:text-[14px] text-[#555] uppercase tracking-[0.05em] select-none" style={monoFont}>
        {label}
      </h3>
      <p className="text-[#EBEBF5] text-[15px] md:text-[16px] leading-snug" style={monoFont}>
        {value}
      </p>
    </div>
  );
}

// --- ANIMATION VARIANTS ---

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const menuVariants: Variants = {
  closed: { opacity: 0, y: -100 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.4 },
  }),
};

function TechBadge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 text-[12px] text-[#fde047] border border-[#fde047]/20 bg-[#fde047]/5" style={monoFont}>
      {text}
    </span>
  );
}


// --- MAIN COMPONENT ---
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  // @ts-ignore - Assuming 'video' might exist on your project type now
  const project = projects.find((p) => p.slug === slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white selection:bg-[#fde047]/30">

      {/* --- NAVBAR --- */}
      <NavBar />

      <main className="pt-24 pb-20 px-5 md:px-8 max-w-[1600px] mx-auto">

        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24 mt-12">

          <div className="md:col-span-8 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[12vw] md:text-[8rem] font-bold leading-none tracking-tighter text-[#EBEBF5]"
              style={displayFont}
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[16px] md:text-[18px] text-[#999] max-w-2xl leading-relaxed"
              style={monoFont}
            >
              {project.subtitle} <br />
              <span className="text-[#666]">{project.category}</span>
            </motion.p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8 border-l border-[#333] pl-8 md:pl-12">
            <ProjectMeta label="Role" value={project.role} />
            <ProjectMeta label="Year" value={project.year} />
            <ProjectMeta label="Type" value={project.type} />

            <div className="space-y-2 col-span-2">
              <h3 className="text-[13px] md:text-[14px] text-[#555] uppercase tracking-[0.05em] select-none" style={monoFont}>// Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} text={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN MEDIA (VIDEO OR IMAGE) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative w-full aspect-video md:h-[70vh] bg-neutral-900 border border-white/5 mb-24 overflow-hidden"
        >
          {/* LOGIC: Check if video exists, otherwise show image */}
          {/* @ts-ignore - Ignoring type check for 'video' field if not yet added to interface */}
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-40"></div>
        </motion.div>

        {/* --- DEEP DIVE CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

          {/* Left: Sticky Sidebar */}
          <div className="md:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-8">

              {/* BUTTON CODE */}
              <a
                // @ts-ignore
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full py-4 border-t border-b border-[#333] hover:border-[#fde047] transition-colors"
              >
                <div className="flex items-center justify-between" style={monoFont}>
                  <span className="text-[13px] uppercase tracking-widest text-[#7a7770] group-hover:text-[#fde047]">
                    View Source
                  </span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform group-hover:text-[#fde047]">
                    ↗
                  </span>
                </div>
              </a>

              <p className="text-[14px] md:text-[15px] text-[#888] leading-relaxed" style={monoFont}>
                {project.description}
              </p>
            </div>
          </div>

          {/* Narrative */}
          <div className="md:col-span-8 space-y-16">
            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              <motion.h2 variants={fadeInUp} className="text-[22px] font-bold text-[#EBEBF5]" style={monoFont}>The Challenge</motion.h2>
              <motion.p variants={fadeInUp} className="text-[16px] md:text-[17px] text-[#999] leading-relaxed" style={monoFont}>{project.challenge}</motion.p>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              <motion.h2 variants={fadeInUp} className="text-[22px] font-bold text-[#EBEBF5]" style={monoFont}>The Solution</motion.h2>
              <motion.p variants={fadeInUp} className="text-[16px] md:text-[17px] text-[#999] leading-relaxed" style={monoFont}>{project.solution}</motion.p>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
              <motion.h2 variants={fadeInUp} className="text-[22px] font-bold text-[#EBEBF5]" style={monoFont}>Impact</motion.h2>
              <motion.p variants={fadeInUp} className="text-[16px] md:text-[17px] text-[#999] leading-relaxed" style={monoFont}>{project.impact}</motion.p>
            </motion.section>
          </div>
        </div>

        {/* --- NEXT PROJECT --- */}
        <div className="mt-40 border-t border-[#333] pt-12 flex justify-between items-end group cursor-pointer">
          <div>
            <p className="text-[13px] text-[#7a7770] uppercase mb-2" style={monoFont}>Next Project</p>
            {/* @ts-ignore */}
            <Link to={`/projects/${project.nextProject}`} className="text-3xl md:text-5xl font-bold text-white group-hover:text-[#fde047] transition-colors tracking-tight" style={displayFont}>
              {/* @ts-ignore */}
              {project.nextProjectTitle}
            </Link>
          </div>
          <span className="text-2xl text-[#666] group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>

      </main>
    </div>
  );
}