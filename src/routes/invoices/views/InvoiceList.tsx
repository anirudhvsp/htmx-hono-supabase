import { html } from 'hono/html';
import { Invoice } from '../models/invoice.model';

interface Props {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: Props) {
  return html`
    <div class="space-y-4">
      ${invoices.map(
        (invoice) => html`
          <div class="bg-white shadow rounded-lg p-4">
            <h2 class="text-lg font-semibold">Invoice #${invoice.id}</h2>
            <p class="text-gray-600">Created: ${invoice.created_at.toLocaleString()}</p>
            <pre class="mt-2 bg-gray-100 p-2 rounded">${JSON.stringify(
              invoice.dataJson,
              null,
              2
            )}</pre>
          </div>
        `
      )}
    </div>
  `;
}