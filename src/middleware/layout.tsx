import { jsxRenderer } from 'hono/jsx-renderer';
import Header from '../views/Header';
import Footer from '../views/Footer';

interface Props {
  isAuthenticated?: boolean;
}

export const layout = ({ isAuthenticated = true }: Props = {}) => {
  return jsxRenderer(
    ({ children, title }) => {
      return (
        <html lang="en">
          <head>
            <link rel="shortcut icon" href="https://d12oj6vhwzd5rt.cloudfront.net/h1wzbq%2Fpreview%2F60015164%2Fmain_full.png?response-content-disposition=inline%3Bfilename%3D%22main_full.png%22%3B&response-content-type=image%2Fpng&Expires=1723452034&Signature=V7XyEzG7jknb1VOxrGoZGcaKbas6kBa67n3GC2HxBJsfyl84s5G2Lb1wKY7HQi-Ufm0Xs~3Fgi6pzUvYeHfG2pKhXZoMq-7pR7QsGlPPMPqgUTpANhWZxBL79vJmSWlwyW3LmKFvO0VR-a3CYE39kncgFYcv7Yg7wgnzfCnougXaIB2zbwiBAUlwNqSbV1ALNmMChQ96D5KXi2s6xOjF-Xm1JehnwBT0l8hqiiZN3Y0Wr-~72gY4Ll8XayoIS2eO8XUnQKL~3ney5d1JjOw9H9gdZSsuaQOABRs5qGqrj9XVne9xmACm9AH4Tdb~dGPbWY~SgNezS8rmhYZb~MhDmA__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ" type="image/x-icon" />
            <link href="/_tailwind.css" rel="stylesheet" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>{title ? `Hyper Task | ${title}` : 'Hyper Task'}</title>
            <script
              src="https://unpkg.com/htmx.org@1.9.10"
              integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
              crossorigin="anonymous"
              defer
            />
          </head>
          <body class="flex flex-col h-screen">
            <Header isAuthenticated={isAuthenticated} />
            <main class="py-8 sm:py-12">{children}</main>
            <Footer />
          </body>
        </html>
      );
    },
    {
      docType: true,
    }
  );
};
