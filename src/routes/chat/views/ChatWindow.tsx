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
          hx-swap="beforeend" 
          className="flex"
        >
          <input type="hidden" name="chatSubjectUserID" value={chatSubjectUser.id} />
          <input type="hidden" name="loggedInUserID" value={loggedInUser.id} />
          <textarea name="content" placeholder="Type your message" required className="w-3/4 p-2 border rounded-l"></textarea>
          <button type="submit" className="w-1/4 bg-blue-500 text-white rounded-r">Send</button>
        </form>
      </div>
    </div>
  );
}
