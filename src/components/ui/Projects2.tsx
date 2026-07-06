import React from "react";

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

  // Determine media type from file extension if not explicitly provided
  const isVideo = mediaType === "video" ||
    imageSrc.endsWith('.mp4') ||
    imageSrc.endsWith('.webm') ||
    imageSrc.endsWith('.ogg') ||
    imageSrc.endsWith('.mov');

  return (
    <Wrapper
      href={href}
      className="group/card block mb-4 break-inside-avoid bg-[#111111] transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-75 relative px-0.5 py-0.5 "
      {...(href ? { target: "_self", rel: "noopener noreferrer" } : {})}
      style={{
        fontFamily:
          '"SF Mono", "Space Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
      }}
    >
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
  return (
    <div className="w-full bg-[#111111] py-10 pt-4">
      <div className="max-w-5xl mx-auto px-5">
        <div className="columns-1 sm:columns-2 md:columns-2 gap-4 group/grid">
          <ProjectCard
            href="/projects/btsp"
            title="BTSP"
            category="BIOX-WNCC PROJECT"
            imageSrc="/btsp.png"
            imageAlt="btsp"
          />
          <ProjectCard
            href="/projects/probabilistic-graphic-model"
            title="PROBABILISTIC GRAPHIC MODEL"
            category="CONSUMER PRODUCT"
            imageSrc="/soc.jpeg"
            imageAlt="currency converter"
          />
          <ProjectCard
            href="/projects/resume-rater"
            title="RESUME RATER"
            category="AI MODEL"
            imageSrc="/aic2.png"
            mediaType="image"
            imageAlt="resume rater"
          />
          <ProjectCard
            href="/projects/wids"
            title="WiDS'25"
            category="TRADING ALGORITHM"
            imageSrc="/dqn2.png"
            imageAlt="wids"
          />
          <ProjectCard
            href="/projects/instigpt"
            title="InstiGPT"
            category="AIC NLP PROJECT"
            imageSrc="/instigpt copy.mp4"
            imageAlt="instigpt"
            mediaType="video"
          />
          <ProjectCard
            href="/projects/karyogram"
            title="Karyogram"
            category="MEDICAL IMAGING PROJECT"
            imageSrc="/karyo.png"
            imageAlt="karyogram"
          />
          {/* Add more ProjectCard components as needed */}
        </div>
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
    <div className="w-full bg-[#111111] py-10 pt-4">
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
