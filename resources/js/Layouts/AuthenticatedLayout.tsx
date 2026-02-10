import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import {
  PropsWithChildren,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import { can } from "@/helpers";

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;
  const success: any = usePage().props.success;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (!navRef.current) return;
      const target = e.target as Node;
      if (!navRef.current.contains(target)) {
        setShowingNavigationDropdown(false);
      }
    };

    // pointerdown is better than click to capture events before any interference
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Nav - ref placed here to include all navbar content */}
      <nav
        ref={navRef}
        className=" top-0 z-40 border-b border-white/20 bg-white/70 shadow-sm dark:border-gray-700/30 dark:bg-gray-800/70"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link
                  href="/"
                  className="transition-transform hover:scale-105 active:scale-95"
                >
                  <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600 dark:text-blue-400" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  prefetch={["mount", "hover"]}
                  href={route("feature.index")}
                  active={route().current("feature.index")}
                >
                  Features
                </NavLink>
                {can(user, "manage_users") && (
                  <NavLink
                    prefetch
                    href={route("user.index")}
                    active={route().current("user.index")}
                  >
                    Users
                  </NavLink>
                )}
              </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-full shadow-sm">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/40 px-3 py-1.5 text-sm font-medium leading-4 text-gray-700 transition duration-200 hover:bg-white/60 hover:shadow-md focus:outline-none dark:border-gray-600/30 dark:bg-gray-700/40 dark:text-gray-300 dark:hover:bg-gray-700/60"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-[10px] font-bold uppercase text-blue-600 shadow-inner dark:bg-blue-400/10 dark:text-blue-400">
                          {user.name.charAt(0)}
                        </div>

                        <span className="max-w-[120px] truncate font-semibold tracking-tight">
                          {user.name}
                        </span>

                        <svg
                          className="h-4 w-4 opacity-40"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content contentClasses="py-1 -mt-1 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 shadow-2xl backdrop-none">
                    <Dropdown.Link prefetch href={route("profile.edit")}>
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="text-red-600 dark:text-red-400"
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((p) => !p)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-white/50 dark:hover:bg-gray-700/50"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") +
            " sm:hidden border-t border-white/10 dark:border-gray-700/50"
          }
        >
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink
              href={route("feature.index")}
              active={route().current("feature.index")}
            >
              Features
            </ResponsiveNavLink>
            {can(user, "manage_users") && (
              <ResponsiveNavLink
                href={route("user.index")}
                active={route().current("user.index")}
              >
                Users
              </ResponsiveNavLink>
            )}
          </div>
          <div className="border-t border-white/10 pb-1 pt-4 dark:border-gray-700/50">
            <div className="px-4 font-medium text-gray-800 dark:text-gray-200">
              {user.name}
            </div>
            <div className="mt-3 space-y-1">
              <ResponsiveNavLink prefetch href={route("profile.edit")}>
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      {header && (
        <header className="bg-white/40 border-b border-white/20 shadow-sm dark:bg-gray-800/40 dark:border-gray-700/30">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Main */}
      <main className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
          {success && (
            <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-600/90 text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-semibold italic">{success}</span>
            </div>
          )}

          <div className="animate-in fade-in duration-500">{children}</div>
        </div>
      </main>
    </div>
  );
}
