// src/app/api/update-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { leadId, newStatus } = await request.json();

    if (!leadId || !newStatus) {
      return NextResponse.json(
        { error: 'Missing leadId or newStatus' },
        { status: 400 }
      );
    }

    await db.update(leads)
      .set({ status: newStatus })
      .where(eq(leads.id, leadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}