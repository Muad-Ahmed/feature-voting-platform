import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    // Main container with deep navy gradient
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-[#161e2e] dark:bg-gradient-to-b dark:from-[#161e2e] dark:to-[#0b0f1a]">
      {/* Logo with hover scaling and glow effect */}
      <div className="z-10 transition-transform duration-500 hover:scale-110">
        <Link href="/">
          <ApplicationLogo className="h-20 w-20 fill-current text-primary-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </Link>
      </div>

      {/* Glassmorphism card container */}
      <div className="relative mt-6 w-full px-6 py-8 sm:max-w-md">
        {/* Background glow for the card */}
        <div className="absolute inset-0 -z-10 transform rounded-2xl bg-primary-500/10 blur-2xl"></div>

        {/* Main content area with blur and subtle border */}
        <div className="overflow-hidden border border-white/10 bg-white px-6 py-4 shadow-xl backdrop-blur-md sm:rounded-2xl dark:bg-white/[0.03]">
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
