"use client";

import { useState } from "react";

export default function AddUserForm() {
  const [form, setForm] = useState({
    email: "",
    // username: "",
    wallet_address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setForm({
          email: "",
          // username: "",
          wallet_address: "",
        });
      } else {
        setMessage(`❌ ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 border rounded"
    >
      <h2 className="text-lg font-bold">Add User</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      /> */}

      <input
        type="text"
        name="wallet_address"
        placeholder="Wallet Address"
        value={form.wallet_address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Adding..." : "Add User"}
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
