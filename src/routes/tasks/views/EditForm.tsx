export default function EditForm({ task }: { task: Task }) {
  const { id, title, description, completed, due_date } = task;
  return (
    <div className="flex justify-center w-full">
      <div
        className="flex justify-center w-full px-2 sm:px-4 md:w-3/4"
        hx-boost="true"
      >
        <form className="w-full lg:w-3/4" hx-put={`/tasks/${id}`}>
          <label
            htmlFor="title"
            className="block p-2 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            className="w-full p-2 mb-4 text-2xl font-bold text-gray-900 border border-gray-200 rounded-lg shadow-sm sm:text-3xl"
            placeholder="An interesting task title"
            required
            value={title}
          />

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block p-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              className="w-full p-2 align-top border border-gray-200 rounded-lg shadow-sm sm:text-sm"
              rows={4}
              placeholder="Your task's description"
              required
            >
              {description}
            </textarea>
          </div>

          <div className="flex flex-col justify-center gap-4 mb-8 md:flex-row">
            <div className="grid w-full">
              <label
                htmlFor="completed"
                className="block p-2 text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                name="completed"
                id="completed"
                className="w-full p-2 align-top border border-gray-200 rounded-lg shadow-sm sm:text-sm"
                required
              >
                <option disabled>Choose a status</option>
                <option value="false" selected={!completed}>Pending</option>
                <option value="true" selected={completed}>Completed</option>
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="due_date"
                className="block p-2 text-sm font-medium text-gray-700"
              >
                Due Date
              </label>

              <input
                name="due_date"
                id="due_date"
                className="w-full p-2 align-top border border-gray-200 rounded-lg shadow-sm sm:text-sm"
                value={due_date}
                type="date"
                required
              />
            </div>
          </div>
          <div
            className="flex flex-col justify-end w-full gap-4 md:flex-row"
            hx-boost="true"
          >
            <a
              className="inline-block px-12 py-3 text-sm font-medium text-center text-red-600 transition-all border border-red-600 rounded-lg text-nowrap hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
              href="/tasks/dashboard"
            >
              Cancel
            </a>
            <button
              className="inline-block px-12 py-3 text-sm font-medium text-white transition-all bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring active:text-indigo-500 text-nowrap"
              type="submit"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
