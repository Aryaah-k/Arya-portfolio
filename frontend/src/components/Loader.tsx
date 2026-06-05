export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500 mb-4"></div>

      <p className="text-gray-400 text-sm animate-pulse">
        Loading please wait...
      </p>
    </div>
  );
}