import { html } from 'hono/html'

interface Message {
  id: number;
  from_user_id: string;
  content: string;
  created_at: string;
}

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  otherUserId: string;
}

export const ChatWindow = ({ messages, currentUserId, otherUserId }) => html`
  <div class="chat-window">
    <div class="message-list" hx-sse="connect:/chat/sse/${otherUserId}">
      ${messages.map(message => html`
        <div class="message ${message.from_user_id === currentUserId ? 'sent' : 'received'}">
          <p>${message.content}</p>
          <small>${new Date(message.created_at).toLocaleString()}</small>
        </div>
      `)}
    </div>
    <form hx-post="/chat/send" hx-target="#message-list" hx-swap="beforeend">
      <input type="hidden" name="to_user_id" value="${otherUserId}" />
      <textarea name="content" placeholder="Type your message" required></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
`;