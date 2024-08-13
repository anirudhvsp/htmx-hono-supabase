// MessageList.tsx
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
  
  interface MessageListProps {
    messages: Message[];
    loggedInUser: User;
  }
  
  export default function MessageList({ messages, loggedInUser }: MessageListProps) {
    return (
      <div className="overflow-y-auto max-h-[60vh] p-4">
        {messages.map((message) => {
          const isFromCurrentUser = message.from_user_id === loggedInUser.id;
  
          return (
            <div
              key={message.id}
              className={`p-2 my-2 ${isFromCurrentUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  isFromCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {message.content}
                <div className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  