import Count from "./Count";
interface Props {
    completed: number;
    pending: number;
  }
export default function CountDisplay({ completed, pending }: Props) {
    return (
    <div id="count-container" className="flex space-x-6" hx-get="/tasks/counts" hx-trigger="taskListUpdated from:body" hx-swap="outerHTML">
          <Count title="Completed" count={completed} />
          <Count title="Pending" count={pending} />
      </div>
    );
  }
  

