export default function Filters() {
    return (
      <div className="flex gap-2 mb-4">
        <select className="border p-2">
          <option>Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>
  
        <select className="border p-2">
          <option>Source</option>
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>
  
        <input
          className="border p-2 flex-1"
          placeholder="Search by name/email"
        />
      </div>
    );
  }