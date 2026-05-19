import { useEffect, useState } from "react";
import api from "../api/axios";
import LeadTable from "../components/LeadTable";
import debounce from "lodash/debounce";
import AddLeadForm from "../components/AddLeadForm";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const fetchLeads = async (
    searchTerm = "",
    statusFilter = status,
    sourceFilter = source,
    sortOrder = sort,
    pageNumber = page
  ) => {
    try {
      const res = await api.get(
        `/leads?search=${searchTerm}&status=${statusFilter}&source=${sourceFilter}&sort=${sortOrder}&page=${pageNumber}`
      );
  
      setLeads(res.data.leads);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch {
      alert("Failed to fetch leads");
    }
  };

  const debouncedSearch = debounce((value: string) => {
    fetchLeads(value);
  }, 500);

  useEffect(() => {
    fetchLeads();
  }, []);

  const exportCSV = async () => {
    try {
      const response = await api.get("/leads/export", {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "leads.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("CSV export failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leads Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Lead Form */}
      <AddLeadForm refresh={() => fetchLeads(search)} />

      {/* Filters */}
      <div className="flex gap-3 mt-6">
  <button
    disabled={page === 1}
    onClick={() => fetchLeads(search, status, source, sort, page - 1)}
    className="bg-gray-300 px-4 py-2 rounded"
  >
    Previous
  </button>

  <span>Page {page} of {totalPages}</span>

  <button
    disabled={page === totalPages}
    onClick={() => fetchLeads(search, status, source, sort, page + 1)}
    className="bg-gray-300 px-4 py-2 rounded"
  >
    Next
  </button>
</div>
      <div className="flex gap-3 mb-6">
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            fetchLeads(search, e.target.value, source, sort);
          }}
        >
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <select
          className="border p-2 rounded"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            fetchLeads(search, status, e.target.value, sort);
          }}
        >
          <option value="">All Sources</option>
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            fetchLeads(search, status, source, e.target.value);
          }}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Search */}
      <input
        className="border p-3 mb-6 w-full rounded"
        placeholder="Search leads..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />

      {/* Leads Table */}
      {leads.length === 0 ? (
        <p className="text-gray-500">No leads found</p>
      ) : (
        <LeadTable leads={leads} refresh={fetchLeads} />
      )}
    </div>
  );
}