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
                <th scope="col" className="px-6 py-3 text-right">
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

                  <td className="flex justify-center md:table-cell px-6 py-4 text-right">
                    <Link
                      href={route("user.edit", user.id)}
                      className="inline-flex items-center justify-center px-4 py-2 md:p-0 w-full md:w-auto bg-blue-600 md:bg-transparent text-white md:text-blue-500 rounded-md md:rounded-none font-semibold hover:underline transition-all text-xs sm:text-sm"
                    >
                      Edit
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
