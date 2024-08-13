interface InfiniteScrollSentinelProps {
    chatSubjectUserId: string;
    nextPage: number;
  }
  
  export default function InfiniteScrollSentinel({ chatSubjectUserId, nextPage }: InfiniteScrollSentinelProps) {
    return (
      <div 
        hx-get={`/chat/load-more/${chatSubjectUserId}/${nextPage}`}
        hx-trigger="intersect once"
        hx-swap="afterend"
        hx-target="this"
        className="h-1"
      ></div>
    );
  }
  