import { Context } from 'hono';
import { Invoice } from '../models/invoice.model';

async function getInvoices(c: Context): Promise<Invoice[]> {
  const { data: invoices, error } = await c.var.supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return invoices;
}

async function saveInvoice(c: Context, invoiceData: any): Promise<Invoice> {
  const { data, error } = await c.var.supabase
    .from('invoices')
    .insert({ dataJson: invoiceData })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function getInvoiceById(c: Context, id: string): Promise<Invoice> {
  const { data, error } = await c.var.supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function updateInvoice(c: Context, id: string, invoiceData: any): Promise<Invoice> {
  const { data, error } = await c.var.supabase
    .from('invoices')
    .update({ dataJson: invoiceData })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function deleteInvoice(c: Context, id: string): Promise<void> {
  const { error } = await c.var.supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export default {
  getInvoices,
  saveInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};