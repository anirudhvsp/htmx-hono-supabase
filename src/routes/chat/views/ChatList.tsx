import Row from "./ChatRow";

interface Props {
  users: [];
}

export default function ChatList({ users }: Props) {
  return (
    <div className="chat-list mb-8">
      <h2>Chats</h2>
      <table>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <Row {...user} />
          ))}
        </tbody>
      </table>
      <form hx-post="/chat/new" hx-target="#chat-list">
        <input type="email" name="email" placeholder="Enter user email" required />
        <button type="submit">Start New Chat</button>
      </form>
    </div>
  );
}
