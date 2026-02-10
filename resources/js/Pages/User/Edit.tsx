import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { User } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import Radio from "@/Components/Radio";

export default function Show({
  roles,
  user,
  roleLabels,
}: {
  roles: any;
  user: User;
  roleLabels: Record<string, string>;
}) {
  // Initialize form with user data
  const { data, setData, processing, errors, put } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles,
  });

  // Handle form submission
  const updateUser: FormEventHandler = (ev) => {
    ev.preventDefault();
    put(route("user.update", user.id), {
      preserveScroll: true,
    });
  };

  // Handle radio button change for roles
  const onRoleChange = (ev: any) => {
    if (ev.target.checked) {
      setData("roles", [ev.target.value]);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User <span className="text-primary-500">"{user.name}"</span>
        </h2>
      }
    >
      <Head title={"Edit User " + user.name} />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Modern glassmorphism container */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800/50 dark:backdrop-blur-sm border border-transparent dark:border-white/10">
          <div className="p-8 text-gray-900 dark:text-gray-100">
            <form onSubmit={updateUser} className="w-full space-y-6">
              {/* Full width Name Input (Disabled) */}
              <div className="w-full">
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  disabled
                  className="mt-1 block w-full opacity-70 cursor-not-allowed"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                <InputError className="mt-2" message={errors.name} />
              </div>

              {/* Full width Email Input (Disabled) */}
              <div className="w-full">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  disabled
                  className="mt-1 block w-full opacity-70 cursor-not-allowed"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                <InputError className="mt-2" message={errors.email} />
              </div>

              {/* Role Selection Section */}
              <div className="w-full">
                <InputLabel value="Role" className="mb-3" />
                <div className="space-y-2">
                  {roles.map((role: any) => (
                    <label
                      className="flex items-center cursor-pointer group"
                      key={role.id}
                    >
                      <Radio
                        name="roles"
                        checked={data.roles.includes(role.name)}
                        value={role.name}
                        onChange={onRoleChange}
                      />
                      <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors">
                        {roleLabels[role.name]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-4 pt-2">
                <PrimaryButton disabled={processing}>Update User</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
