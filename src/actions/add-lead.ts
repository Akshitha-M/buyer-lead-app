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

// Define proper types
interface FormErrors {
  error?: {
    name?: string[];
    email?: string[];
    phone?: string[];
  };
}

interface SuccessResult {
  success: boolean;
}

interface ErrorResult {
  error: string;
}

export type ActionResult = FormErrors | SuccessResult | ErrorResult;

export async function addLead(prevState: unknown, formData: FormData): Promise<ActionResult> {
  // Extract form data
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');

  // Validate input
  const validatedFields = addLeadSchema.safeParse({
    name,
    email,
    phone,
  });

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name: validatedName, email: validatedEmail, phone: validatedPhone } = validatedFields.data;

  try {
    // Insert into database
    await db.insert(leads).values({ 
      name: validatedName, 
      email: validatedEmail, 
      phone: validatedPhone 
    });
    return { success: true };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Failed to create lead' };
  }
}