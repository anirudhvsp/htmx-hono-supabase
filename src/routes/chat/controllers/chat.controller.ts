import { Context } from 'hono';
import { html } from 'hono/html';
import chatService from '../services/chat.service';
import { ChatList } from '../views/ChatList';
import { ChatWindow } from '../views/ChatWindow';

async function getChatList(c: Context) {
  const users = await chatService.getChatUsers(c);
  return c.html(html`<${ChatList} users=${JSON.stringify(users)} />`);
}

async function getChatWindow(c: Context) {
  const { userId } = c.req.param();
  const messages = await chatService.getMessages(c, userId);
  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  return c.html(html`<${ChatWindow} messages=${JSON.stringify(messages)} currentUserId=${currentUserId} otherUserId=${userId} />`);
}

async function startNewChat(c: Context) {
  const { email } = await c.req.parseBody();
  await chatService.startNewChat(c, email);
  return getChatList(c);
}

async function sendMessage(c: Context) {
  const { to_user_id, content } = await c.req.parseBody();
  await chatService.sendMessage(c, to_user_id, content);
  return c.text('Message sent');
}

async function setupSSE(c: Context) {
  const { userId } = c.req.param();
  return c.sse(async (stream) => {
    const unsubscribe = await chatService.subscribeToMessages(c, userId, (message) => {
      stream.write({ data: JSON.stringify(message) });
    });
    c.req.raw.on('close', () => unsubscribe());
  });
}

export default {
  getChatList,
  getChatWindow,
  startNewChat,
  sendMessage,
  setupSSE,
};
