import { html } from 'hono/html';

export default function ChatDashboard() {
    return (
      <div id="chat-container" className="w-full px-4 mx-auto sm:px-6 lg:px-16">
        <h3 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Chat Dashboard
        </h3>
        <div className="flex">
          <div id="chat-list" className="w-1/3 pr-4" hx-get="/chat" hx-trigger="load"></div>
          <div id="chat-window" className="w-2/3 pl-4">
            {"Select a Chat to get started."}
          </div>
        </div>
      </div>
    );
  }
  