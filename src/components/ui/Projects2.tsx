import React from "react";
import { SectionReveal } from "./terminal-effects";
import { TerminalHint } from "./terminal-hint";

interface ProjectCardProps {
  href?: string;
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  mediaType?: "image" | "video";
  index?: number;
  /** CSS object-position for the cover crop, e.g. "top". */
  imagePosition?: string;
  /** "contain" letterboxes media that shouldn't be cropped (e.g. wide screenshots). */
  imageFit?: "cover" | "contain";
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  category,
  imageSrc,
  imageAlt,
  mediaType = "image",
  index,
  imagePosition = "center",
  imageFit = "cover",
}) => {
  const fitClass = imageFit === "contain" ? "object-contain p-6" : "object-cover";
  const Wrapper: React.ElementType = href ? "a" : "div";
  const projectSlug = href?.split("/").filter(Boolean).pop() ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Determine media type from file extension if not explicitly provided
  const isVideo = mediaType === "video" ||
    imageSrc.endsWith('.mp4') ||
    imageSrc.endsWith('.webm') ||
    imageSrc.endsWith('.ogg') ||
    imageSrc.endsWith('.mov');

  return (
    <Wrapper
      href={href}
      className="group/card relative block overflow-hidden rounded-md border border-white/[0.06] bg-[#141414] transition-colors duration-300 hover:border-white/15"
      {...(href ? { target: "_self", rel: "noopener noreferrer" } : {})}
      style={{
        fontFamily:
          '"Geist Mono", "SF Mono", "Space Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
      }}
    >
      <TerminalHint text={`$ open ./projects/${projectSlug}`} />
      <article className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
        {isVideo ? (
          <video
            src={imageSrc}
            className={`h-full w-full ${fitClass} brightness-[0.92] transition-[transform,filter] duration-700 ease-out group-hover/card:scale-[1.03] group-hover/card:brightness-100`}
            style={{ objectPosition: imagePosition }}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className={`h-full w-full ${fitClass} brightness-[0.92] transition-[transform,filter] duration-700 ease-out group-hover/card:scale-[1.03] group-hover/card:brightness-100`}
            style={{ objectPosition: imagePosition }}
          />
        )}
      </article>
      <div className="flex items-start justify-between gap-4 border-t border-white/[0.06] px-4 py-3.5">
        <div className="flex min-w-0 items-baseline gap-3">
          {index !== undefined && (
            <span className="shrink-0 text-[11px] tabular-nums text-zinc-600">{String(index).padStart(2, "0")}</span>
          )}
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold tracking-tight text-white">{title}</div>
            <div className="mt-1 truncate text-[11px] uppercase tracking-[0.12em] text-zinc-500">{category}</div>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 text-sm text-zinc-600 transition-[color,transform] duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-white"
        >
          ↗
        </span>
      </div>
    </Wrapper>
  );
};

const ProjectsGrid: React.FC = () => {
  const projectCards = [
    <ProjectCard
      key="btsp"
      index={1}
      href="/projects/btsp"
      title="BTSP"
      category="BIOX-WNCC PROJECT"
      imageSrc="/btsp.png"
      imageAlt="btsp"
    />,
    <ProjectCard
      key="pgm"
      index={2}
      imagePosition="top"
      href="/projects/probabilistic-graphic-model"
      title="PROBABILISTIC GRAPHIC MODEL"
      category="CONSUMER PRODUCT"
      imageSrc="/soc.jpeg"
      imageAlt="currency converter"
    />,
    <ProjectCard
      key="resume-rater"
      index={3}
      href="/projects/resume-rater"
      title="RESUME RATER"
      category="AI MODEL"
      imageSrc="/aic2.png"
      mediaType="image"
      imageAlt="resume rater"
    />,
    <ProjectCard
      key="wids"
      index={4}
      imageFit="contain"
      href="/projects/wids-25"
      title="WiDS'25"
      category="TRADING ALGORITHM"
      imageSrc="/dqn2.png"
      imageAlt="wids"
    />,
    <ProjectCard
      key="instigpt"
      index={5}
      href="/projects/instigpt"
      title="InstiGPT"
      category="AIC NLP PROJECT"
      imageSrc="/instigpt copy.mp4"
      imageAlt="instigpt"
      mediaType="video"
    />,
    <ProjectCard
      key="karyogram"
      index={6}
      href="/projects/karyogram"
      title="Karyogram"
      category="MEDICAL IMAGING PROJECT"
      imageSrc="/karyo.png"
      imageAlt="karyogram"
    />,
  ];

  return (
    <div className="w-full bg-[#111111] py-4 pt-2">
      <div className="max-w-5xl mx-auto px-5">
        <SectionReveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {projectCards}
          {/* Add more ProjectCard components as needed */}
        </SectionReveal>
      </div>
    </div>
  );
};

export { ProjectsGrid };
