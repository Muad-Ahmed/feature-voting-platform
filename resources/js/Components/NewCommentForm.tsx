import { Feature } from "@/types";
import TextAreaInput from "@/Components/TextAreaInput";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { can } from "@/helpers";

export default function NewCommentForm({ feature }: { feature: Feature }) {
  const user = usePage().props.auth.user;
  const { data, setData, post, processing } = useForm({
    comment: "",
  });

  const createComment: FormEventHandler = (ev) => {
    ev.preventDefault();
    if (!data.comment.trim()) return;

    post(route("comment.store", feature.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setData("comment", ""),
    });
  };

  if (!can(user, "manage_comments")) {
    return (
      <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center text-gray-500 dark:text-gray-400">
        You don't have permission to leave comments
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
      <form onSubmit={createComment} className="space-y-3">
        <div className="flex gap-4">
          {/* User Avatar Placeholder for Aesthetic touch */}
          <div className="hidden sm:block shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold uppercase">
              {user.name.charAt(0)}
            </div>
          </div>

          <div className="flex-1">
            <TextAreaInput
              rows={3}
              value={data.comment}
              onChange={(e) => setData("comment", e.target.value)}
              className="block w-full border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
              placeholder="Share your thoughts or feedback..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <PrimaryButton
            disabled={processing || !data.comment.trim()}
            // 1. Added ! to force background colors and override defaults
            className="px-6 py-2 !text-white !bg-blue-600 hover:!bg-blue-700 dark:!bg-blue-500 dark:hover:!bg-blue-400 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed border-none"
          >
            {processing ? "Posting..." : "Post Comment"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
