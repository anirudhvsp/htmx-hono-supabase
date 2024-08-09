export default function HomePage() {
  return (
    <section>
      <div class="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center py-8 md:py-16 lg:py-32 ">
        <div class="mx-auto max-w-xl text-center">
          <h1 class="text-3xl font-extrabold sm:text-5xl">
            Conquer your day
            <strong class="font-extrabold text-yellow-400 sm:block">
              {' '}
              One task at a time.{' '}
            </strong>
          </h1>

          <p class="mt-4 sm:text-xl/relaxed">
            Seamlessly organize tasks for ultimate productivity. Stay focused,
            achieve more, and thrive!
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded bg-yellow-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring active:bg-yellow-500 sm:w-auto"
              href="/tasks/dashboard"
            >
              Dashboard
            </a>

            <a
              class="block w-full rounded px-12 py-3 text-sm font-medium text-yellow-500 shadow hover:text-yellow-600 focus:outline-none focus:ring active:text-yellow-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
