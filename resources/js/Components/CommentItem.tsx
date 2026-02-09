import { Comment } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { can } from "@/helpers";

export default function CommentItem({ comment }: { comment: Comment }) {
  const user = usePage().props.auth.user;
  const form = useForm();

  const deleteComment = () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    form.delete(route("comment.destroy", comment.id), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm mb-2">
      {/* Dynamic Avatar */}
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-sm">
          {comment.user.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 truncate">
              {comment.user.name}
            </h3>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
              {comment.created_at}
            </span>
          </div>

          {/* Persistent Delete Action */}
          {can(user, "manage_comments") && comment.user.id === user.id && (
            <div className="shrink-0">
              <button
                onClick={deleteComment}
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all duration-200"
                aria-label="Delete comment"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="mt-2 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {comment.comment}
        </div>
      </div>
    </div>
  );
}
