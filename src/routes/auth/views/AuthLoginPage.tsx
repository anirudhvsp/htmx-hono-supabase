interface Props {
  isInvalid?: boolean;
}
export default function AuthLoginPage({ isInvalid = false }: Props = {}) {
  return (
    <div className="flex max-w-sm m-2 mx-auto overflow-hidden bg-white rounded-lg shadow-none md:shadow-lg lg:max-w-4xl">
      <script src="https://accounts.google.com/gsi/client"></script>
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style="background-image:url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"
      ></div>
      <div className="w-full p-8 flex flex-col justify-center items-center lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
          ⚡ Welcome to Hyper Chat!
        </h2>
        <div className="w-full max-w-sm">
          <div id="g_id_onload"
            data-client_id="898448224213-adnge9j8v6qlh98uus25fd5e1q9q6ggj.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="https://htmx-todo-v2.anirudhvsp.workers.dev/auth/login/google"
            // data-login_uri="http://localhost:8787/auth/login/google"
            data-auto_select="true"
            data-itp_support="true">
          </div>
          <div className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="filled_black"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
          </div>
        </div>
        {isInvalid && (
          <p className="mt-8 font-semibold text-center text-red-500">
            Invalid email or password
          </p>
        )}
      </div>
    </div>
  );
}

