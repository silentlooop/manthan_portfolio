import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "./pages/project_details";
import Shaped from "./pages/shaped";
import Blogs from "./pages/blogs";
import NotFound from "./pages/not_found";
import { CommandTerminal } from "./components/ui/command-terminal";
import App from "./App";

function Loading({ exiting }: { exiting: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#111] transition-opacity duration-300 ${exiting ? "opacity-0" : "opacity-100"}`}
    >
      <div className="font-mono text-sm text-zinc-400 select-none" aria-live="polite">
        <span className="text-zinc-600">manthan@portfolio:~$</span>{" "}
        ./boot.sh
        <span
          className="ml-1 inline-block h-4 w-2 align-middle bg-zinc-400 animate-pulse"
          style={{ animationDuration: "1.1s" }}
        />
      </div>
    </div>
  );
}

export default function Root() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  // Easter egg: the tab title calls you back when you switch away.
  useEffect(() => {
    const originalTitle = document.title;
    const onVisibilityChange = () => {
      document.title = document.hidden ? "zsh: suspended — fg to resume" : originalTitle;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const startExitTimer = setTimeout(() => setExiting(true), 800);
    const doneTimer = setTimeout(() => setLoading(false), 1100);

    return () => {
      clearTimeout(startExitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (loading) {
    return <Loading exiting={exiting} />;
  }

  return (
    <BrowserRouter>
      <div className="cursor-default top-5">
        <main>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/shaped" element={<Shaped />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <CommandTerminal />
      </div>
    </BrowserRouter>
  );
}
