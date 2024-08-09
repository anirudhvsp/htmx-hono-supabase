export default function AuthSignUpPage() {
  return (
    <div className="flex max-w-sm m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-none md:shadow-lg lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style="background-image:url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"
      ></div>
      <form
        className="w-full p-8 m-4 border rounded md:border-none md:m-0 lg:w-1/2"
        action="/auth/sign-up"
        method="post"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          ⚡ Create An Account
        </h2>
        <a
          href="/auth/login/google"
          className="flex items-center justify-center mt-4 text-white border rounded-lg shadow-sm hover:bg-gray-100"
        >
          <div className="px-4 py-3">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>
          <h1 className="w-5/6 px-4 py-3 font-bold text-center text-gray-600">
            Sign in with Google
          </h1>
        </a>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b lg:w-1/4"></span>
          <p className="text-xs text-center text-gray-500 uppercase cursor-default">
            or sign up with email
          </p>
          <span className="w-1/5 border-b lg:w-1/4"></span>
        </div>
        <div className="mt-4">
          <label
            for="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            required
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              for="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password{' '}
              <span className="text-xs italic font-normal">- min 8 chars.</span>
            </label>
          </div>
          <input
            id="password"
            name="password"
            className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            minLength="8"
            required
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded hover:bg-gray-600 disabled:bg-gray-600"
          >
            Sign Up
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>
          <a href="/auth/login" className="text-xs text-gray-500 uppercase">
            or login
          </a>
          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </form>
    </div>
  );
}
