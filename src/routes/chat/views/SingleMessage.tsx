interface SingleMessageProps {
    message: Message;
    loggedInUser: User;
  }
  
  export default function SingleMessage({ message, loggedInUser }: SingleMessageProps) {
    const isFromCurrentUser = message.from_user_id === loggedInUser.id;
  
    return (
    <div 
        class={`message ${message.from_user_id === loggedInUser.id ? 'sent' : 'received'}`}
        hx-on:after-settle="document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight"
      > 
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
    </div>

    );
  }
  