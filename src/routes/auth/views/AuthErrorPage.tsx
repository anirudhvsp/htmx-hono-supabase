export default function AuthErrorPage() {
  return (
    <div className="grid px-4 h-[50vh] bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">401</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">You're not authenticated.</p>

        <a
          hx-boost="true"
          href="/auth/login"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go to Login Page
        </a>
      </div>
    </div>
  );
}
