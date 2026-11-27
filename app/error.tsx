'use client';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
      >
        Try Again
      </button>
    </main>
  );
}