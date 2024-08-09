import SuccessBadge from './SuccessBadge';
import ErrorBadge from './ErrorBadge';
import RowButtons from './RowButtons';

export default function Row({
  id,
  title,
  description,
  completed,
  due_date,
}: Task) {
  return (
    <tr id={`row-${id.toString()}`}>
      <td className="px-4 py-2 font-medium text-gray-900 truncate whitespace-nowrap max-w-[14ch]">
        {title}
      </td>
      <td className="px-4 py-2 text-gray-700 truncate whitespace-nowrap max-w-[32ch]">
        {description}
      </td>
      <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
        {completed ? (
          <SuccessBadge text="Completed" />
        ) : (
          <ErrorBadge text="Pending" />
        )}
      </td>
      <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
        {new Date(due_date).toISOString().split('T')[0].replaceAll('-', '/')}
      </td>
      <td className="px-4 py-2 text-center whitespace-nowrap">
        <RowButtons id={id} />
      </td>
    </tr>
  );
}
