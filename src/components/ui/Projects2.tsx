import React from "react";
import { SectionReveal } from "./terminal-effects";

interface ProjectCardProps {
  href?: string;
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  mediaType?: "image" | "video";
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  title,
  category,
  imageSrc,
  imageAlt,
  mediaType = "image",
}) => {
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
      className="group/card block mb-4 break-inside-avoid bg-[#111111] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-75 relative px-0.5 py-0.5"
      {...(href ? { target: "_self", rel: "noopener noreferrer" } : {})}
      style={{
        fontFamily:
          '"SF Mono", "Space Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
      }}
    >
      <div className="pointer-events-none absolute right-3 top-3 z-10 opacity-0 translate-y-1 transition-all duration-200 ease-out md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 group-active/card:opacity-100 group-active/card:translate-y-0 group-focus/card:opacity-100 group-focus/card:translate-y-0">
        <span className="inline-flex rounded border border-white/10 bg-black/70 px-2 py-1 text-[11px] text-gray-300 shadow-lg backdrop-blur-sm">
          $ open ./projects/{projectSlug}
        </span>
      </div>
      <article>
        {isVideo ? (
          <video
            src={imageSrc}
            className="w-full h-auto object-contain"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-contain"
          />
        )}
      </article>
      <div className="pt-2 pb-3 px-3">
        <div className="font-semibold text-white text-base">{title}</div>
        <div className="text-zinc-500 text-xs mt-[2px]">{category}</div>
      </div>
    </Wrapper>
  );
};

const ProjectsGrid: React.FC = () => {
  const projectCards = [
    <ProjectCard
      key="btsp"
      href="/projects/btsp"
      title="BTSP"
      category="BIOX-WNCC PROJECT"
      imageSrc="/btsp.png"
      imageAlt="btsp"
    />,
    <ProjectCard
      key="pgm"
      href="/projects/probabilistic-graphic-model"
      title="PROBABILISTIC GRAPHIC MODEL"
      category="CONSUMER PRODUCT"
      imageSrc="/soc.jpeg"
      imageAlt="currency converter"
    />,
    <ProjectCard
      key="resume-rater"
      href="/projects/resume-rater"
      title="RESUME RATER"
      category="AI MODEL"
      imageSrc="/aic2.png"
      mediaType="image"
      imageAlt="resume rater"
    />,
    <ProjectCard
      key="wids"
      href="/projects/wids"
      title="WiDS'25"
      category="TRADING ALGORITHM"
      imageSrc="/dqn2.png"
      imageAlt="wids"
    />,
    <ProjectCard
      key="instigpt"
      href="/projects/instigpt"
      title="InstiGPT"
      category="AIC NLP PROJECT"
      imageSrc="/instigpt copy.mp4"
      imageAlt="instigpt"
      mediaType="video"
    />,
    <ProjectCard
      key="karyogram"
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
        <SectionReveal className="columns-1 sm:columns-2 md:columns-2 gap-4 group/grid" itemClassName="break-inside-avoid">
          {projectCards}
          {/* Add more ProjectCard components as needed */}
        </SectionReveal>
      </div>
    </div>
  );
};

interface ArtItem {
  imageSrc: string;
  imageAlt: string;
}

const ArtGrid: React.FC = () => {
  const artItems: ArtItem[] = [
    {
      imageSrc: "/details_img/art/Rohit Sharma.png",
      imageAlt: "Art piece one",
    },

    {
      imageSrc: "/details_img/art/zhao_lusi.png",
      imageAlt: "Art piece four",
    },
    {
      imageSrc: "/details_img/art/iphone%20poster_%202.52.51%E2%80%AFPM.png",
      imageAlt: "Art piece three",
    },
  ];

  return (
    <div className="w-full bg-[#111111] py-4 pt-2">
      <div className="max-w-5xl mx-auto px-5">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {artItems.map((item) => (
            <div
              key={item.imageSrc}
              className="group/card block mb-5 break-inside-avoid w-full bg-[#111111] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-90"
              style={{ fontFamily: '"SF Mono", "Space Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace' }}
            >
              <article className="overflow-hidden rounded-sm border border-[#232323] bg-[#0f0f0f]">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover/card:scale-[1.01]"
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProjectsGrid };
export { ArtGrid };
