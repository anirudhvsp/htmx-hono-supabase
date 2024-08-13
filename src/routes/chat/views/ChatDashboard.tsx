export default function ChatDashboard() {
  return (
    <div id="chat-container" className="w-full px-4 mx-auto sm:px-6 lg:px-16">
      <h3 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Chat Dashboard
      </h3>
      <div className="flex flex-col md:flex-row">
        <div id="chat-list" className="pr-4 md:w-1/2" hx-get="/chat" hx-trigger="load"></div>
        <div id="chat-window" className="pl-4 md:w-1/2">
          {"Select a Chat to get started."}
        </div>
      </div>
    </div>
  );
}
