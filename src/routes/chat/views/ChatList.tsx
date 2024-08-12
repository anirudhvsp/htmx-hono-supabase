import { html } from 'hono/html';

export const ChatList = ({ users }) => html`
  <div class="chat-list">
    <h2>Chats</h2>
    <ul>
      ${users.map(user => html`
        <li>
          <a href="/chat/${user.id}" hx-get="/chat/${user.id}" hx-target="#chat-window">
            ${user.email}
          </a>
        </li>
      `)}
    </ul>
    <form hx-post="/chat/new" hx-target="#chat-list">
      <input type="email" name="email" placeholder="Enter user email" required />
      <button type="submit">Start New Chat</button>
    </form>
  </div>
`;
