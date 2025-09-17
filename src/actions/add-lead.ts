// src/actions/add-lead.ts
'use server';

import { db } from '@/db';
import { leads } from '@/db/schema';
import { z } from 'zod';

const addLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export async function addLead(formData: FormData) {
  const validatedFields = addLeadSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, phone } = validatedFields.data;

  try {
    await db.insert(leads).values({ name, email, phone });
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create lead' };
  }
}