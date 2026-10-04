import { useEffect } from "react";
import { NavBar } from "./about";
import { SectionPrompt, SectionReveal } from "../components/ui/terminal-effects";

// --- TYPES ---

interface ShapedItem {
    title: string;
    type: string;
    description: string;
    rotation: number;
    span: string;
    /** URL to an image or video. Leave undefined for text-only cards. */
    media?: string;
    /** "image" (default) or "video" — auto-detected from extension if omitted. */
    mediaType?: "image" | "video";
}

// --- DATA ---
const shapedItems: ShapedItem[] = [
    {
        title: "Overthinking",
        type: "[obsession]",
        description:
            "My most exhausting trait. Also the one I'm most grateful and hate myself for.",
        rotation: -3,
        span: "md:col-span-5 md:row-span-1",
    },
    {
        title: "Don't believe everything you think",
        type: "[book]",
        description: "A reminder that my mind is a noisy place, and that's okay.",
        rotation: 1,
        span: "md:col-span-7 md:row-span-1"
    },
    {
        title: "アニメ (Anime)",
        type: "[film]",
        description: "From the emotional depth of 'A Silent Voice' to the mind-bending narrative of 'Hyouka', anime made me reconsider my beliefs.",
        rotation: -2.5,
        span: "md:col-span-7 md:row-span-1",
    },
    {
        title: "3am debugging sessions",
        type: "[habit]",
        description: "When the world is quiet, the code finally makes sense.",
        rotation: 1.5,
        span: "md:col-span-5 md:row-span-1",
    },
    {
        title: "Realization",
        type: "[moment]",
        description: "Realized alone times are the best ones.",
        rotation: -1,
        span: "md:col-span-4 md:row-span-1",
    },
    {
        title: "Present",
        type: "[life]",
        description:
            "I'm just trying, and most of the time failing. Just figuring things out as I go.",
        rotation: 2.5,
        span: "md:col-span-8 md:row-span-1",
    },
];

// --- HELPERS ---

function isVideoUrl(url: string, mediaType?: "image" | "video"): boolean {
    if (mediaType) return mediaType === "video";
    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

function CardMedia({ media, mediaType, title }: { media: string; mediaType?: "image" | "video"; title: string }) {
    if (isVideoUrl(media, mediaType)) {
        return (
            <video
                src={media}
                className="w-full h-auto max-h-48 object-cover rounded-sm mb-3"
                autoPlay
                loop
                muted
                playsInline
            />
        );
    }
    return (
        <img
            src={media}
            alt={title}
            className="w-full h-auto max-h-48 object-cover rounded-sm mb-3"
            loading="lazy"
        />
    );
}

// --- ShapedCard Component ---

function ShapedCard({ item }: { item: ShapedItem }) {
    return (
        <div className={`${item.span}`}>
            <div
                className="shaped-card h-full overflow-hidden rounded-md border border-white/10 bg-[#141414] shadow-2xl shadow-black/20"
                style={{
                    "--card-rotation": `${item.rotation}deg`,
                } as React.CSSProperties}
            >
                <div className="p-5 md:p-6">
                    {item.media && <CardMedia media={item.media} mediaType={item.mediaType} title={item.title} />}
                    <span className="text-[11px] font-sfmono uppercase tracking-wider text-gray-500">{item.type}</span>
                    <h3 className="text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">{item.title}</h3>
                    <p className="mt-2.5 font-sfmono text-[15px] leading-relaxed text-gray-400">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENT ---

export default function Shaped() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#111111]">
            {/* Scoped styles */}
            <style>{`
                .shaped-card {
                    transform: rotate(var(--card-rotation, 0deg));
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                }
                .shaped-card:hover {
                    transform: rotate(0deg) translateY(-4px);
                    border-color: rgba(75, 85, 99, 0.9);
                }
                @media (max-width: 767px) {
                    .shaped-card { transform: none !important; }
                }
            `}</style>

            <NavBar />

            <main className="pt-24 pb-20 px-5 max-w-5xl mx-auto relative text-white font-sfmono">

                {/* ── Background decorative layer ── */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
                    {/* Large ghost text */}

                    <p className="absolute top-[32%] right-[2%] text-3xl md:text-5xl font-sfmono text-white opacity-[0.03] whitespace-nowrap rotate-[-3deg]">
                        &gt; compiling personality...
                    </p>
                    <p className="absolute bottom-[22%] left-[8%] text-4xl md:text-6xl font-sfmono text-white opacity-[0.02] whitespace-nowrap rotate-[1deg]">
                        &gt; parsing experiences...
                    </p>
                    <p className="absolute bottom-[8%] right-[12%] text-2xl md:text-4xl font-sfmono text-white opacity-[0.03] whitespace-nowrap">
                        exit_code: 0
                    </p>



                    {/* Vertical pipe decorations */}
                    <div className="absolute top-[12%] left-[48%] font-sfmono text-white opacity-[0.035] text-xs leading-tight whitespace-pre">
                        {`│
│
├──
│
│
└──`}
                    </div>
                    <div className="absolute bottom-[15%] right-[30%] font-sfmono text-white opacity-[0.03] text-xs leading-tight whitespace-pre">
                        {`┌───────┐
│ ░░░░░ │
│ ░░░░░ │
└───────┘`}
                    </div>
                </div>

                {/* ── Terminal Window Bar ── */}
                <SectionPrompt command="cat ./me/about" index="01" meta="things that shaped me" className="relative z-[1] mb-6" />


                <SectionReveal className="relative z-[1] mb-10 overflow-hidden rounded-md border border-white/10 bg-[#141414] shadow-2xl shadow-black/20">
                    <div className="flex items-center gap-2 border-b border-white/10 bg-[#111111] px-5 py-4">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57] shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840] shrink-0" />
                        <span className="ml-3 text-sm text-gray-400 font-sfmono truncate">
                            manthan@life ~ % things-that-shaped-me

                        </span>
                    </div>
                </SectionReveal>

                {/* ══════════ CARD GRID ══════════ */}
                <div className="relative z-[1] grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-12 md:gap-x-4 md:gap-y-8">
                    {/* Row 1 */}
                    {shapedItems.slice(0, 2).map((item) => (
                        <ShapedCard key={item.title} item={item} />
                    ))}
                </div>

                {/* ══════════ CARD GRID ══════════ */}
                <div className="relative z-[1] mt-6 grid grid-cols-1 gap-x-3 gap-y-6 md:mt-8 md:grid-cols-12 md:gap-x-4 md:gap-y-8">
                    {/* Row 2 */}
                    {shapedItems.slice(2, 4).map((item) => (
                        <ShapedCard key={item.title} item={item} />
                    ))}
                </div>

                {/* ══════════ CARD GRID ══════════ */}
                <div className="relative z-[1] mt-6 grid grid-cols-1 gap-x-3 gap-y-6 md:mt-8 md:grid-cols-12 md:gap-x-4 md:gap-y-8">
                    {/* Row 3 */}
                    {shapedItems.slice(4, 6).map((item) => (
                        <ShapedCard key={item.title} item={item} />
                    ))}
                </div>

                {/* ── Anime Terminal Log ── */}
                <SectionPrompt command="cat ./me/anime" index="02" meta="watchlist" className="relative z-[1] mt-12 mb-6" />

                <div className="relative z-[1] mx-auto mb-4 max-w-4xl rounded-md border border-white/10 bg-[#141414] p-5 font-sfmono text-xs text-gray-300 shadow-2xl shadow-black/20 md:p-6 md:text-sm">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12">
                        <div>
                            <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-zinc-500"><span className="text-[#fde047]">$</span> series · top 10</p>
                            <ol className="space-y-1.5">
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">01</span><span className="text-zinc-300">BLACK CLOVER</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">02</span><span className="text-zinc-300">HYOUKA</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">03</span><span className="text-zinc-300">FRIEREN</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">04</span><span className="text-zinc-300">TOKYO GHOUL</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">05</span><span className="text-zinc-300">NARUTO</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">06</span><span className="text-zinc-300">ONE PIECE</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">07</span><span className="text-zinc-300">BLEACH</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">08</span><span className="text-zinc-300">DEMON SLAYER</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">09</span><span className="text-zinc-300">BUNGO STRAY DOGS</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">10</span><span className="text-zinc-300">AOT</span></li>
                            </ol>
                        </div>
                        <div>
                            <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-zinc-500"><span className="text-[#fde047]">$</span> movies</p>
                            <ol className="space-y-1.5">
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">01</span><span className="text-zinc-300">THE LIGHT OF FIREFLY FOREST</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">02</span><span className="text-zinc-300">YOUR NAME</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">03</span><span className="text-zinc-300">SUZUME</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">04</span><span className="text-zinc-300">A SILENT VOICE</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">05</span><span className="text-zinc-300">5CM PER SECOND</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">06</span><span className="text-zinc-300">GARDEN OF WORDS</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">07</span><span className="text-zinc-300">NARUTO MOVIES</span></li>
                                <li className="flex gap-3"><span className="tabular-nums text-zinc-600">08</span><span className="text-zinc-300">SPY FAMILY : CODE WHITE</span></li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* ── Terminal status bar / footer ── */}
                <div className="relative z-[1] mt-20 border-t border-[#1e1e1e] pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="font-sfmono text-sm text-gray-500 select-none">
                        [exit] ← press / to open the terminal
                    </p>
                    <p className="font-sfmono text-sm text-gray-500 select-none">
                        manthan@life: ~/things-that-shaped-me

                    </p>
                </div>
            </main>
        </div>
    );
}
