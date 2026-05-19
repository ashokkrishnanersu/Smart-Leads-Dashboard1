import api from "../api/axios";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

interface LeadTableProps {
  leads: Lead[];
  refresh: () => void;
}

export default function LeadTable({
  leads,
  refresh
}: LeadTableProps) {
  const deleteLead = async (id: string) => {
    try {
      await api.delete(`/leads/${id}`);
      refresh();
    } catch {
      alert("Failed to delete lead");
    }
  };

  const editLead = async (id: string) => {
    const newStatus = prompt(
      "Enter new status (New / Contacted / Qualified / Lost)"
    );

    if (!newStatus) return;

    try {
      await api.put(`/leads/${id}`, {
        status: newStatus
      });

      refresh();
    } catch {
      alert("Failed to update lead");
    }
  };

  const viewLead = (lead: Lead) => {
    alert(
      `Name: ${lead.name}\nEmail: ${lead.email}\nStatus: ${lead.status}\nSource: ${lead.source}`
    );
  };

  return (
    <table className="w-full bg-white shadow rounded mt-4">
      <thead>
        <tr className="border-b">
          <th className="p-2">Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Source</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id} className="border-b text-center">
            <td className="p-2">{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.status}</td>
            <td>{lead.source}</td>

            <td className="space-x-3">
              <button
                onClick={() => viewLead(lead)}
                className="text-green-500"
              >
                View
              </button>

              <button
                onClick={() => editLead(lead._id)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => deleteLead(lead._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}