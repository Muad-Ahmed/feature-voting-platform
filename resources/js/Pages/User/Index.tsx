import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { User, PageProps } from "@/types";

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Users
        </h2>
      }
    >
      <Head title="Users" />

      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden shadow-sm md:rounded-lg border-none md:border md:border-gray-200 md:dark:border-gray-700">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="hidden md:table-header-group text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Roles
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="block md:table-row-group">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="block md:table-row bg-white border dark:bg-gray-800 border-gray-200 dark:border-gray-700 md:border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors mb-4 md:mb-0 rounded-lg md:rounded-none"
                >
                  {/* Name */}
                  <td className="flex justify-between md:table-cell px-6 py-4 font-medium text-gray-900 dark:text-white border-b md:border-none">
                    <span className="md:hidden text-gray-500 font-bold uppercase text-[10px]">
                      Name
                    </span>
                    {user.name}
                  </td>
                  {/* Email */}
                  <td className="flex justify-between md:table-cell px-6 py-4 border-b md:border-none">
                    <span className="md:hidden text-gray-500 font-bold uppercase text-[10px]">
                      Email
                    </span>
                    {user.email}
                  </td>
                  {/* Created At */}
                  <td className="flex justify-between md:table-cell px-6 py-4 border-b md:border-none">
                    <span className="md:hidden text-gray-500 font-bold uppercase text-[10px]">
                      Date
                    </span>
                    <span className="text-xs">{user.created_at}</span>
                  </td>
                  {/* Roles */}
                  <td className="flex justify-between md:table-cell px-6 py-4 border-b md:border-none">
                    <span className="md:hidden text-gray-500 font-bold uppercase text-[10px]">
                      Roles
                    </span>
                    <div className="flex flex-wrap gap-1 justify-end md:justify-start">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center align-middle md:table-cell">
                    <Link
                      href={
                        user.is_editable ? route("user.edit", user.id) : "#"
                      }
                      onClick={(e) => !user.is_editable && e.preventDefault()}
                      className={`inline-flex items-center justify-center px-4 py-2 md:p-0 w-full md:w-auto font-semibold transition-all text-xs sm:text-sm ${
                        !user.is_editable
                          ? "opacity-60 cursor-not-allowed text-gray-400 pointer-events-none"
                          : "bg-blue-600 md:bg-transparent text-white md:text-blue-500 hover:underline"
                      } rounded-md md:rounded-none`}
                    >
                      {!user.is_editable && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 mr-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {user.is_editable ? "Edit" : "System Protected"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
