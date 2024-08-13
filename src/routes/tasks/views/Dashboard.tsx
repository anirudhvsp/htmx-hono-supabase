import CountDisplay from "./CountDisplay";
export default function Dashboard() {
  return (
    <div id="home-container" className="w-full px-4 mx-auto sm:px-6 lg:px-16">
      <h3 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Task List
      </h3>
      <CountDisplay completed={0} pending={0}/>
      <a
        href="/tasks/new"
        className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Create Task
      </a>
      <div hx-get="/tasks" hx-trigger="load" hx-swap="outerHTML">
        <div
          role="status"
          className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse md:p-6 htmx-indicator"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}