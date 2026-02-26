import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  // Form data management
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false as boolean,
  });

  // Submit handler
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {/* Display session status if exists */}
      {status && (
        <div className="mb-4 text-sm font-medium text-green-500">{status}</div>
      )}

      <form onSubmit={submit} className="space-y-6">
        {/* Email Field */}
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        {/* Password Field */}
        <div>
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        {/* Remember Me Checkbox */}
        <div className="block">
          <label className="flex items-center cursor-pointer w-fit">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) =>
                setData("remember", (e.target.checked || false) as false)
              }
            />
            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="mt-4 flex items-center justify-between">
          {/* Auth links on the left */}
          <div className="flex flex-col space-y-1">
            <Link
              href={route("register")}
              className="text-sm text-gray-600 underline hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Don't have an account?
            </Link>

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Forgot password?
              </Link>
            )}
          </div>

          {/* Login button with natural width */}
          <PrimaryButton disabled={processing}>Log in</PrimaryButton>
        </div>
      </form>
      {/* Demo page button */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-700"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 dark:bg-gray-800 font-bold tracking-widest">
            OR
          </span>
        </div>
      </div>

      <Link
        href={route("landing")}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-slate-900 px-6 py-4 text-sm font-black text-white transition-all hover:bg-white hover:text-slate-900 active:scale-[0.99] dark:border-blue-500 dark:bg-blue-600 dark:hover:bg-transparent dark:hover:text-blue-400"
      >
        GO TO DEMO PAGE
      </Link>
    </GuestLayout>
  );
}
