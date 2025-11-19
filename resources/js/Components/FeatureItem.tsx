import { Feature } from "@/types";

export default function FeatureItem({ feature }: { feature: Feature }) {
  return <div className=" mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
             <pre>{JSON.stringify(feature, undefined, 2)}</pre>
            </div>
          </div>;
}
