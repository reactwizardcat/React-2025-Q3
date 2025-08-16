export default function SceletonCard() {
  return (
    <div className="animate-pulse rounded-lg bg-white p-4 shadow-md">
      <div className="mx-auto mb-4 h-12 w-3/4 rounded-full bg-gray-200"></div>

      <div className="mb-4 space-y-3">
        <div className="h-5 w-full rounded bg-gray-200">
          <div className="mr-2 inline-block h-4 w-1/3 rounded bg-gray-300"></div>
        </div>
        <div className="h-5 w-full rounded bg-gray-200">
          <div className="mr-2 inline-block h-4 w-1/3 rounded bg-gray-300"></div>
        </div>
        <div className="h-5 w-full rounded bg-gray-200">
          <div className="mr-2 inline-block h-4 w-1/3 rounded bg-gray-300"></div>
        </div>
      </div>
      <div className="h-80 overflow-hidden rounded-md bg-gray-200"></div>
    </div>
  );
}
