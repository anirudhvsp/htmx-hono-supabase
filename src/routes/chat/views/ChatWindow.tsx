import MessageList from './MessageList';

interface ChatWindowProps {
  messages: Message[];
  loggedInUser: User;
  chatSubjectUser: User;
  currentPage: number;
}

export default function ChatWindow({ messages, loggedInUser, chatSubjectUser, currentPage }: ChatWindowProps) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <img
            src={chatSubjectUser.profile_picture_url}
            alt={chatSubjectUser.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <h4 className="font-semibold">{chatSubjectUser.name}</h4>
        </div>
      </div>
      <div id="message-list" className="border-t border-gray-300">
        <MessageList 
          messages={messages} 
          loggedInUser={loggedInUser} 
          currentPage={currentPage}
          chatSubjectUserId={chatSubjectUser.id}
        />
      </div>
      <div className="mt-4">
        <form 
          hx-post="/chat/send-message" 
          hx-target="#message-groups" 
          hx-swap="afterbegin"
          hx-indicator=".htmx-indicator"
          hx-on-htmx-before-Request="this.querySelector('textarea').value = ''"
          hx-on-htmx-after-Request="document.getElementById('message-container').scrollTop = document.getElementById('message-groups').scrollHeight"          className="flex"
        >
          <input type="hidden" name="chatSubjectUserID" value={chatSubjectUser.id} />
          <input type="hidden" name="loggedInUserID" value={loggedInUser.id} />
          <textarea name="content" placeholder="Type your message" required className="w-3/4 p-2 border rounded-l"></textarea>
          <button type="submit" className="w-1/4 bg-blue-500 text-white rounded-r" hx-disable-elt="this">
            <span className="htmx-indicator">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span className="htmx-indicator-hide">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}