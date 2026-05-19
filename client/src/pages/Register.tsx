import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("sales");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "sales"
      });

      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 p-6 shadow rounded">
        <h1 className="text-2xl mb-4">Register</h1>

        <input
          placeholder="Name"
          className="w-full border p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
  className="w-full border p-2 mb-3"
  onChange={(e) => setRole(e.target.value)}
>
  <option value="sales">Sales</option>
  <option value="admin">Admin</option>
</select>

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}