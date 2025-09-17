// src/components/StatusDropdown.tsx
'use client';

import { useRouter } from 'next/navigation';

interface StatusDropdownProps {
  leadId: string;
  currentStatus: string;
}

export function StatusDropdown({ leadId, currentStatus }: StatusDropdownProps) {
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch('/api/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId, newStatus }),
      });

      if (response.ok) {
        router.refresh(); // Refresh the page to show updated status
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const statusOptions = ['NEW', 'CONTACTED', 'CLOSED', 'INTERESTED', 'NOT_INTERESTED'];

  return (
    <select 
      value={currentStatus}
      onChange={(e) => handleStatusChange(e.target.value)}
      className="px-2 py-1 border rounded text-sm"
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}