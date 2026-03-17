import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import TechStackModal from "./TechStackModal";
import ChatbotWidget from "@/Components/ChatbotWidget";

export default function LandingPage() {
  const [showTechStack, setShowTechStack] = useState(false);

  return (
    <main className="min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30 selection:text-white">
      {/* Inertia Head: Title and SEO Metadata */}
      <Head>
        <title>VoteFlow - Community-Driven Feature Voting Platform</title>
        <meta
          name="description"
          content="VoteFlow is a full-stack feature voting platform built with Laravel 11, React, and Inertia.js. Empowers communities to submit, discuss, and prioritize features with a robust role-based access system."
        />
      </Head>
      {/* =======================
                Top Bar
          ======================= */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/60 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">

              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                <span className="text-white font-bold text-sm">V</span>

              </div>

              <span className="text-sm font-bold tracking-tight text-white uppercase">
                VoteFlow
              </span>

            </div>

            <span className="hidden sm:inline-block h-4 w-[1px] bg-white/10"></span>

            <span className="hidden sm:inline-block rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-500/20">
              Demo Application
            </span>

          </div>

          <div className="flex items-center gap-6">

            <Link
              href={route("login")}
              className="text-sm font-bold text-slate-300 hover:text-white border-l pl-6 border-white/10 transition-colors"
            >
              Login
            </Link>

          </div>

        </div>

      </header>

      {/* =======================
                Hero Section
          ======================= */}

      <section className="relative overflow-hidden h-screen max-h-[900px] min-h-[650px] flex items-center pt-8 pb-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[#030712]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-7 flex flex-col items-start mt-[-2rem]">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Feature Voting Platform
              <br />
              <span className="text-3xl lg:text-4xl font-bold text-slate-300">for </span>
              <span className="text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Community-Driven Feature Prioritization
              </span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl leading-relaxed text-slate-400 max-w-2xl">
              A full-stack feature voting platform where users can submit ideas,
              vote on features, and participate in feature-specific discussions
              — powered by a role-based permission system.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <p className="text-sm font-medium text-slate-400">
                <span className="font-bold text-white italic">
                  Built with Laravel 11, React (TypeScript), Inertia.js v2, and
                  Spatie Permissions
                </span>{" "}
                — Fully SSR &amp; SEO-ready.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowTechStack(true)}
              className="mt-8 w-full md:w-5/6 inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 border-2 px-10 py-5 text-sm font-black transition-all border-white/10 text-white shadow-[0_10px_30px_rgba(30,64,175,0.1)] hover:shadow-[0_20px_40px_rgba(30,64,175,0.2)] hover:-translate-y-1.5 active:scale-[0.98] hover:border-blue-500/50 hover:bg-white/10"
            >
              <span className="text-xl">🛠️</span>
              VIEW TECHNICAL ARCHITECTURE & STACK
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4 lg:-translate-x-10 w-full max-w-sm lg:ml-auto mt-[-2rem]">
            <Link
              href={route("demo.quick-login", { role: "admin" })}
              method="post"
              as="button"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-8 py-5 text-sm font-black text-white shadow-2xl shadow-blue-500/40 transition-all hover:bg-blue-700 hover:scale-[1.05] active:scale-95 ring-4 ring-blue-500/20 animate-[bounce_3s_infinite]"
            >
              <span className="mr-2">Enter demo as Admin</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <div className="flex items-center justify-center mb-1 -mt-3 px-2">
              <p className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="text-slate-400 animate-pulse mr-2">●</span>
                Full Access
                <span className="mx-2 text-slate-600">|</span>
                Manage Features
                <span className="mx-2 text-slate-600">|</span>
                Control Roles
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <Link
                href={route("demo.quick-login", { role: "commenter" })}
                method="post"
                as="button"
                className="group relative flex-1 inline-flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 px-2 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <span className="text-[11px] text-center">Enter demo as Commenter</span>
              </Link>

              <Link
                href={route("demo.quick-login", { role: "user" })}
                method="post"
                as="button"
                className="group relative flex-1 inline-flex items-center justify-center overflow-hidden rounded-xl bg-white/5 border border-white/10 px-2 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <span className="text-[11px] text-center">Enter demo as User</span>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 mt-4">
              <p className="flex mb-1 items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                Demo accounts — no registration required.
              </p>

              <div className="flex items-center w-full gap-4 text-slate-500">
                <div className="h-[1px] w-full bg-slate-800"></div>
                <span className="text-xs font-bold text-slate-500">or</span>
                <div className="h-[1px] w-full bg-slate-800"></div>
              </div>

              <Link
                href={route("login")}
                className="w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent px-8 py-3 text-[13px] font-medium text-slate-400 transition-all hover:text-white hover:border-white/30 hover:bg-white/5 active:scale-95"
              >
                Sign in via Standard Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
                Core Features
          ======================= */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon="🗳️"
            title="Feature Voting System"
            description="Upvote and downvote proposed features with instant feedback and dynamic ranking."
          />

          <FeatureCard
            icon="💬"
            title="Feature-Based Comment System"
            description="Comments scoped per feature to capture qualitative feedback."
          />

          <FeatureCard
            icon="🛡️"
            title="Three-Tier Role System"
            description="User, Commenter, and Admin roles managed via permissions."
          />

          <FeatureCard
            icon="🚀"
            title="Server-Side Rendering"
            description="Fully SSR-enabled for performance, accessibility, and SEO optimization."
          />

        </div>

      </section>

      {/* =======================
                Roles Section
          ======================= */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One Platform, Three Personas
          </h2>

          <p className="mt-4 text-slate-400">
            Experience how permissions dynamically change the UI based
            onassigned roles.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <RoleCard
            role="Regular User"
            color="blue"
            items={[
              "Vote on features",
              "View discussions",
              "Assigned automatically on registration",
            ]}
          />

          <RoleCard
            role="Commenter"
            color="indigo"
            items={["All User permissions", "Post and manage comments"]}
          />

          <RoleCard
            role="Admin"
            color="slate"
            items={[
              "Full access to the platform",
              "Create and manage features",
              "Assign and update user roles",
            ]}
          />

        </div>

      </section>

      {/* =======================
                Demo Access CTA
          ======================= */}

      <section className="mx-6 mb-20">

        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white/5 border border-white/10 p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>

          <div className="absolute bottom-0 left-0 h-24 w-24 bg-blue-500/10 rounded-full -ml-12 -mb-12"></div>

          <h3 className="text-3xl font-bold text-white">
            Ready to test the architecture?
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Access the full functionality using preconfigured demo
            accounts.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
            <Link
              href={route("demo.quick-login", { role: "admin" })}
              method="post"
              as="button"
              className="col-span-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white text-center transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Enter demo as Admin
            </Link>

            <Link
              href={route("demo.quick-login", { role: "commenter" })}
              method="post"
              as="button"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-4 text-sm font-bold text-white text-center backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Enter demo as Commenter
            </Link>

            <Link
              href={route("demo.quick-login", { role: "user" })}
              method="post"
              as="button"
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-4 text-sm font-bold text-white text-center backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Enter demo as User
            </Link>
          </div>
        </div>

      </section>

      {/* =======================
                Footer
          ======================= */}

      <footer className="border-t border-white/5 bg-[#030712] py-12">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="text-sm font-medium text-slate-400">
            Demo project built to showcase
            <span className="text-white">
              {" "}
              full-stack architecture, role-based access control, and SSR with
              Inertia.js.
            </span>

          </p>

          <p className="mt-2 text-xs text-slate-600 uppercase tracking-widest font-bold">
            Full Stack Showcase 2026
          </p>

        </div>

      </footer>

      <TechStackModal
        open={showTechStack}
        onClose={() => setShowTechStack(false)}
      />
      <ChatbotWidget />
    </main>
  );
}

/* =======================
    Sub Components
======================= */

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group rounded-3xl border-t-[4px] border-t-blue-500 border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400 font-medium">
        {description}
      </p>

    </div>
  );
}

function RoleCard({
  role,
  items,
  color,
}: {
  role: string;
  items: string[];
  color: string;
}) {
  const colors: any = {
    blue: "bg-blue-500/20 text-blue-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
    slate: "bg-slate-700/50 text-slate-300",
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 shadow-xl p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">

      <div
        className={`absolute top-0 right-0 px-5 py-2 rounded-bl-2xl text-[11px] font-black uppercase tracking-widest ${colors[color]}`}
      >
        {role.split(" ")[0]}
      </div>
      <h4 className="text-2xl font-extrabold text-white mt-2">{role}</h4>
      <ul className="mt-8 space-y-4">

        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-4 text-sm font-medium text-slate-400"
          >

            <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            {item}
          </li>
        ))}

      </ul>

    </div>
  );
}
