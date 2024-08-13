import Row from './Row';

export default function Table({ tasks, sortField = 'due_date', sortDirection = 'asc' }: { tasks: Task[], sortField?: string, sortDirection?: string }) {
  if (tasks?.length === 0) {
    return (
      <div className="w-full overflow-x-auto rounded-lg">
        No tasks yet. Create one first!
      </div>
    );
  }

  const getNextSortDirection = (field: string) => {
    if (field !== sortField) return 'asc';
    return sortDirection === 'asc' ? 'desc' : 'asc';
  };

  const getSortUrl = (field: string) => {
    const nextDirection = getNextSortDirection(field);
    return `/tasks?sort=${field}&direction=${nextDirection}`;
  };

  return (
    <div id="task-table" className="w-full overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm bg-white divide-y-2 divide-gray-200 table-auto">
        <thead>
          <tr>
            <th 
              className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap text-start cursor-pointer"
              hx-get={getSortUrl('title')}
              hx-trigger="click"
              hx-target="#task-table"
              hx-swap="outerHTML"
            >
              Title {sortField === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
              Description
            </th>
            <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap">
              Status
            </th>
            <th 
              className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap cursor-pointer"
              hx-get={getSortUrl('due_date')}
              hx-trigger="click"
              hx-target="#task-table"
              hx-swap="outerHTML"
            >
              Due Date {sortField === 'due_date' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tasks.map((t) => (
            <Row {...t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
