import { Context } from 'hono';
import { html } from 'hono/html';
import chatService from '../services/chat.service';
import ChatWindow from '../views/ChatWindow';
import ChatList from '../views/ChatList';
import MessageList from '../views/MessageList';

async function getChatList(c: Context) {
  
  const users = await chatService.getChatUsers(c);
  return c.render(ChatList({ users: users }));
}

async function getChatWindow(c: Context) {
  const { userId } = c.req.param();
  const messages = await chatService.getMessages(c, userId);
  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  var currentUser = await chatService.getUserById(c, currentUserId);
  var selectedUser = await chatService.getUserById(c, userId);
  const chatWindowHtml = ChatWindow({ messages, loggedInUser: currentUser, chatSubjectUser:  selectedUser});

  return c.html(chatWindowHtml);
}

async function startNewChat(c: Context) {
  const { email } = await c.req.parseBody();
  await chatService.startNewChat(c, email);
  return getChatList(c);
}

async function sendMessage(c: Context) {
  const { loggedInUserID, chatSubjectUserID, content } = await c.req.parseBody();
  await chatService.sendMessage(c, chatSubjectUserID, content);
  const messages = await chatService.getMessages(c, chatSubjectUserID);
  const user = await chatService.getUserById(c, loggedInUserID);
  
  return c.render(MessageList({ messages, loggedInUser: user }));
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
