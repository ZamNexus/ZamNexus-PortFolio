import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const articles = [
    {
      title: "How We Optimized Microsecond Latency Across 32 Global Regions",
      category: "Cloud Engineering",
      date: "September 2026",
      readTime: "6 min read",
      summary: "A technical architectural breakdown of edge container orchestration, DNS anycast routing, and zero-cold-start runtime strategies.",
      author: "Mir Mujeeb Ul Hassan",
    },
    {
      title: "Building Production-Grade Autonomous Agents with RAG Memory Graphs",
      category: "Artificial Intelligence",
      date: "August 2026",
      readTime: "9 min read",
      summary: "Why vector search alone isn't sufficient for complex enterprise reasoning loops, and how knowledge graphs bridge the gap.",
      author: "Zamooq AI Lab",
    },
    {
      title: "Zero-Trust Security in the Age of Automated Cyber Threats",
      category: "Cyber Security",
      date: "August 2026",
      readTime: "5 min read",
      summary: "Moving beyond perimeter defenses: cryptographic sandboxing, mutual TLS, and automated compliance policies.",
      author: "Zamooq Security Team",
    },
    {
      title: "Staff Augmentation vs. Dedicated Squads: Which Model Wins for Speed?",
      category: "Strategy & Consulting",
      date: "July 2026",
      readTime: "7 min read",
      summary: "How modern CTOs balance velocity, code quality, and overhead when rapidly expanding their engineering horsepower.",
      author: "Mir Mujeeb Ul Hassan",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />
      <Navbar currentPath="/BLog" />

      <main className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-6">
            Technical Perspectives & Insights
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Engineering Thought Leadership &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              Industry Trends
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Read perspectives from our engineers and leadership on cloud computing, autonomous AI, and enterprise digital transformation.
          </p>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art, i) => (
            <article
              key={i}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#D0FF71]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-[#D0FF71]/10 text-[#D0FF71] border border-[#D0FF71]/20 font-bold uppercase">
                    {art.category}
                  </span>
                  <span className="text-zinc-500">{art.date} • {art.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-white hover:text-[#D0FF71] transition-colors leading-snug cursor-pointer">
                  {art.title}
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">By {art.author}</span>
                <span className="text-xs font-semibold text-[#D0FF71] flex items-center gap-1">
                  Read article <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
