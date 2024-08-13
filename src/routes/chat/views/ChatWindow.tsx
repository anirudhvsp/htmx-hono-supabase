import MessageList from './MessageList';

interface Message {
  id: number;
  to_user_id: string;
  from_user_id: string;
  content: string;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profile_picture_url: string;
}

interface ChatWindowProps {
  messages: Message[];
  loggedInUser: User; // Current user sending the messages
  chatSubjectUser: User; // User receiving the messages
}

export default function ChatWindow({ messages, loggedInUser, chatSubjectUser }: ChatWindowProps) {
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
        <MessageList messages={messages} loggedInUser={loggedInUser} />
      </div>
      <div className="mt-4">

      <form hx-post="/chat/send" hx-target="#message-list" hx-swap="innerhtml scroll:bottom" className="flex">
        <input type="hidden" name="chatSubjectUserID" value={chatSubjectUser.id} />
        <input type="hidden" name="loggedInUserID" value={loggedInUser.id} />


        <textarea name="content" placeholder="Type your message" required className="w-3/4 p-2 border rounded-l"></textarea>
        <button type="submit" className="w-1/4 bg-blue-500 text-white rounded-r">Send</button>
      </form>
      </div>
    </div>
  );
}
