export default function SuccesfulEdit() {
  return (
    <div
      hx-get="/tasks/dashboard"
      hx-trigger="load delay:2s"
      hx-boost="true"
      hx-target="body"
      className="grid w-full gap-8 place-items-center"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Successfully edited the task ✅
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Redirecting you back to your dashboard...
        </p>
      </div>

      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
