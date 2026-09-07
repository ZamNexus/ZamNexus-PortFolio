"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    const pillars = [
        {
            id: 1,
            title: "Innovate with Precision",
            tag: "INNOVATE",
            desc: "We engineer breakthrough digital capabilities and AI systems that solve real operational bottlenecks.",
            icon: "⚡",
        },
        {
            id: 2,
            title: "Create with Craftsmanship",
            tag: "CREATE",
            desc: "Every line of code and infrastructure component is crafted with rigorous security and performance standards.",
            icon: "🧠",
        },
        {
            id: 3,
            title: "Deliver Measurable Impact",
            tag: "DELIVER",
            desc: "Technology must drive business growth, reduce latency overhead, and generate sustainable ROI.",
            icon: "🎯",
        },
    ];

    return (
        <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
            <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />
            <Navbar currentPath="/About" />

            <main className="relative z-10 pt-32 pb-20">
                <section className="max-w-6xl mx-auto px-6 mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-6">
                        About Zamooq
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
                        Innovate, Create, Deliver:{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
                            Software That Drives Impact
                        </span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Zamooq is a premier software development and technical consulting firm dedicated to building transformative digital experiences for enterprise innovators.
                    </p>
                </section>

                {/* OWNER & CEO FEATURED SPOTLIGHT */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
                            {/* Monogram Badge */}
                            <div className="relative flex-shrink-0">
                                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#D0FF71] p-1 shadow-2xl shadow-[#D0FF71]/20">
                                    <div className="w-full h-full bg-[#090b10] rounded-[20px] flex flex-col items-center justify-center text-center">
                                        <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#D0FF71]">MH</span>
                                        <span className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">CEO</span>
                                    </div>
                                </div>
                                <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#D0FF71] text-black font-bold text-xs shadow-md">
                                    Founder
                                </span>
                            </div>

                            {/* Bio Details */}
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D0FF71]/10 text-[#D0FF71] border border-[#D0FF71]/20 text-xs font-mono font-bold">
                                    EXECUTIVE LEADERSHIP
                                </div>

                                <div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                                        Mir Mujeeb Ul Hassan
                                    </h2>
                                    <p className="text-[#D0FF71] font-semibold text-lg sm:text-xl mt-1">
                                        Owner & Chief Executive Officer (CEO)
                                    </p>
                                </div>

                                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed pt-2">
                                    &ldquo;At Zamooq, our philosophy is rooted in building software that doesn&apos;t just function, but fundamentally moves our clients forward. By marrying deep technical craftsmanship with agile consulting, we empower organizations to lead in their respective markets.&rdquo;
                                </p>

                                <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-zinc-400 font-mono">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#D0FF71]" />
                                        <span>Strategic Consulting</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#D0FF71]" />
                                        <span>Global Engineering</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#D0FF71]" />
                                        <span>Digital Transformation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Pillars */}
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <div className="text-center mb-12">
                        <h3 className="text-xs uppercase tracking-widest text-[#D0FF71] font-mono font-bold mb-2">Our Manifesto</h3>
                        <h4 className="text-3xl font-bold tracking-tight text-white">Core Pillars of Zamooq</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.id}
                                className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#D0FF71]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
                            >
                                <div className="text-3xl mb-4 inline-block">
                                    {pillar.icon}
                                </div>
                                <div className="text-[10px] font-mono font-bold tracking-wider text-[#D0FF71] uppercase mb-2">
                                    {pillar.tag}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {pillar.title}
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="max-w-6xl mx-auto px-6 text-center">
                    <div className="p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Ready to collaborate with our team?
                        </h3>
                        <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm">
                            Connect directly with Mir Mujeeb Ul Hassan and our senior technical leads to map out your software roadmap.
                        </p>
                        <Link href="/Contact" className="liquid-lime-btn text-base py-3.5 px-8">
                            <span>Start a project with Zamooq</span>
                            <span className="arrow-icon w-8 h-8 text-sm">→</span>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
