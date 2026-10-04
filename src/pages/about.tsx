"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import { SectionPrompt, SectionReveal } from "../components/ui/terminal-effects";
import { TerminalHint } from "../components/ui/terminal-hint";

// --- HELPERS ---

// Terminal-style Experience Section
function TerminalExperience() {
    const [activeType, setActiveType] = useState<"college" | "industry">("college");
    const experiences = [
        {
            type: "college" as const,
            company: "AICommunity IITB",
            period: "2025 - 2026",
            role: "Junior Developer",
            desc: "Working with a small team of 8 members to build AI products for insti and freelance projects. Focusing on NLP pipelines and generative models."
        },
        {
            type: "college" as const,
            company: "Techfest",
            period: "2025 - 2026",
            role: "Graphic Designer",
            desc: "Supported the design team with social media graphics, print materials, and visual identity systems for Asia's largest Science and Technology festival."
        }
    ];

    const visibleExperiences = experiences.filter((experience) => experience.type === activeType);

    return (
        <div className="w-full max-w-5xl mx-auto rounded-md border border-white/10 bg-[#141414] font-mono text-[14px] text-gray-300 shadow-2xl shadow-black/20 md:text-[15px]">
            <div role="tablist" aria-label="Experience types" className="flex min-w-0 items-end gap-3 border-b border-white/10 bg-[#111111] px-3 pt-2 md:px-5">
                <div className="flex shrink-0 items-center gap-2 px-2 pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                </div>
                {(["college", "industry"] as const).map((type) => (
                    <button
                        key={type}
                        type="button"
                        role="tab"
                        aria-selected={activeType === type}
                        onClick={() => setActiveType(type)}
                        className={`relative z-10 flex min-w-0 flex-1 items-center rounded-t-md border-x border-t px-3 py-2.5 text-left text-xs capitalize transition-colors md:px-5 ${activeType === type ? "-mb-px border-white/10 bg-[#181818] text-zinc-300" : "border-transparent bg-[#111111] text-zinc-600 hover:text-zinc-400"}`}
                    >
                        <span className="truncate">{type}</span>
                        <TerminalHint text={type === "college" ? "$ make learn && make ship" : "$ hire manthan --vacancy=open"} placement="below-start" />
                    </button>
                ))}
            </div>
            <div className="space-y-6 px-5 pb-4 pt-5 sm:px-7 sm:pb-5 sm:pt-6 md:px-10 md:pb-6 md:pt-8">
                {visibleExperiences.length > 0 ? visibleExperiences.map((exp, idx) => (
                    <div key={exp.company}>
                        <div className="flex flex-wrap items-center gap-2 leading-relaxed">
                            <span className="text-gray-500">$</span>
                            <span className="text-gray-400">cat</span>
                            <span className="break-all text-white">./experience/{exp.company.replace(/\s/g, '').toLowerCase()}</span>
                            <span className="shrink-0 text-xs text-gray-700">[{exp.period}]</span>
                        </div>
                        <div className="mt-2 break-words pl-6 leading-relaxed">
                            <span className="text-gray-600">role:</span> <span className="text-white">{exp.role}</span><br />
                            <span className="text-gray-600">desc:</span> <span className="text-gray-400 break-words">{exp.desc}</span>
                        </div>
                        {idx !== visibleExperiences.length - 1 && <div className="mt-6 border-b border-white/5" />}
                    </div>
                )) : (
                    <div className="flex items-center gap-2 py-3 font-mono text-sm text-zinc-500">
                        <span className="text-gray-500">$</span>
                        <span>looking for one...</span>
                    </div>
                )}
                <div className="flex items-center gap-2 border-t border-white/5 pt-5 text-xs text-zinc-600">
                    <span>status:</span>
                    <span className="text-[#fde047]">online</span>
                    <span className="ml-auto">process: experience_loaded</span>
                </div>
            </div>
        </div>
    );
}

function ContactTerminal() {
    return (
        <div className="px-3 pb-6 pt-5 sm:px-5 sm:pb-8 sm:pt-7 md:px-12 md:pb-12 md:pt-10">
            <div className="max-w-4xl space-y-5 font-mono">
                <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-500 sm:text-sm">
                    <span className="text-zinc-600">manthan@portfolio:~$</span>
                    <span className="text-zinc-300 truncate">cat contact.txt</span>
                </div>
                <div className="space-y-3 text-[13px] leading-6 text-gray-400 sm:text-[15px] md:text-base">
                    <p className="text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl break-words">Let&apos;s connect.</p>
                    <p className="break-words sm:text-base">Open channels for thoughtful work, curious conversations, and ambitious ideas.</p>
                </div>
                <div className="grid gap-2 border-t border-white/5 pt-4 sm:gap-3 sm:border-t sm:pt-6 sm:grid-cols-2">
                    <a
                        href="https://www.linkedin.com/in/manthan-p-6457b3313"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative rounded-md border border-white/5 bg-[#111111] px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-[#181818] sm:px-4 sm:py-3"
                    >
                        <TerminalHint text="$ open ./me --in-a-blazer" placement="below-start" />
                        <span className="block text-[10px] text-zinc-600 sm:text-xs">network</span>
                        <span className="mt-0.5 block text-xs text-gray-300 group-hover:text-white sm:text-sm">linkedin <span className="text-zinc-600">↗</span></span>
                    </a>
                    <a
                        href="https://x.com/null_rejected"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative rounded-md border border-white/5 bg-[#111111] px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-[#181818] sm:px-4 sm:py-3"
                    >
                        <TerminalHint text="$ tail -f ./unfiltered-thoughts" placement="below-start" />
                        <span className="block text-[10px] text-zinc-600 sm:text-xs">signal</span>
                        <span className="mt-0.5 block text-xs text-gray-300 group-hover:text-white sm:text-sm">twitter <span className="text-zinc-600">↗</span></span>
                    </a>
                </div>
                <div className="border-t border-white/5 pt-4 sm:pt-6">
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-zinc-600 sm:text-xs">development</p>
                    <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                        <a
                            href="https://github.com/silentlooop"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative rounded-md border border-white/5 bg-[#111111] px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-[#181818] sm:px-4 sm:py-3"
                        >
                            <TerminalHint text="$ git log --since=3am" placement="below-start" />
                            <span className="block text-[10px] text-zinc-600 sm:text-xs">source</span>
                            <span className="mt-0.5 block text-xs text-gray-300 group-hover:text-white sm:text-sm">github <span className="text-zinc-600">↗</span></span>
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-4 text-[10px] text-zinc-600 sm:text-xs">
                    <span>status:</span>
                    <span className="text-[#fde047]">online</span>
                    <span className="ml-auto truncate">process: contact_ready</span>
                </div>
            </div>
        </div>
    );
}

function TechLabTerminal() {
    return (
        <div className="px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-8 md:px-12 md:pb-12 md:pt-10">
            <div className="max-w-4xl space-y-7 font-mono">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span className="text-zinc-600">manthan@portfolio:~$</span>
                    <span className="text-zinc-300">cat tech-lab.txt</span>
                </div>
                <div className="space-y-3 text-[15px] leading-7 text-gray-400 md:text-base">
                    <p className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl break-words">The tech lab.</p>
                    <p className="break-words sm:text-base">Places where I practice, experiment, and keep the feedback loop moving.</p>
                </div>
                <div className="grid gap-3 border-t border-white/5 pt-6 sm:grid-cols-2">
                    <a
                        href="https://leetcode.com/u/silentlooop/"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative rounded-md border border-white/5 bg-[#111111] px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#181818]"
                    >
                        <TerminalHint text="$ sudo solve --daily-humility" placement="below-start" />
                        <span className="block text-xs text-zinc-600">problem solving</span>
                        <span className="mt-1 block text-sm text-gray-300 group-hover:text-white">leetcode <span className="text-zinc-600">↗</span></span>
                    </a>
                    <a
                        href="https://monkeytype.com/account"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative rounded-md border border-white/5 bg-[#111111] px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#181818]"
                    >
                        <TerminalHint text="$ wpm --check --again" placement="below-start" />
                        <span className="block text-xs text-zinc-600">typing practice</span>
                        <span className="mt-1 block text-sm text-gray-300 group-hover:text-white">monkeytype <span className="text-zinc-600">↗</span></span>
                    </a>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-5 text-xs text-zinc-600">
                    <span>status:</span>
                    <span className="text-[#fde047]">online</span>
                    <span className="ml-auto">process: lab_ready</span>
                </div>
            </div>
        </div>
    );
}

// --- ANIMATION VARIANTS ---

const menuVariants: Variants = {
    closed: { opacity: 0, y: -100 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } }
};

const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.4 } })
};

// --- NAVIGATION COMPONENT ---
function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scrollProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        setIsOpen(false); // Close menu on click
        // If we are already on the page, just scroll
        const element = document.getElementById(id);
        if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 md:px-6 md:py-4 bg-[#111111] border-b border-white/5 transition-all duration-300">
                {/* Logo */}
                <a href="/" className="text-white font-sfmono text-base md:text-lg font-bold tracking-tight hover:opacity-80 transition-opacity z-50 relative">
                    silentlooop<span className="terminal-cursor text-zinc-500">_</span>
                    <TerminalHint text="$ cd ~/home-sweet-home" placement="below" />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-sfmono text-gray-400">
                    <a href="/#work" onClick={(e) => scrollToSection(e, 'work')} className="relative hover:text-white transition-colors cursor-pointer">work<TerminalHint text="$ ls ./proof-i-dont-just-talk" placement="below" /></a>
                    <a href="/blogs" className="relative hover:text-white transition-colors cursor-pointer">blogs<TerminalHint text="$ cat ./thoughts --uncompiled" placement="below" /></a>
                    <a href="/shaped" className="relative hover:text-white transition-colors cursor-pointer">~/me<TerminalHint text="$ whoami --the-human-behind-it" placement="below" /></a>
                </div>

                {/* Mobile Menu Toggle (Hamburger / Close) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white text-xl z-50 relative focus:outline-none"
                >
                    {isOpen ? "✕" : "≡"}
                </button>

                {/* Scroll progress */}
                <motion.div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px origin-left bg-zinc-500/60" style={{ scaleX: scrollProgress }} />
            </nav>

            {/* FULL SCREEN MOBILE MENU OVERLAY */}
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
                                onClick={(e) => scrollToSection(e, 'work')}
                                className="text-xl font-semibold text-gray-500 tracking-tight font-sfmono"
                            >
                                work
                            </motion.a>
                            <motion.a
                                custom={1}
                                variants={linkVariants}
                                href="/blogs"
                                className="text-xl font-semibold text-gray-500 tracking-tight font-sfmono"
                            >
                                blogs
                            </motion.a>
                            <motion.a
                                custom={2}
                                variants={linkVariants}
                                href="/shaped"
                                className="text-xl font-semibold text-gray-500 tracking-tight font-sfmono"
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

// --- MAIN COMPONENT ---

type TypeChunk = {
    text: string;
    className?: string;
};

type TypeSegment = {
    className: string;
    chunks: TypeChunk[];
};

function typedLength(chunks: TypeChunk[]) {
    return chunks.reduce((sum, chunk) => sum + chunk.text.length, 0);
}

function renderTypedChunks(chunks: TypeChunk[], visibleChars: number) {
    let remaining = visibleChars;

    return chunks.map((chunk, idx) => {
        const count = Math.max(0, Math.min(remaining, chunk.text.length));
        const value = chunk.text.slice(0, count);
        remaining -= count;

        return (
            <span key={`${chunk.text.slice(0, 10)}-${idx}`} className={chunk.className}>
                {value}
            </span>
        );
    });
}

function About() {
    const command = "./boot_trajectory.sh";
    const [activeTab, setActiveTab] = useState<"trajectory" | "contact" | "tech-lab">("trajectory");

    const trajectorySegments: TypeSegment[] = [
        {
            className: "text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white",
            chunks: [{ text: "The Trajectory" }]
        },
        {
            className: "text-[13px] sm:text-[14px] md:text-[15px] text-gray-400 leading-relaxed break-words",
            chunks: [
                { text: "I build where " },
                { text: "math meets machinery", className: "text-white" },
                { text: ": models that learn, pipelines that ship, and interfaces people actually enjoy using." }
            ]
        },
        {
            className: "text-[13px] sm:text-[14px] md:text-[15px] text-gray-400 leading-relaxed break-words",
            chunks: [
                { text: "The path has wandered from soldering irons to transformers, but the loop never changes: " },
                { text: "break it, understand it, rebuild it better", className: "text-white" },
                { text: "." }
            ]
        },
        {
            className: "text-[13px] sm:text-[14px] md:text-[15px] text-gray-400 leading-relaxed break-words",
            chunks: [
                { text: "My current obsession? " },
                { text: "Teaching machines to imagine.", className: "text-white" },
                { text: " I'm deep in diffusion models, watching structure emerge from pure noise, one denoising step at a time. Honestly, not a bad metaphor for figuring life out either." }
            ]
        },
        {
            className: "pt-3 text-gray-500 text-right text-xs",
            chunks: [{ text: "- manthan" }]
        },
    ];

    const segmentLengths = trajectorySegments.map((segment) => typedLength(segment.chunks));
    const pauseUnits = 10;
    const totalUnits = command.length + segmentLengths.reduce((sum, len) => sum + len, 0) + pauseUnits * trajectorySegments.length;
    const [typedUnits, setTypedUnits] = useState(0);

    useEffect(() => {
        setTypedUnits(0);

        const timer = setInterval(() => {
            setTypedUnits((prev) => {
                if (prev >= totalUnits) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 18);

        return () => clearInterval(timer);
    }, [totalUnits]);

    const commandVisible = Math.max(0, Math.min(typedUnits, command.length));

    const getVisibleCharsForSegment = (segmentIndex: number) => {
        let offset = command.length;

        for (let i = 0; i < segmentIndex; i += 1) {
            offset += segmentLengths[i] + pauseUnits;
        }

        const visible = typedUnits - offset;
        return Math.max(0, Math.min(visible, segmentLengths[segmentIndex]));
    };

    return (
        <div id="about" className="bg-[#111111]">

            <main className="flex flex-col items-center bg-[#111111] text-white font-sfmono relative z-10 animate-in fade-in duration-1000">

                <div className="w-full px-5 max-w-5xl mx-auto">
                    {/* Trajectory Section */}
                    <section className="min-h-[100dvh] flex flex-col justify-center py-24 md:py-28">
                        <div className="overflow-hidden rounded-md border border-white/10 bg-[#141414] shadow-2xl shadow-black/20">
                            <div role="tablist" aria-label="Portfolio views" className="flex min-w-0 items-end gap-3 border-b border-white/10 bg-[#111111] px-2 pt-2 md:px-5">
                                <div className="flex shrink-0 items-center gap-2 px-2 pb-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                </div>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === "trajectory"}
                                    onClick={() => setActiveTab("trajectory")}
                                    className={`relative z-10 flex min-w-0 flex-1 items-center rounded-t-md border-x border-t px-2 py-2 text-left text-[11px] leading-tight transition-colors md:px-5 md:text-xs ${activeTab === "trajectory" ? "-mb-px border-white/10 bg-[#181818] text-zinc-300" : "border-transparent bg-[#111111] text-zinc-600 hover:text-zinc-400"}`}
                                >
                                    <span className="truncate">{command}</span>
                                    <TerminalHint text="$ cat ./how-i-got-here.log" placement="below-start" />
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === "contact"}
                                    onClick={() => setActiveTab("contact")}
                                    className={`relative z-10 flex min-w-0 flex-1 items-center rounded-t-md border-x border-t px-2 py-2 text-left text-[11px] leading-tight transition-colors md:px-5 md:text-xs ${activeTab === "contact" ? "-mb-px border-white/10 bg-[#181818] text-zinc-300" : "border-transparent bg-[#111111] text-zinc-600 hover:text-zinc-400"}`}
                                >
                                    <span className="truncate">cat contact.txt</span>
                                    <TerminalHint text="$ ping manthan --say-hi" placement="below-start" />
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === "tech-lab"}
                                    onClick={() => setActiveTab("tech-lab")}
                                    className={`relative z-10 flex min-w-0 flex-1 items-center rounded-t-md border-x border-t px-2 py-2 text-left text-[11px] leading-tight transition-colors md:px-5 md:text-xs ${activeTab === "tech-lab" ? "-mb-px border-white/10 bg-[#181818] text-zinc-300" : "border-transparent bg-[#111111] text-zinc-600 hover:text-zinc-400"}`}
                                >
                                    <span className="truncate">tech-lab.txt</span>
                                    <TerminalHint text="$ ./break-things --on-purpose" placement="below-start" />
                                </button>
                            </div>

                            {activeTab === "trajectory" ? <SectionReveal className="px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14" itemClassName="">
                                <div className="mb-8 grid w-full max-w-4xl min-w-0">
                                    <div className="invisible col-start-1 row-start-1 w-full min-w-0" aria-hidden="true">
                                        <div className="flex flex-wrap items-center gap-2 font-mono text-sm break-all" aria-hidden="true">
                                            <span>manthan@portfolio:~$</span>
                                            <span>{command}</span>
                                            <span>█</span>
                                        </div>
                                        <div className="mt-7 space-y-7">
                                            {trajectorySegments.map((segment, idx) => (
                                                <p key={idx} className={`${segment.className} break-words`}>
                                                    {segment.chunks.map((chunk) => chunk.text).join("")}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-start-1 row-start-1 w-full min-w-0" aria-live="polite">
                                        <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-zinc-500 break-all">
                                            <span className="text-zinc-600">manthan@portfolio:~$</span>
                                            <span className="text-zinc-400">{command.slice(0, commandVisible)}</span>
                                            <span className="terminal-cursor ml-1 text-zinc-500">█</span>
                                        </div>
                                        <div className="mt-7 space-y-7">
                                            {trajectorySegments.map((segment, idx) => {
                                                const visibleChars = getVisibleCharsForSegment(idx);
                                                return (
                                                    <p key={idx} className={`${segment.className} break-words`}>
                                                        {renderTypedChunks(segment.chunks, visibleChars)}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5 font-mono text-xs text-zinc-600">
                                    <span>status: <span className="text-[#fde047]">online</span></span>
                                    <span>process: trajectory_initialized</span>
                                </div>
                            </SectionReveal> : activeTab === "contact" ? <ContactTerminal /> : <TechLabTerminal />}
                        </div>
                    </section>

                    {/* Terminal-style Experience Section */}
                    <div className="mt-2 mb-6">
                        <SectionPrompt command="cd ./deep-dive/experience" className="mb-8" startOnMount />
                        <TerminalExperience />
                    </div>
                </div>


            </main>
        </div>
    )
}

export { About, NavBar }