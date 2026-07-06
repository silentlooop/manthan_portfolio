"use client"

import { useEffect } from "react"

import { ProjectsGrid } from "./components/ui/Projects2"
import { About, NavBar } from "./components/ui/about"
import { SectionPrompt } from "./components/ui/terminal-effects"

function App() {
  useEffect(() => {
    const scrollToWorkFromHash = () => {
      if (window.location.hash !== "#work") return;

      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const isReload = navEntry?.type === "reload";

      if (isReload) {
        const cleanUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, "", cleanUrl);
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      let attempts = 0;
      const maxAttempts = 30;

      const timer = setInterval(() => {
        const workSection = document.getElementById("work");
        if (workSection) {
          workSection.scrollIntoView({ behavior: "smooth", block: "start" });
          clearInterval(timer);
          return;
        }

        attempts += 1;
        if (attempts >= maxAttempts) {
          clearInterval(timer);
        }
      }, 80);

      return timer;
    };

    const activeTimer = scrollToWorkFromHash();
    window.addEventListener("hashchange", scrollToWorkFromHash);

    return () => {
      if (activeTimer) clearInterval(activeTimer);
      window.removeEventListener("hashchange", scrollToWorkFromHash);
    };
  }, []);


  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col bg-[#111111] text-gray-200 scale-100 relative overflow-hidden">

        {/* About section */}
        <div className="z-15 mb-[-10px]">
          <About />
        </div>

        {/* Projects */}
        <div id="work" className="z-15 w-full">
          <div className="w-full px-5 mt-20 max-w-5xl mx-auto">
            <SectionPrompt command="cd ./selected-work" className="mb-6" />
          </div>
          <ProjectsGrid />
        </div>

        {/* Art */}

        {/* Footer */}
        <div className="z-15 mt-12">
          <footer className="flex flex-col items-center body bg-[#1C1C1C] dot-grid z-[1] w-full sticky bottom-0 text-zinc-100 font-sfmono">
            <section className="w-full max-w-8xl relative z-10 pb-6 pt-6 px-3" style={{ opacity: 1 }}>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-sfmono text-[14px] leading-none">
                <span className="flex flex-row items-center gap-2">
                  <p className="self-center w-min px-2 pt-1 pb-[2px] font-sfmono lowercase text-zinc-400 border-zinc-400 border border-solid rounded-full">v5.0.0</p>
                  <p className="self-center px-2 pt-1 pb-[2px] font-sfmono uppercase text-zinc-500">Last updated 2025-05-01{/* --> */} </p>
                </span>
                <span className="ml-auto flex flex-row flex-wrap items-center justify-end gap-x-4 gap-y-2 text-right">
                  <span className="inline-flex items-center gap-1 text-zinc-500 transition-colors hover:text-white">
                    <a className="cursor-pointer border-b border-dotted border-transparent px-[2px] pt-[2px] transition-colors hover:border-current" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/manthan-p-6457b3313">Linkedin</a><sup className="font-sfmono leading-[0] text-[12px] font-light text-current">↗</sup>
                  </span>

                  <span className="inline-flex items-center gap-1 text-zinc-500 transition-colors hover:text-white">
                    <a className="cursor-pointer border-b border-dotted border-transparent px-[2px] pt-[2px] transition-colors hover:border-current" target="_blank" rel="noreferrer" href="https://x.com/null_rejected">Twitter</a><sup className="font-sfmono leading-[0] text-[12px] font-light text-current">↗</sup>
                  </span>
                </span>
              </div>
            </section>
          </footer>
        </div>


      </div>
    </>
  )

}

export default App
