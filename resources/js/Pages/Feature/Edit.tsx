import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Feature } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import TextAreaInput from "@/Components/TextAreaInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ feature }: { feature: Feature }) {
  const { data, setData, processing, errors, put } = useForm({
    name: feature.name,
    description: feature.description || "",
  });

  const updateFeature: FormEventHandler = (ev) => {
    ev.preventDefault();
    put(route("feature.update", feature.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Feature:{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {feature.name}
          </span>
        </h2>
      }
    >
      <Head title={"Edit Feature " + feature.name} />

      <div className="max-w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-md sm:rounded-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="p-6 sm:p-10">
            <div className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Feature Information
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update the details and description of your feature.
              </p>
            </div>

            <form onSubmit={updateFeature} className="space-y-6">
              <div>
                <InputLabel
                  htmlFor="name"
                  value="Feature Name"
                  className="text-gray-700 dark:text-gray-300 font-semibold"
                />
                <TextInput
                  id="name"
                  className="mt-1 block w-full border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                  isFocused
                  placeholder="Enter a concise name"
                />
                <InputError className="mt-2" message={errors.name} />
              </div>

              <div>
                <InputLabel
                  htmlFor="description"
                  value="Description"
                  className="text-gray-700 dark:text-gray-300 font-semibold"
                />
                <TextAreaInput
                  id="description"
                  rows={8}
                  className="mt-1 block w-full border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  placeholder="Describe the feature in detail..."
                />
                <InputError className="mt-2" message={errors.description} />
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                <PrimaryButton
                  disabled={processing}
                  className="px-8 py-2.5 !text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-all shadow-sm"
                >
                  {processing ? "Saving Changes..." : "Update Feature"}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
