import MessageGroup from "./MessageGroup";
import InfiniteScrollSentinel from "./InfiniteScrollSentinel";

interface MessageListProps {
  messages: Message[];
  loggedInUser: User;
  currentPage: number;
  chatSubjectUserId: string;
}

export default function MessageList({ messages, loggedInUser, currentPage, chatSubjectUserId }: MessageListProps) {
  return (
    <div 
      id="message-container" 
      className="flex flex-col overflow-y-auto max-h-[60vh] p-4 no-scrollbar"
      hx-on:after-settle="this.scrollTop = this.scrollHeight"
    >
      <div id="message-groups" className="flex flex-col-reverse">
        <MessageGroup messages={messages.reverse()} loggedInUser={loggedInUser} />
        <InfiniteScrollSentinel chatSubjectUserId={chatSubjectUserId} nextPage={currentPage + 1} />
      </div>
    </div>
  );
}
