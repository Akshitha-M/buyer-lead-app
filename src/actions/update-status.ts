// src/actions/update-status.ts
'use server';

import { db } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function updateLeadStatus(leadId: string, newStatus: string) {
  try {
    await db.update(leads)
      .set({ status: newStatus })
      .where(eq(leads.id, leadId));
    return { success: true };
  } catch (error) {
    console.error('Error updating lead status:', error);
    return { error: 'Failed to update lead status' };
  }
}