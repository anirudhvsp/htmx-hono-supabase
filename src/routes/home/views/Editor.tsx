import { html } from "hono/html"

const tinyMCEEditor = html` <script
    src="https://unpkg.com/htmx.org@1.9.10"
    integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
    crossorigin="anonymous"
  ></script>
  <script src="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"></script>
  <link
    href="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/skins/ui/oxide/content.min.css"
    rel="stylesheet"
  />
  <script src="https://accounts.google.com/gsi/client"></script>
  <textarea id="editor"></textarea>
  <div class="flex justify-end">
    <button class="px-6 py-2 my-4 bg-yellow-400 rounded" id="save">Save</button>
  </div>
  <code class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 w-full">
    No saved data yet.
  </code>

  <script defer>
    htmx.onLoad(() => {
      tinymce.init({
        selector: 'textarea#editor',
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        branding: false,
        promotion: false,
      });

      document.querySelector('button').addEventListener('click', () => {
        // I can do stuff with the content here
        const htmlOutput = tinymce.get("editor").getContent();
        console.log("Editor saved data", htmlOutput);
        document.querySelector('code').textContent = htmlOutput;
        // <h1>Job Title</h1>
        // <blockquote>
        // <p>Some job callout.</p>
        // </blockquote>
        // <p>Real job description.</p>
      });
    });
  </script>`;

export default function Editor() {
  return <div className="p-8">{tinyMCEEditor}</div>
}