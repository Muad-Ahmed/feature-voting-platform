import { Feature } from "@/types";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import FeatureActionsDropdown from "@/Components/FeatureActionsDropdown";
import FeatureUpvoteDownvote from "@/Components/FeatureUpvoteDownvote";

export default function FeatureItem({ feature }: { feature: Feature }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-6 overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 sm:rounded-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="p-5 sm:p-7 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row gap-5 md:gap-8">
        {/* Voting Section */}
        <div className="flex md:block justify-center shrink-0">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
            <FeatureUpvoteDownvote feature={feature} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header and Actions */}
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-xl md:text-2xl mb-3 font-bold tracking-tight">
              <Link
                href={route("feature.show", feature)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {feature.name}
              </Link>
            </h2>
            {/*Actions */}
            <div className="shrink-0">
              <FeatureActionsDropdown feature={feature} />
            </div>
          </div>
          {/* Feature Description */}
          <div className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400">
            {(feature.description || "").length > 200 && (
              <>
                <p className="whitespace-pre-wrap">
                  {isExpanded
                    ? feature.description
                    : `${(feature.description || "").slice(0, 200)}...`}
                </p>

                <button
                  onClick={toggleReadMore}
                  className="text-blue-500 font-medium hover:text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1 transition-all"
                >
                  {isExpanded ? "Show less ↑" : "Read more ↓"}
                </button>
              </>
            )}
            {(feature.description || "").length <= 200 && (
              <p className="whitespace-pre-wrap">{feature.description}</p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex items-center gap-3">
            <Link
              href={route("feature.show", feature)}
              className="inline-flex items-center justify-center gap-2 py-2 px-6 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-transparent hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:scale-110 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125l-.375 3.375 3.375-3.375h9.75c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125H6.75z"
                />
              </svg>
              Comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
