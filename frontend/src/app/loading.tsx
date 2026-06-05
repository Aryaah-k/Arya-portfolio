export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060a] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-3xl rounded-full animate-pulse delay-300" />

      {/* Loader content */}
      <div className="relative flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />

        {/* Text */}
        <p className="text-lg tracking-wide text-gray-300 animate-pulse">
          Loading your experience...
        </p>

      </div>
    </div>
  );
}