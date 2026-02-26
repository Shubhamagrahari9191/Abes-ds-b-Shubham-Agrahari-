import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

const emptyForm = { name: "", designation: "", code: "", company: "", email: "", address: "" };

// ─── Axios instance ───────────────────────────────────────
const api = axios.create({ baseURL: "http://localhost:5000/api" });

export default function UserManagement() {
  const [users, setUsers]           = useState([]);
  const [mode, setMode]             = useState("list");
  const [form, setForm]             = useState(emptyForm);
  const [editId, setEditId]         = useState(null);
  const [searchId, setSearchId]     = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError]   = useState("");
  const [loading, setLoading]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]           = useState({ msg: "", type: "success" });
  const [error, setError]           = useState("");

  // ── Toast helper
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  // ── Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      setError("Failed to connect to server. Is your backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Add user
  const handleAdd = () => { setForm(emptyForm); setMode("add"); };

  // ── View user
  const handleView = (user) => {
    setForm({ name: user.name, designation: user.designation, code: user.code, company: user.company, email: user.email, address: user.address });
    setEditId(user._id);
    setMode("view");
  };

  // ── Edit user
  const handleEdit = (user) => {
    setForm({ name: user.name, designation: user.designation, code: user.code, company: user.company, email: user.email, address: user.address });
    setEditId(user._id);
    setMode("edit");
  };

  // ── Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      showToast("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed.", "error");
    }
  };

  // ── Search by ID or code
  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setSearchError(""); setSearchResult(null);
    try {
      const res = await api.get(`/users/search/${searchId.trim()}`);
      setSearchResult(res.data.data);
    } catch (err) {
      setSearchError(err.response?.data?.message || "Search failed.");
    }
  };

  // ── Submit (add or update)
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.code) {
      showToast("Name, Code & Email are required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "add") {
        await api.post("/users", form);
        showToast("User added successfully!");
      } else {
        await api.put(`/users/${editId}`, form);
        showToast("User updated successfully!");
      }
      setMode("list");
      fetchUsers();
    } catch (err) {
      showToast(err.response?.data?.message || "Operation failed.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { key: "name",        label: "Full Name *" },
    { key: "designation", label: "Designation" },
    { key: "code",        label: "Employee Code *" },
    { key: "company",     label: "Company" },
    { key: "email",       label: "Email Address *" },
    { key: "address",     label: "Address" },
  ];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", background: "#0f0f14", color: "#e8e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1a1a24; } ::-webkit-scrollbar-thumb { background: #5c3af5; border-radius: 3px; }
        .btn { cursor: pointer; border: none; border-radius: 8px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 13px; padding: 8px 16px; transition: all 0.2s; letter-spacing: 0.3px; }
        .btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-primary { background: linear-gradient(135deg, #5c3af5, #8b5cf6); color: #fff; }
        .btn-warning { background: linear-gradient(135deg, #f59e0b, #fbbf24); color: #1a1a24; }
        .btn-danger  { background: linear-gradient(135deg, #ef4444, #f87171); color: #fff; }
        .btn-info    { background: linear-gradient(135deg, #06b6d4, #22d3ee); color: #1a1a24; }
        .btn-ghost   { background: transparent; border: 1px solid #3a3a52; color: #a0a0c0; }
        .btn-ghost:hover:not(:disabled) { border-color: #5c3af5; color: #8b5cf6; background: #1e1e2e; }
        .card  { background: #1a1a28; border: 1px solid #2a2a3e; border-radius: 14px; }
        .input { width: 100%; padding: 10px 14px; background: #12121e; border: 1px solid #2a2a3e; border-radius: 8px; color: #e8e8f0; font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border 0.2s; }
        .input:focus   { border-color: #5c3af5; box-shadow: 0 0 0 3px rgba(92,58,245,0.15); }
        .input:disabled { opacity: 0.6; cursor: not-allowed; }
        .label { font-size: 12px; font-weight: 600; color: #7070a0; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; display: block; }
        .tag   { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: rgba(92,58,245,0.15); color: #8b5cf6; border: 1px solid rgba(92,58,245,0.3); }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #5c3af5; border-bottom: 1px solid #2a2a3e; }
        td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #1e1e2e; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(92,58,245,0.05); }
        .toast-success { background: #1a1a28; border: 1px solid #5c3af5; color: #e8e8f0; }
        .toast-error   { background: #1a1a28; border: 1px solid #ef4444; color: #f87171; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #2a2a3e", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, background: "#12121e" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#5c3af5,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👥</div>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 18 }}>User Management</div>
          <div style={{ fontSize: 12, color: "#5c5c80", marginTop: 2 }}>React + Node.js + Express + MongoDB</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <span className="tag">{users.length} Users</span>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: error ? "#ef4444" : "#22c55e", boxShadow: error ? "0 0 6px #ef4444" : "0 0 6px #22c55e" }} title={error ? "Disconnected" : "Connected"} />
          <span style={{ fontSize: 11, color: error ? "#ef4444" : "#22c55e" }}>{error ? "Disconnected" : "Connected"}</span>
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Server Error Banner */}
        {error && (
          <div style={{ padding: "14px 18px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, color: "#f87171", marginBottom: 20, fontSize: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>⚠️ {error}</span>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: "4px 10px" }} onClick={fetchUsers}>Retry</button>
          </div>
        )}

        {/* Action Bar */}
        {mode === "list" && (
          <div className="fade-in" style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
            <button className="btn btn-primary" onClick={handleAdd}>＋ Add User</button>
            <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" }}>
              <input
                className="input"
                style={{ width: 200 }}
                placeholder="Search by ID or Code..."
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
              <button className="btn btn-info" onClick={handleSearch}>🔍 Search</button>
              {(searchResult || searchError) && (
                <button className="btn btn-ghost" onClick={() => { setSearchResult(null); setSearchError(""); setSearchId(""); }}>✕ Clear</button>
              )}
            </div>
          </div>
        )}

        {/* Search Result */}
        {searchResult && (
          <div className="card fade-in" style={{ padding: 20, marginBottom: 20, border: "1px solid #5c3af5" }}>
            <div style={{ fontSize: 12, color: "#5c3af5", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Search Result</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {fields.map(({ key, label }) => (
                <div key={key}><span className="label">{label.replace(" *", "")}</span><div style={{ fontSize: 14 }}>{searchResult[key] || "—"}</div></div>
              ))}
              <div><span className="label">MongoDB ID</span><div style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: "#5c3af5" }}>{searchResult._id}</div></div>
            </div>
          </div>
        )}
        {searchError && (
          <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, color: "#f87171", marginBottom: 20, fontSize: 14 }}>
            {searchError}
          </div>
        )}

        {/* User Table */}
        {mode === "list" && (
          <div className="card fade-in" style={{ overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: 60, textAlign: "center", color: "#5c5c80" }}>
                <div className="spinner" style={{ margin: "0 auto 12px", width: 28, height: 28, borderWidth: 3 }} />
                <div>Loading users...</div>
              </div>
            ) : (
              <table>
                <thead>
                  <tr><th>Name</th><th>Designation</th><th>Code</th><th>Company</th><th>Email</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: "center", color: "#5c5c80", padding: 40 }}>No users found. Click "Add User" to begin.</td></tr>
                  )}
                  {users.map(u => (
                    <tr key={u._id}>
                      <td><strong>{u.name}</strong></td>
                      <td style={{ color: "#a0a0c0" }}>{u.designation || "—"}</td>
                      <td><span className="tag">{u.code}</span></td>
                      <td>{u.company || "—"}</td>
                      <td style={{ color: "#a0a0c0", fontSize: 13 }}>{u.email}</td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn-info"    style={{ padding: "5px 10px" }} onClick={() => handleView(u)}>View</button>
                          <button className="btn btn-warning" style={{ padding: "5px 10px" }} onClick={() => handleEdit(u)}>Edit</button>
                          <button className="btn btn-danger"  style={{ padding: "5px 10px" }} onClick={() => handleDelete(u._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Add / Edit / View Form */}
        {(mode === "add" || mode === "edit" || mode === "view") && (
          <div className="card fade-in" style={{ padding: 28, maxWidth: 700 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 16 }}>
                  {mode === "add" ? "Add New User" : mode === "edit" ? "Edit User" : "View User"}
                </div>
                <div style={{ fontSize: 12, color: "#5c5c80", marginTop: 2 }}>
                  {mode === "view" ? "Read-only · MongoDB document" : "Changes are saved to MongoDB"}
                </div>
              </div>
              <button className="btn btn-ghost" onClick={() => setMode("list")}>← Back to List</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input
                    className="input"
                    value={form[key]}
                    disabled={mode === "view"}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={mode === "view" ? "" : `Enter ${label.replace(" *", "").toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            {mode !== "view" && (
              <div style={{ marginTop: 24, display: "flex", gap: 10, alignItems: "center" }}>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? <span className="spinner" /> : mode === "add" ? "✓ Add User" : "✓ Update User"}
                </button>
                <button className="btn btn-ghost" onClick={() => setMode("list")} disabled={submitting}>Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast.msg && (
        <div className={`toast-${toast.type}`} style={{ position: "fixed", bottom: 24, right: 24, borderRadius: 10, padding: "12px 20px", fontSize: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 999, animation: "fadeIn 0.3s ease" }}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
    </div>
  );
}
