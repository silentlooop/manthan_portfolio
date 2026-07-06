import { useEffect } from "react";
import { NavBar } from "../components/ui/about";
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
// To add media to a card, add a `media` field with the URL.
// Videos are auto-detected from .mp4/.webm/.mov extensions, or set mediaType: "video".
//
// Example:
//   { ...card, media: "/details_img/interstellar.jpg" }
//   { ...card, media: "https://example.com/clip.mp4", mediaType: "video" }

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
        // media: "/details_img/interstellar.jpg",
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
        // media: "/details_img/atomic_habits.jpg",
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

// Terminal UI fragments scattered between cards
const terminalFragments = [
    { text: "$ cat ~/memories | grep -i 'important'", delay: 0.3 },
    { text: "→ 6 results found. rendering...", delay: 0.45 },
    { text: "$ echo $PATH_TO_SELF", delay: 0.6 },
    { text: "drwxr-xr-x  manthan  staff  experiences/", delay: 0.75 },
    { text: "$ tree --depth 1 ~/shaped", delay: 0.9 },
];

// --- ShapedCard Component ---

function ShapedCard({ item }: { item: ShapedItem }) {
    return (
        <div className={`${item.span}`}>
            <div
                className="shaped-card h-full bg-[#0b0b0b] border border-[#262626] p-5 md:p-6 rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.22)]"
                style={{
                    "--card-rotation": `${item.rotation}deg`,
                } as React.CSSProperties}
            >
                {item.media && <CardMedia media={item.media} mediaType={item.mediaType} title={item.title} />}
                <span className="text-[11px] text-gray-500 font-sfmono tracking-wider uppercase">{item.type}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2 font-sfmono leading-snug tracking-tight">{item.title}</h3>
                <p className="text-[15px] text-gray-400 mt-2.5 leading-relaxed font-sfmono">{item.description}</p>
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

                    {/* Ghost cursors blinking at different rates */}
                    <span className="absolute top-[18%] right-[15%] text-2xl font-sfmono animate-blink-slow">—</span>
                    <span className="absolute bottom-[35%] left-[3%] text-xl font-sfmono animate-blink-slow" style={{ animationDelay: "0.5s" }}>▋</span>
                    <span className="absolute top-[55%] right-[5%] text-lg font-sfmono animate-blink-slow" style={{ animationDelay: "1.2s" }}>_</span>

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
                <SectionPrompt command="cat ./me/about" className="relative z-[1] mb-6" />
                

                <SectionReveal className="relative z-[1] border border-[#2a2a2a] rounded-lg overflow-hidden bg-[#0a0a0a]/50 mb-10">
                    <div className="flex items-center gap-2 px-4 py-3">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57] shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840] shrink-0" />
                        <span className="ml-3 text-sm text-gray-400 font-sfmono truncate">
                            manthan@life ~ % things-that-shaped-me
                            
                        </span>
                    </div>
                    <div className="border-t border-[#2a2a2a]" />
                </SectionReveal>

                {/* ── Terminal output line before cards ── */}
                <SectionPrompt command="cat ~/memories | grep -i 'important'" className="relative z-[1] mb-3" />
                <div className="relative z-[1] font-sfmono text-sm text-gray-600 mb-8 ml-1">
                    <span className="text-[#fde047]/40">→ 6 results found.</span> rendering...
                </div>

                {/* ══════════ CARD GRID ══════════ */}
                <div className="relative z-[1] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    {/* Row 1 */}
                    {shapedItems.slice(0, 2).map((item) => (
                        <ShapedCard key={item.title} item={item} />
                    ))}
                </div>

                {/* ── Inline terminal fragment ── */}
                <div className="relative z-[1] font-sfmono text-xs md:text-sm text-gray-600/50 py-2 md:py-3 ml-1 select-none">
                    <span className="text-gray-600/30">│</span>&nbsp;&nbsp;{terminalFragments[2].text}
                </div>

                {/* ══════════ CARD GRID ══════════ */}
                <div className="relative z-[1] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    {/* Row 2 */}
                    {shapedItems.slice(2, 4).map((item) => (
                        <ShapedCard key={item.title} item={item} />
                    ))}
                </div>

                {/* ── Inline terminal fragment ── */}
                <div className="relative z-[1] font-sfmono text-xs md:text-sm text-gray-600/50 py-2 md:py-3 ml-1 select-none">
                    <span className="text-gray-600/30">│</span>&nbsp;&nbsp;{terminalFragments[3].text}
                    <br />
                    <span className="text-gray-600/30">│</span>&nbsp;&nbsp;{terminalFragments[4].text}
                </div>

                {/* ══════════ CARD GRID ══════════ */}
                <div className="relative z-[1] grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    {/* Row 3 */}
                    {shapedItems.slice(4, 6).map((item) => (
                        <ShapedCard key={item.title} item={item} />
                    ))}
                </div>

                {/* ── Terminal output after cards ── */}
                <div className="relative z-[1] font-sfmono text-sm text-gray-500 mt-8 ml-1 space-y-1 select-none">
                    <p><span className="text-gray-600">├──</span> render complete. 6 items loaded.</p>
                    <p><span className="text-gray-600">├──</span> memory_usage: 19.2% <span className="inline-block w-24 h-2 bg-[#1e1e1e] rounded-full ml-1 relative overflow-hidden"><span className="absolute inset-y-0 left-0 w-[19%] bg-[#fde047]/40 rounded-full" /></span></p>
                    <p><span className="text-gray-600">└──</span> I love spending time alone</p>
                </div>

                {/* ── Anime Terminal Log ── */}
                <SectionPrompt command="cat ./me/anime" className="relative z-[1] mt-12 mb-6" />
                
                <div className="relative z-[1] font-sfmono text-xs md:text-sm bg-[#0a0a0a]/60 border border-gray-800 rounded-lg p-4 mb-4 max-w-4xl mx-auto shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
                        <span className="ml-3 text-gray-400 font-sfmono text-xs">manthan@anime ~ % completed-anime-list</span>
                        
                    </div>
                    <div className="border-t border-gray-800 mb-2" />
                    <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <div>
                            <span className="text-gray-500">$</span> Anime Series (Top 10)
                            <br />
                            <span className="text-[#fde047]/80">BLACK CLOVER</span><br />
                            <span className="text-[#fde047]/80">HYOUKA</span><br />
                            <span className="text-[#fde047]/80">FRIEREN</span><br />
                            <span className="text-[#fde047]/80">TOKYO GHOUL</span><br />
                            <span className="text-[#fde047]/80">NARUTO</span><br />
                            <span className="text-[#fde047]/80">ONE PIECE</span><br />
                            <span className="text-[#fde047]/80">BLEACH</span><br />
                            <span className="text-[#fde047]/80">DEMON SLAYER</span><br />
                            <span className="text-[#fde047]/80">BUNGO STRAY DOGS</span><br />
                            <span className="text-[#fde047]/80">AOT</span><br />
                        </div>
                        <div>
                            <span className="text-gray-500">$</span> Anime Movies
                            <br />
                            <span className="text-[#fde047]/80">THE LIGHT OF FIREFLY FOREST</span><br />
                            <span className="text-[#fde047]/80">YOUR NAME</span><br />
                            <span className="text-[#fde047]/80">SUZUME</span><br />
                            <span className="text-[#fde047]/80">A SILENT VOICE</span><br />
                            <span className="text-[#fde047]/80">5CM PER SECOND</span><br />
                            <span className="text-[#fde047]/80">GARDEN OF WORDS</span><br />
                            <span className="text-[#fde047]/80">NARUTO MOVIES</span><br />
                            <span className="text-[#fde047]/80">SPY FAMILY : CODE WHITE</span><br />
                        </div>
                    </div>
                </div>

                {/* ── Terminal status bar / footer ── */}
                <div className="relative z-[1] mt-20 border-t border-[#1e1e1e] pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="font-sfmono text-sm text-gray-500 select-none">
                        [exit] ← type anything or press any key
                    </p>
                    <p className="font-sfmono text-sm text-gray-500 select-none">
                        manthan@life: ~/things-that-shaped-me
                        
                    </p>
                </div>
            </main>
        </div>
    );
}
