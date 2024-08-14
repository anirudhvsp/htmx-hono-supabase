import { Context } from 'hono';
import { html } from 'hono/html';
import chatService from '../services/chat.service';
import ChatWindow from '../views/ChatWindow';
import ChatList from '../views/ChatList';
import SingleMessage from '../views/SingleMessage';
import MessageGroup from '../views/MessageGroup';
import InfiniteScrollSentinel from '../views/InfiniteScrollSentinel';

async function getChatList(c: Context) {
  
  const users = await chatService.getChatUsers(c);
  return c.render(ChatList({ users: users }));
}

async function getChatWindow(c: Context) {
  const { userId } = c.req.param();
  const messages = await chatService.getMessages(c, userId, 1, 5);
  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  var currentUser = await chatService.getUserById(c, currentUserId);
  var selectedUser = await chatService.getUserById(c, userId);
  const chatWindowHtml = ChatWindow({ messages, loggedInUser: currentUser, chatSubjectUser:  selectedUser, currentPage: 1});

  return c.html(chatWindowHtml);
}

async function startNewChat(c: Context) {
  const { email } = await c.req.parseBody();
  await chatService.startNewChat(c, email);
  return getChatList(c);
}

async function sendMessage(c: Context) {
  const { chatSubjectUserID, content } = await c.req.parseBody();
  await chatService.sendMessage(c, chatSubjectUserID, content);
  const newMessage = await chatService.getLastSentMessage(c, chatSubjectUserID);
  const loggedInUser = await chatService.getUserById(c, chatSubjectUserID);
  
  return c.render(SingleMessage({ message: newMessage, loggedInUser }));
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

async function loadMoreMessages(c: Context) {
  const { userId, page } = c.req.param();
  try {
    const pageNumber = parseInt(page);
    const messages = await chatService.getMessages(c, userId, pageNumber, 5);
    const user = await chatService.getUserById(c, userId);
    const newMessages = MessageGroup({ messages, loggedInUser: user });
    const newSentinel = InfiniteScrollSentinel({ chatSubjectUserId: userId, nextPage: pageNumber + 1 });
    return c.html(newMessages + newSentinel);
  } catch(error) {
    console.error(error);
  }
}

export default {
  getChatList,
  getChatWindow,
  startNewChat,
  sendMessage,
  setupSSE,
  loadMoreMessages,
};
