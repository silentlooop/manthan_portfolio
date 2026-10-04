import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../../data/projects";

// Fire this from anywhere to open the terminal, e.g. a footer button.
export const OPEN_TERMINAL_EVENT = "open-command-terminal";

const LINKS = {
    github: "https://github.com/silentlooop",
    linkedin: "https://www.linkedin.com/in/manthan-p-6457b3313",
    x: "https://x.com/null_rejected",
    leetcode: "https://leetcode.com/u/silentlooop/",
    monkeytype: "https://monkeytype.com/account",
};

type Line = { kind: "input" | "output" | "error"; text: string };

const HELP = [
    "available commands:",
    "  ls                 list directories",
    "  ls projects        list all projects",
    "  cd <dir>           work | blogs | me | ~",
    "  open <project>     open a project by slug",
    "  cat contact        where to find me",
    "  github | linkedin | x | leetcode | monkeytype",
    "  whoami | date | echo <text> | history | clear | exit",
];

const WELCOME: Line[] = [
    { kind: "output", text: "welcome to silentlooop shell (zsh-ish 5.0.0)" },
    { kind: "output", text: "type 'help' to see what i can do." },
];

export function CommandTerminal() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [lines, setLines] = useState<Line[]>(WELCOME);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => setOpen(false), []);

    // Global shortcuts: "/" or Cmd/Ctrl+K opens, Esc closes.
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTyping = !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            } else if (e.key === "/" && !isTyping && !open) {
                e.preventDefault();
                setOpen(true);
            } else if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        const onOpenEvent = () => setOpen(true);

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener(OPEN_TERMINAL_EVENT, onOpenEvent);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener(OPEN_TERMINAL_EVENT, onOpenEvent);
        };
    }, [open]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [lines]);

    const go = (path: string, message: string) => {
        setLines((prev) => [...prev, { kind: "output", text: message }]);
        window.setTimeout(() => {
            setOpen(false);
            if (path === "/#work" && window.location.pathname === "/") {
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            } else {
                navigate(path);
            }
        }, 350);
    };

    const openExternal = (url: string, label: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
        return [`opening ${label}...`];
    };

    const run = (raw: string) => {
        const command = raw.trim();
        const [cmd = "", ...args] = command.split(/\s+/);
        const arg = args.join(" ").replace(/^\.\//, "").replace(/\/$/, "");
        const out = (text: string | string[], kind: Line["kind"] = "output") =>
            setLines((prev) => [...prev, ...(Array.isArray(text) ? text : [text]).map((t) => ({ kind, text: t }))]);

        setLines((prev) => [...prev, { kind: "input", text: command }]);
        if (!command) return;
        setHistory((prev) => [...prev, command]);

        switch (cmd.toLowerCase()) {
            case "help":
                return out(HELP);
            case "ls":
                if (arg === "projects") return out(projects.map((p) => `  ${p.slug.padEnd(30)} ${p.subtitle}`));
                if (arg === "blogs") return go("/blogs", "-> ./blogs");
                return out("work/  blogs/  me/  projects/  contact.txt");
            case "cd":
                if (!arg || arg === "~" || arg === "/" || arg === "..") return go("/", "-> ~");
                if (arg === "work" || arg === "selected-work") return go("/#work", "-> ./work");
                if (arg === "blogs") return go("/blogs", "-> ./blogs");
                if (arg === "me" || arg === "~/me") return go("/shaped", "-> ~/me");
                if (arg.startsWith("projects/")) return run(`open ${arg.slice("projects/".length)}`);
                return out(`cd: no such file or directory: ${arg}`, "error");
            case "open": {
                const slug = arg.replace(/^projects\//, "");
                const project = projects.find((p) => p.slug === slug);
                if (project) return go(`/projects/${project.slug}`, `-> ./projects/${project.slug}`);
                if (slug in LINKS) return out(openExternal(LINKS[slug as keyof typeof LINKS], slug));
                return out([`open: ${slug || "?"}: not found`, "try 'ls projects'"], "error");
            }
            case "whoami":
                return out(["manthan / silentlooop", "builds ml things, designs things, breaks things.", "-> 'cd me' for the long version"]);
            case "cat":
                if (arg === "contact" || arg === "contact.txt")
                    return out([`github    ${LINKS.github}`, `linkedin  ${LINKS.linkedin}`, `x         ${LINKS.x}`]);
                return out(`cat: ${arg || "?"}: no such file`, "error");
            case "github":
            case "linkedin":
            case "x":
            case "leetcode":
            case "monkeytype":
                return out(openExternal(LINKS[cmd.toLowerCase() as keyof typeof LINKS], cmd.toLowerCase()));
            case "date":
                return out(new Date().toString());
            case "echo":
                return out(args.join(" "));
            case "history":
                return out([...history, command].map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`));
            case "clear":
                return setLines([]);
            case "exit":
                return close();
            case "sudo":
                if (/hire/i.test(arg)) return out(["[sudo] password for recruiter: ********", "permission granted. great choice.", ...openExternal(LINKS.linkedin, "linkedin")]);
                return out("nice try. this incident will be reported.", "error");
            case "rm":
                return out("rm: permission denied. the portfolio stays.", "error");
            case "vim":
            case "vi":
                return out("you'll never leave. try 'exit' instead.");
            default:
                return out(`zsh: command not found: ${cmd}. try 'help'`, "error");
        }
    };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            run(input);
            setInput("");
            setHistoryIndex(null);
        } else if (e.key === "ArrowUp" && history.length) {
            e.preventDefault();
            const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(next);
            setInput(history[next]);
        } else if (e.key === "ArrowDown" && historyIndex !== null) {
            e.preventDefault();
            const next = historyIndex + 1;
            setHistoryIndex(next >= history.length ? null : next);
            setInput(next >= history.length ? "" : history[next]);
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onMouseDown={close}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command terminal"
                        className="w-full max-w-2xl overflow-hidden rounded-md border border-white/10 bg-[#141414] font-sfmono text-[13px] shadow-2xl shadow-black/50"
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => inputRef.current?.focus()}
                    >
                        <div className="flex items-center gap-2 border-b border-white/10 bg-[#111111] px-4 py-3">
                            <button type="button" aria-label="Close terminal" onClick={close} className="h-2.5 w-2.5 rounded-full bg-red-500 hover:brightness-125" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            <span className="ml-3 truncate text-xs text-zinc-500">manthan@portfolio: ~</span>
                            <span className="ml-auto hidden text-[11px] text-zinc-600 sm:inline">esc to close</span>
                        </div>
                        <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto px-4 py-3 leading-relaxed" aria-live="polite">
                            {lines.map((line, i) => (
                                <div key={i} className="whitespace-pre-wrap break-words">
                                    {line.kind === "input" ? (
                                        <>
                                            <span className="text-zinc-600">$ </span>
                                            <span className="text-zinc-200">{line.text}</span>
                                        </>
                                    ) : (
                                        <span className={line.kind === "error" ? "text-red-400/80" : "text-zinc-400"}>{line.text}</span>
                                    )}
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <span className="text-[#fde047]">$</span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={onInputKeyDown}
                                    aria-label="Terminal command"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    className="min-w-0 flex-1 bg-transparent text-zinc-100 caret-[#fde047] outline-none placeholder:text-zinc-700"
                                    placeholder="try 'help'"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
