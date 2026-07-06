import { NavBar } from "../components/ui/about";
import { SectionHeader, SectionPrompt, SectionReveal } from "../components/ui/terminal-effects";

const BLOGS = [
    {
        slug: "the boy who wouldn't shut up",
        title: "",
        date: "2025-09-24",
        url: "https://medium.com/@pattedamanthan/the-boy-who-wouldnt-shut-up-15f1eb4406f5"
    }
];

const Blogs = () => {
    const sortedBlogs = [...BLOGS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-[#111111] text-white font-sfmono pt-24 pb-20">
                <div className="w-full px-5 max-w-5xl mx-auto">
                    <SectionPrompt command="cat ./blogs" className="mb-6" />
                    

                    <div className="bg-[#111111] rounded-md p-6 border border-white/10 shadow-sm shadow-white/5">
                        <div className="mb-6 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded bg-red-500/80 inline-block" />
                            <span className="h-2.5 w-2.5 rounded bg-yellow-500/80 inline-block" />
                            <span className="h-2.5 w-2.5 rounded bg-green-500/80 inline-block" />
                            <span className="ml-3 text-gray-400 text-xs">manthan@portfolio:~/blogs$</span>
                        </div>

                        <div className="font-mono text-sm text-gray-500 mb-4">$ ls ./blogs</div>
                        <SectionReveal className="space-y-2">
                            {sortedBlogs.map((blog) => (
                                <a
                                    key={blog.slug}
                                    href={blog.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block rounded border border-transparent px-2 py-2 transition-colors hover:border-white/10 hover:bg-white/[0.02]"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-gray-600 text-sm">-</span>
                                            <span className="truncate text-gray-100 group-hover:text-white">
                                                {blog.slug}.md
                                            </span>
                                        </div>
                                        <div className="pl-4 sm:pl-0 text-xs text-gray-500 shrink-0">
                                            {blog.date}
                                        </div>
                                    </div>
                                    <div className="pl-6 text-sm text-gray-400 group-hover:text-gray-300 mt-1">
                                        {blog.title}
                                    </div>
                                </a>
                            ))}
                        </SectionReveal>

                        <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">
                            <span>manthan@portfolio:~/blogs$</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;
