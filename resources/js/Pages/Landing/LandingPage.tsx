import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import TechStackModal from "./TechStackModal";

export default function LandingPage() {
  const [showTechStack, setShowTechStack] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 selection:bg-blue-100 selection:text-blue-700">
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
           
      <header className="sticky top-0 z-50 border-b  border-slate-400/30 backdrop-blur-md">
               
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                   
          <div className="flex items-center gap-4">
                       
            <div className="flex items-center gap-2">
                           
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                               
                <span className="text-white font-bold text-sm">V</span>         
                   
              </div>
                           
              <span className="text-sm font-bold tracking-tight text-slate-800 uppercase">
                                VoteFlow              
              </span>
                         
            </div>
                       
            <span className="hidden sm:inline-block h-4 w-[1px] bg-slate-200"></span>
                       
            <span className="hidden sm:inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                            Demo Application            
            </span>
                     
          </div>
                   
          <div className="flex items-center gap-6">
                                 
            <Link
              href={route("login")}
              className="text-sm font-bold text-slate-700 hover:text-slate-900 border-l pl-6 border-slate-200"
            >
                            Login            
            </Link>
                     
          </div>
                 
        </div>
             
      </header>
           
      {/* =======================
                Hero Section
          ======================= */}
           
      <section className="relative overflow-hidden pt-24 pb-20">
        {/* Background Blur Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-[100px]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
              Feature Voting Platform
              <br />
              <span className="text-3xl font-bold text-slate-900">for </span>
              <span className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Community-Driven Feature Prioritization
              </span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-slate-600">
              A full-stack feature voting platform where users can submit ideas,
              vote on features, and participate in feature-specific discussions
              — powered by a role-based permission system.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <p className="text-sm font-medium text-slate-500">
                <span className="font-bold text-slate-900 italic">
                  Built with Laravel 11, React (TypeScript), Inertia.js v2, and
                  Spatie Permissions
                </span>{" "}
                — Fully SSR &amp; SEO-ready.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowTechStack(true)}
              className="mt-6 w-full md:w-5/6 inline-flex items-center justify-center gap-3 rounded-2xl bg-white border-2 px-10 py-4 text-sm font-black transition-all border-blue-400 text-blue-600 shadow-[0_10px_30px_rgba(30,64,175,0.2)] hover:shadow-[0_15px_35px_rgba(30,64,175,0.3)] hover:-translate-y-1 active:scale-[0.98]"
            >
              <span className="text-xl">🛠️</span>
              VIEW TECHNICAL ARCHITECTURE & STACK
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4 lg:-translate-x-10 w-full max-w-sm lg:ml-auto">
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
                <span className="text-slate-600 animate-pulse mr-2">●</span>
                Full Access
                <span className="mx-2 text-slate-300">|</span>
                Manage Features
                <span className="mx-2 text-slate-300">|</span>
                Control Roles
              </p>
            </div>

            <Link
              href={route("demo.quick-login", { role: "commenter" })}
              method="post"
              as="button"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-slate-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-900 active:scale-95 opacity-90 hover:opacity-100"
            >
              <span className="mr-2 text-xs">Enter demo as Commenter</span>
              <span className="transition-transform group-hover:translate-x-1 text-xs">
                →
              </span>
            </Link>

            <Link
              href={route("demo.quick-login", { role: "user" })}
              method="post"
              as="button"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-slate-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-900 active:scale-95 opacity-90 hover:opacity-100"
            >
              <span className="mr-2 text-xs">Enter demo as User</span>
              <span className="transition-transform group-hover:translate-x-1 text-xs">
                →
              </span>
            </Link>

            <div className="flex flex-col items-center gap-2 mt-2">
              <p className="flex mb-1 items-center gap-2 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                Demo accounts — no registration required.
              </p>

              <div className="flex items-center w-full gap-4 text-slate-300">
                <div className="h-[1px] w-full bg-slate-200"></div>
                <span className="text-xs font-bold text-slate-500">or</span>
                <div className="h-[1px] w-full bg-slate-200"></div>
              </div>

              <Link
                href={route("login")}
                className="w-full inline-flex items-center justify-center rounded-xl border border-slate-500 bg-transparent px-8 py-3 text-[13px] font-medium text-slate-600 transition-all hover:text-slate-500 hover:border-slate-300 active:scale-95"
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
                   
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        One Platform, Three Personas          
          </h2>
                   
          <p className="mt-4 text-slate-600">
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
               
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-slate-900 p-12 text-center shadow-3xl relative overflow-hidden">
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
              className="col-span-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white text-center transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Enter demo as Admin
            </Link>

            <Link
              href={route("demo.quick-login", { role: "commenter" })}
              method="post"
              as="button"
              className="rounded-xl bg-white/10 px-4 py-4 text-sm font-bold text-white text-center backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Enter demo as Commenter
            </Link>

            <Link
              href={route("demo.quick-login", { role: "user" })}
              method="post"
              as="button"
              className="rounded-xl bg-white/10 px-4 py-4 text-sm font-bold text-white text-center backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Enter demo as User
            </Link>
          </div>
                 
        </div>
             
      </section>
           
      {/* =======================
                Footer
          ======================= */}
           
      <footer className="border-t border-slate-300 bg-slate-200 py-12">
               
        <div className="mx-auto max-w-7xl px-6 text-center">
                   
          <p className="text-sm font-medium text-slate-500">
                        Demo project built to showcase            
            <span className="text-slate-900">
              {" "}
              full-stack architecture, role-based access control, and SSR with
              Inertia.js.           
            </span>
                     
          </p>
                   
          <p className="mt-2 text-xs text-slate-400 uppercase tracking-widest font-bold">
                        Full Stack Showcase 2026          
          </p>
                 
        </div>
             
      </footer>
           
      <TechStackModal
        open={showTechStack}
        onClose={() => setShowTechStack(false)}
      />
         
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
    <div className="group rounded-2xl border-t-2 border-t-blue-500 border-x border-b border-slate-200  bg-white/70 backdrop-blur-md border shadow-sm bg-slate-200 p-8  transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
           
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl transition-colors group-hover:bg-blue-50">
                {icon}     
      </div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>     
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
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
    blue: "border-blue-100 bg-blue-50/30 text-blue-700",
    indigo: "border-indigo-100 bg-indigo-50/30 text-indigo-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <div className="rounded-2xl border-t-2 border-t-blue-500 border-x border-b border-slate-200 border bg-white/70 backdrop-blur-md   shadow-sm  bg-slate-200 p-8  relative overflow-hidden group">
           
      <div
        className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-tighter ${colors[color]}`}
      >
                {role.split(" ")[0]}     
      </div>
            <h4 className="text-xl font-bold text-slate-800">{role}</h4>     
      <ul className="mt-6 space-y-4">
               
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-slate-600"
          >
                       
            <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        {item}         
          </li>
        ))}
             
      </ul>
         
    </div>
  );
}
