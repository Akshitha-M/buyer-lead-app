// src/components/StatusDropdown.tsx
'use client';

import { useActionState } from 'react';
import { updateLeadStatus } from '@/actions/update-status';

interface StatusDropdownProps {
  leadId: string;
  currentStatus: string;
}

export function StatusDropdown({ leadId, currentStatus }: StatusDropdownProps) {
  const [state, action, isPending] = useActionState(
    (prevState: any, formData: FormData) => {
      const newStatus = formData.get('status') as string;
      return updateLeadStatus(leadId, newStatus);
    },
    null
  );

  const statusOptions = ['NEW', 'CONTACTED', 'CLOSED', 'INTERESTED', 'NOT_INTERESTED'];

  return (
    <form action={action}>
      <select 
        name="status" 
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={(e) => e.target.form?.requestSubmit()}
        className="px-2 py-1 border rounded text-sm"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {isPending && <span className="ml-2 text-xs">Updating...</span>}
    </form>
  );
}