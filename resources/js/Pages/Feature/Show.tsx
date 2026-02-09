import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Feature, Comment } from "@/types";
import FeatureUpvoteDownvote from "@/Components/FeatureUpvoteDownvote";
import NewCommentForm from "@/Components/NewCommentForm";
import CommentItem from "@/Components/CommentItem";

export default function Show({
  feature,
  comments,
}: {
  feature: Feature;
  comments: Comment[];
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Feature:{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {feature.name}
          </span>
        </h2>
      }
    >
      <Head title={"Feature " + feature.name} />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Main Content Card */}
        <div className="mb-6 overflow-hidden bg-white shadow-md sm:rounded-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Voting Section */}
            <div className="flex md:block justify-center shrink-0">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 h-fit">
                <FeatureUpvoteDownvote feature={feature} />
              </div>
            </div>

            {/* Feature Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-gray-900 dark:text-slate-50">
                {feature.name}
              </h1>

              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {feature.description}
              </div>

              {/* Comments Section */}
              {comments && (
                <div className="mt-12">
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Discussion
                    </h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {comments.length}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <NewCommentForm feature={feature} />

                    <div className="grid gap-4 mt-8">
                      {comments.map((comment) => (
                        <CommentItem comment={comment} key={comment.id} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
