// src/app/dashboard/page.tsx
import { db } from '@/db';
import { leads } from '@/db/schema';
import { desc } from 'drizzle-orm';

export default async function DashboardPage() {
  // Fetch all leads from the database, newest first
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lead Dashboard</h1>
      
      {allLeads.length === 0 ? (
        <p>No leads submitted yet.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {allLeads.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.phone || 'N/A'}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}