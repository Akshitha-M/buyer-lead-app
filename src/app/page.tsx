// src/app/page.tsx
'use client';

import { useActionState } from 'react';
import { addLead } from '@/actions/add-lead';

export default function Home() {
  const [state, formAction, isPending] = useActionState(addLead, null);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Express Interest</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name *</label>
          <input type="text" id="name" name="name" required className="w-full p-2 border rounded" />
          {state?.error?.name && <p className="text-red-500 text-sm">{state.error.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">Email *</label>
          <input type="email" id="email" name="email" required className="w-full p-2 border rounded" />
          {state?.error?.email && <p className="text-red-500 text-sm">{state.error.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1">Phone</label>
          <input type="tel" id="phone" name="phone" className="w-full p-2 border rounded" />
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
        
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state?.success && <p className="text-green-500 text-sm">Thank you for your interest!</p>}
      </form>
    </div>
  );
}