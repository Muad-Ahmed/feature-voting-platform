import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Feature, PaginatedData } from "@/types";
import FeatureItem from "@/Components/FeatureItem";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import TextAreaInput from "@/Components/TextAreaInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show() {
  // Form handling logic
  const { data, setData, processing, errors, post } = useForm({
    name: "",
    description: "",
  });

  // Handle form submission
  const createFeature: FormEventHandler = (ev) => {
    ev.preventDefault();
    post(route("feature.store"), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create New Feature
        </h2>
      }
    >
      <Head title="Create New Feature" />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Modern full-width card */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800/50 dark:backdrop-blur-sm border border-transparent dark:border-white/10">
          <div className="p-8 text-gray-900 dark:text-gray-100">
            {/* Removed max-w-2xl to allow full width */}
            <form onSubmit={createFeature} className="w-full space-y-6">
              {/* Full width Name Input */}
              <div className="w-full">
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  className="mt-1 block w-full"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                  isFocused
                  autoComplete="name"
                />
                <InputError className="mt-2" message={errors.name} />
              </div>

              {/* Full width Description Input */}
              <div className="w-full">
                <InputLabel htmlFor="description" value="Description" />
                <TextAreaInput
                  id="description"
                  className="mt-1 block w-full"
                  rows={6}
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError className="mt-2" message={errors.description} />
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-4 pt-2">
                <PrimaryButton disabled={processing}>
                  Save Feature
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
