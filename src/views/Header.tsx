interface Props {
  isAuthenticated?: boolean;
}

export default function Header({ isAuthenticated = false }: Props) {
  return (
    <header className="bg-gray-50">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-8 lg:px-8">
        <div
          className="sm:flex sm:items-center sm:justify-between"
          hx-boost="true"
        >
          <a href="/" className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Hyper Task ⚡
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Manage your tasks and due dates here! 📝
            </p>
          </a>

          {!isAuthenticated ? (
            ''
          ) : (
            <div className="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center">
              <a
                href="/tasks/new"
                className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                Create Task
              </a>
              <a
                hx-post="/auth/logout"
                hx-boost="true"
                hx-target="body"
                className="flex items-center gap-2 p-2 px-4 text-sm font-medium text-center text-red-600 transition-all border border-red-600 rounded-lg cursor-pointer text-nowrap hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ionicon"
                  viewBox="0 0 512 512"
                  width="24"
                >
                  <path
                    d="M320 176v-40a40 40 0 00-40-40H88a40 40 0 00-40 40v240a40 40 0 0040 40h192a40 40 0 0040-40v-40M384 176l80 80-80 80M191 256h273"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                </svg>
                <p>Log Out</p>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
