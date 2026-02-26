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
\            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 flex flex-col max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white bg-slate-50 shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-white/50 px-8 py-6 backdrop-blur-md">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900">
                            Architecture & Technical Overview
                        </h2>
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mt-1">
                            System Specifications
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors hover:bg-red-100 hover:text-red-600"
                    >
                        <span className="text-xl">✕</span>
                    </button>
                </div>

                {/* Content*/}
                <div className="overflow-y-auto px-8 py-8 scrollbar-thin scrollbar-thumb-slate-300">
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
                    <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-sm text-blue-800">
                        <div className="flex gap-3">
                            <span className="text-xl">💡</span>
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
        <section className="group">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 transition-all group-hover:scale-150" />
                {title}
            </h3>
            <ul className="space-y-2.5">
                {content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-[13px] leading-relaxed text-slate-600">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
}