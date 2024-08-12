interface Props {
    id: number;
    taskTitle: string;
  }
  export default function EditBox({ id, taskTitle }: Props) {
    return (
      <form
        action={`/tasks/${id}/update-title`}
        method="POST"
        hx-post={`/tasks/${id}/edit-title/accept`}
        hx-target={`#row-${id}`}
        hx-swap="outerHTML"
        // style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="px-4 py-2 font-medium text-gray-900 truncate whitespace-nowrap max-w-[14ch]"
      >
        <input
          type="text"
          name="title"
          value={taskTitle}
          required
          size={taskTitle.length}
          style={{
            width: 'auto',
            flexShrink: 0,
            marginBottom: '8px',
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="submit"
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px #ccc',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
              style={{ display: 'block' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12l4 4 8-8"
              />
            </svg>
          </button>
          <button
            type="button"
            hx-post={`/tasks/${id}/edit-title/reject`}
            hx-target={`#row-${id}`}
            hx-swap="outerHTML"
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px #ccc',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
              style={{ display: 'block' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </form>
    );
  }
  