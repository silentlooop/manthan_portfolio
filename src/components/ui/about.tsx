"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// --- HELPERS ---

// Terminal-style Experience Section
function TerminalExperience() {
    const experiences = [
        {
            company: "AICommunity IITB",
            period: "2025 - NOW",
            role: "Junior Developer",
            desc: "Working with a small team of 8 members to build AI products for insti and freelance projects. Focusing on NLP pipelines and generative models."
        },
        {
            company: "Techfest",
            period: "2025 - 2026",
            role: "Graphic Designer",
            desc: "Supported the design team with social media graphics, print materials, and visual identity systems for Asia's largest Science and Technology festival."
        }
    ];

    return (
        <div className="bg-[#111111] rounded-md p-5 font-mono text-[15px] text-gray-300 border border-white/5 max-w-3xl mx-auto">
            <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-red-500 inline-block"></span>
                <span className="h-2.5 w-2.5 rounded bg-yellow-500 inline-block"></span>
                <span className="h-2.5 w-2.5 rounded bg-green-500 inline-block"></span>
                <span className="ml-3 text-gray-600 text-xs">manthan@portfolio:~$</span>
            </div>
            <div className="space-y-6">
                {experiences.map((exp, idx) => (
                    <div key={exp.company}>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-gray-500">$</span>
                            <span className="text-gray-400">cat</span>
                            <span className="text-white">./experience/{exp.company.replace(/\s/g, '').toLowerCase()}</span>
                            <span className="text-gray-700 ml-2 text-xs">[{exp.period}]</span>
                        </div>
                        <div className="pl-6 mt-1">
                            <span className="text-gray-600">role:</span> <span className="text-white">{exp.role}</span><br />
                            <span className="text-gray-600">desc:</span> <span className="text-gray-400">{exp.desc}</span>
                        </div>
                        {idx !== experiences.length - 1 && <div className="border-b border-white/5 my-4" />}
                    </div>
                ))}
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
                    SiL3nTL00p
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-sfmono text-gray-400">
                    <a href="/#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-white transition-colors cursor-pointer">work</a>
                    <a href="/blogs" className="hover:text-white transition-colors cursor-pointer">blogs</a>
                    <a href="/shaped" className="hover:text-white transition-colors cursor-pointer">~/me</a>
                </div>

                {/* Mobile Menu Toggle (Hamburger / Close) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white text-xl z-50 relative focus:outline-none"
                >
                    {isOpen ? "✕" : "≡"}
                </button>
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

    const trajectorySegments: TypeSegment[] = [
        {
            className: "text-3xl md:text-4xl font-bold tracking-tight text-white",
            chunks: [{ text: "The Trajectory" }]
        },
        {
            className: "text-[15px] md:text-[16px] text-gray-400 leading-relaxed",
            chunks: [
                { text: "I synthesize " },
                { text: "machine learning theory", className: "text-white" },
                { text: " with practical engineering, solving complex puzzles through the lens of a student-builder." }
            ]
        },
        {
            className: "text-[15px] md:text-[16px] text-gray-400 leading-relaxed",
            chunks: [
                { text: "My work tracks an evolution from first principles to deployed code. I am driven by the " },
                { text: "quantification of reality", className: "text-white" },
                { text: ", architecting systems that transcend cognitive limits." }
            ]
        },
        {
            className: "text-[15px] md:text-[16px] text-gray-400 leading-relaxed",
            chunks: [
                { text: "My current obsession? " },
                { text: "Hacking biology with code.", className: "text-white" },
                { text: " I'm driven by the math behind living systems and building AI that can understand health data better than we can. It's about quantifying reality to architect systems that transcend cognitive limits." }
            ]
        },
        {
            className: "pt-4 text-gray-500 text-right",
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
    const cursorActive = typedUnits < totalUnits;

    const getVisibleCharsForSegment = (segmentIndex: number) => {
        let offset = command.length;

        for (let i = 0; i < segmentIndex; i += 1) {
            offset += segmentLengths[i] + pauseUnits;
        }

        const visible = typedUnits - offset;
        return Math.max(0, Math.min(visible, segmentLengths[segmentIndex]));
    };

    return (
        <div id="about" className="min-h-screen bg-[#111111]">

            <main className="flex flex-col items-center justify-start bg-[#111111] text-white font-sfmono relative z-10 pt-24 animate-in fade-in duration-1000 pb-20">

                <div className="w-full px-5 max-w-5xl mx-auto">
                    {/* Trajectory Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32">
                        <div className="space-y-8">
                            <div className="font-mono text-sm text-zinc-500 flex items-center gap-2" aria-live="polite">
                                <span className="text-zinc-600">manthan@portfolio:~$</span>
                                <span className="text-zinc-400">{command.slice(0, commandVisible)}</span>
                                {cursorActive && <span className="inline-block h-4 w-2 bg-zinc-400 animate-pulse align-middle" />}
                            </div>

                            <div className="space-y-6">
                                {trajectorySegments.map((segment, idx) => {
                                    const visibleChars = getVisibleCharsForSegment(idx);
                                    return (
                                        <p key={idx} className={segment.className}>
                                            {renderTypedChunks(segment.chunks, visibleChars)}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 group"
                        >
                            <img src="https://framerusercontent.com/images/b9ayqjyFJxYrxbpev1rjq1HOk.jpg" alt="Manthan Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                        </motion.div>
                    </div>

                    {/* Terminal-style Experience Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-base font-mono text-gray-500 mb-12 uppercase tracking-widest">
                            // Deep Dive: Experience
                        </h2>
                        <TerminalExperience />
                    </motion.div>
                </div>

                {/* --- SELECTED WORK SECTION --- */}
                <div id="work" className="w-full px-5 mt-16 max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-base font-mono text-gray-500 uppercase tracking-widest mb-8 whitespace-nowrap md:mb-[-275px]"
                    >
                        // selected work
                    </motion.h2>
                </div>


            </main>
        </div>
    )
}

export { About, NavBar }