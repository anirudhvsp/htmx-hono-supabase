import SingleMessage from "./SingleMessage";

interface MessageGroupProps {
  messages: Message[];
  loggedInUser: User;
}

export default function MessageGroup({ messages, loggedInUser }: MessageGroupProps) {
  return (
    <div>
      {messages.map((message) => (
        <SingleMessage message={message} loggedInUser={loggedInUser} />
      ))}
    </div>
  );
}
