import { Context } from 'hono';

async function getChatUsers(c: Context): Promise<string[]> {
  const { data: users, error } = await c.var.supabase
    .from('messages')
    .select('to_user_id, from_user_id');

  if (error) {
    throw error;
  }

  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  const uniqueUsers = [...new Set(users.flatMap(u => [u.to_user_id, u.from_user_id]))];
  return uniqueUsers.filter(id => id !== currentUserId);
}

async function getMessages(c: Context, otherUserId: string): Promise<Message[]> {
  const currentUserId = await c.var.supabase.auth.getUser().then(({ data }) => data.user?.id);
  const { data: messages, error } = await c.var.supabase
    .from('messages')
    .select('*')
    .or(`to_user_id.eq.${currentUserId},to_user_id.eq.${otherUserId},from_user_id.eq.${currentUserId},from_user_id.eq.${otherUserId}`)
    .order('created_at', { ascending: true });

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

export default {
  getChatUsers,
  getMessages,
  startNewChat,
  sendMessage,
  subscribeToMessages,
};
