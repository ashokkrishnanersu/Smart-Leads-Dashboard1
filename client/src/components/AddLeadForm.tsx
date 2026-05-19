import { useState } from "react";
import api from "../api/axios";

interface AddLeadFormProps {
  refresh: () => void;
}

export default function AddLeadForm({ refresh }: AddLeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("New");
  const [source, setSource] = useState("Website");

  const submit = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/leads", {
        name,
        email,
        status,
        source
      });

      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");

      refresh();
    } catch {
      alert("Failed to add lead");
    }
  };

  return (
    <div className="mb-6 flex gap-3 flex-wrap">
      <input
        className="border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Lost</option>
      </select>

      <select
        className="border p-2 rounded"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option>Website</option>
        <option>Instagram</option>
        <option>Referral</option>
      </select>

      <button
        onClick={submit}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add Lead
      </button>
    </div>
  );
}