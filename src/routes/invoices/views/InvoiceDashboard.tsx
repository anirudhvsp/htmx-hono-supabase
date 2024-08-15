import { html } from 'hono/html';

export default function InvoiceDashboard() {
  return html`
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Invoice Dashboard</h1>
      <div id="invoice-list" hx-get="/invoices" hx-trigger="load"></div>
    </div>
  `;
}