import { Context } from 'hono';
import {getCookie} from 'hono/cookie'


async function getLastSentMessage(c: Context, to_user_id: string): Promise<Message> {
  const from_user_id = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  const { data: message, error } = await c.var.supabase
    .from('messages')
    .select('*')
    .eq('from_user_id', from_user_id)
    .eq('to_user_id', to_user_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return message;
}

async function getChatUsers(c: Context): Promise<any[]> {
  const authSession = await c.var.supabase.auth.getUser(getCookie(c, 'auth_session'));
  const currentUserId = authSession.data.user?.id;

  const { data: toUserIds, error: messagesError } = await c.var.supabase
    .from('messages')
    .select('to_user_id')
    .eq('from_user_id', currentUserId);

  if (messagesError) {
    throw messagesError;
  }

  const uniqueToUserIds = [...new Set(toUserIds.map(item => item.to_user_id))];
  const { data: userProfiles, error: userProfilesError } = await c.var.supabase
  .from('user_profiles')
  .select('*')
  .in('id', uniqueToUserIds);

  if (userProfilesError) {
    throw userProfilesError;
  }

  return userProfiles;
}


async function getMessages(c: Context, otherUserId: string, page: number = 1, messagesPerPage: number = 5): Promise<Message[]> {
  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  const { data: messages, error } = await c.var.supabase
    .from('messages')
    .select('*')
    .or(`to_user_id.eq.${currentUserId},to_user_id.eq.${otherUserId},from_user_id.eq.${currentUserId},from_user_id.eq.${otherUserId}`)
    .order('created_at', { ascending: false })
    .range((page - 1) * messagesPerPage, page * messagesPerPage - 1);

  if (error) {
    throw error;
  }

  return messages;
}

async function startNewChat(c: Context, email: string): Promise<string> {
  const { data: user, error } = await c.var.supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error('User not found');
  }

  return user.id;
}

async function sendMessage(c: Context, to_user_id: string, content: string): Promise<void> {
  const from_user_id = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  const { error } = await c.var.supabase
    .from('messages')
    .insert({ to_user_id, from_user_id, content });

  if (error) {
    throw error;
  }
}

async function subscribeToMessages(c: Context, otherUserId: string, callback: (message: Message) => void) {
  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  return c.var.supabase
    .channel('messages')
    .on('INSERT', { event: '*', schema: 'public', table: 'messages', filter: `to_user_id=eq.${currentUserId},from_user_id=eq.${otherUserId}` }, (payload) => {
      callback(payload.new as Message);
    })
    .subscribe();
}

async function getUserById(c: Context, id: string): Promise<Task> {
  const { data: results, error } = await c.var.supabase
    .from('user_profiles')
    .select()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return results[0];
}

export default {
  getChatUsers,
  getMessages,
  startNewChat,
  sendMessage,
  subscribeToMessages,
  getUserById,
  getLastSentMessage
};
