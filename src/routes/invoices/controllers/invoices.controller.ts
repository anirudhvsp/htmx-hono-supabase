import { Context } from 'hono';
import invoicesService from '../services/invoices.service';
import InvoiceList from '../views/InvoiceList';
async function getInvoices(c: Context) {
  const invoices = await invoicesService.getInvoices(c);
  return c.render(InvoiceList({ invoices }));
}

async function createInvoice(c: Context) {
  const invoiceData = await c.req.json();
  const newInvoice = await invoicesService.saveInvoice(c, invoiceData);
  return c.json(newInvoice);
}

async function getInvoiceById(c: Context) {
  const { id } = c.req.param();
  const invoice = await invoicesService.getInvoiceById(c, id);
  return c.json(invoice);
}

async function updateInvoice(c: Context) {
  const { id } = c.req.param();
  const invoiceData = await c.req.json();
  const updatedInvoice = await invoicesService.updateInvoice(c, id, invoiceData);
  return c.json(updatedInvoice);
}

async function deleteInvoice(c: Context) {
  const { id } = c.req.param();
  await invoicesService.deleteInvoice(c, id);
  return c.json({ success: true });
}

export default {
  getInvoices,
  createInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};