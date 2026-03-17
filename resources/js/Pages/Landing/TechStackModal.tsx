import React from "react";

type TechStackModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function TechStackModal({
    open,
    onClose,
}: TechStackModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 flex flex-col max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-800/40 px-8 py-6 backdrop-blur-md">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-white">
                            Architecture & Technical Overview
                        </h2>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mt-2">
                            System Specifications
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-all hover:bg-red-500/20 hover:text-red-400 hover:rotate-90"
                    >
                        <span className="text-2xl">✕</span>
                    </button>
                </div>

                {/* Content*/}
                <div className="overflow-y-auto px-8 py-8 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                    <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                        <Section
                            title="High-Level Architecture"
                            content={[
                                "Full-stack Inertia architecture with Laravel as backend and SSR renderer.",
                                "React handles UI composition and client-side interactions.",
                            ]}
                        />

                        <Section
                            title="Backend — Laravel 11"
                            content={[
                                "RESTful controllers returning Inertia responses.",
                                "Spatie Permissions for role-based authorization.",
                                "Server-enforced role checks for protected actions.",
                            ]}
                        />

                        <Section
                            title="Frontend — React + TypeScript"
                            content={[
                                "Strict typing with TypeScript.",
                                "Page-based architecture aligned with Inertia lifecycles.",
                                "No global state managers; state scoped per page.",
                            ]}
                        />

                        <Section
                            title="Inertia.js v2 & SSR"
                            content={[
                                "Full Server-Side Rendering enabled.",
                                "Initial page loads rendered on the server.",
                                "Hydration-safe components with no client-only side effects.",
                            ]}
                        />

                        <Section
                            title="Feature Voting Mechanics"
                            content={[
                                "Upvote / downvote system with vote integrity enforcement.",
                                "One vote per user per feature.",
                                "Votes aggregated server-side for consistency.",
                            ]}
                        />

                        <Section
                            title="Comment System"
                            content={[
                                "Feature-specific comments scoped to individual features.",
                                "Restricted to Commenter and Admin roles.",
                                "Clear separation between voting and discussion logic.",
                            ]}
                        />

                        <Section
                            title="Role-Based Access Control"
                            content={[
                                "Three roles: User, Commenter, Admin.",
                                "Default role assignment on registration.",
                                "Roles enforced exclusively on the backend.",
                            ]}
                        />

                        <Section
                            title="Security & Best Practices"
                            content={[
                                "CSRF protection enabled.",
                                "Authorization checks on all sensitive actions.",
                                "No role logic trusted from client input.",
                            ]}
                        />

                        <div className="md:col-span-2">
                            <Section
                                title="Design Decisions"
                                content={[
                                    "Stack chosen to balance performance, productivity, and maintainability.",
                                ]}
                            />
                        </div>
                    </div>

                    {/* Footer Note*/}
                    <div className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-900/20 p-6 text-sm text-blue-200 backdrop-blur-sm">
                        <div className="flex gap-4 items-center">
                            <span className="text-3xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">💡</span>
                            <p className="leading-relaxed font-medium">
                                This is a demo environment. Data may reset periodically
                                and authentication is simplified for demonstration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, content }: { title: string; content: string[] }) {
    return (
        <section className="group rounded-2xl bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1">
            <h3 className="mb-5 flex items-center gap-3 text-lg font-black text-white">
                <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all group-hover:scale-150" />
                {title}
            </h3>
            <ul className="space-y-3">
                {content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300 font-medium">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400/60" />
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
}