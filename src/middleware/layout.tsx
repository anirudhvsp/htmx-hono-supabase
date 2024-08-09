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
