import { useState } from "react";

const initialUsers = [
  { id: 1, name: "Priya Sharma", designation: "Software Engineer", code: "EMP001", company: "TechCorp", email: "priya@techcorp.com", address: "Mumbai, India" },
  { id: 2, name: "Rahul Verma", designation: "Project Manager", code: "EMP002", company: "InnoSoft", email: "rahul@innosoft.com", address: "Delhi, India" },
];

const emptyForm = { name: "", designation: "", code: "", company: "", email: "", address: "" };

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [mode, setMode] = useState("list");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleAdd = () => { setForm(emptyForm); setMode("add"); };
  const handleEdit = (user) => { setForm({ ...user }); setEditId(user.id); setMode("edit"); };
  const handleView = (user) => { setForm({ ...user }); setMode("view"); };
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers(users.filter(u => u.id !== id));
    showToast("User deleted successfully.");
  };
  const handleSearch = () => {
    setSearchError("");
    setSearchResult(null);
    const found = users.find(u => u.id === parseInt(searchId) || u.code === searchId);
    if (found) setSearchResult(found);
    else setSearchError(`No user found for "${searchId}"`);
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.code) return showToast("Name, Code & Email are required.");
    if (mode === "add") {
      const newUser = { ...form, id: Date.now() };
      setUsers([...users, newUser]);
      showToast("User added successfully!");
    } else {
      setUsers(users.map(u => u.id === editId ? { ...form, id: editId } : u));
      showToast("User updated successfully!");
    }
    setMode("list");
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
        .btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
        .btn-primary { background: linear-gradient(135deg, #5c3af5, #8b5cf6); color: #fff; }
        .btn-warning { background: linear-gradient(135deg, #f59e0b, #fbbf24); color: #1a1a24; }
        .btn-danger  { background: linear-gradient(135deg, #ef4444, #f87171); color: #fff; }
        .btn-info    { background: linear-gradient(135deg, #06b6d4, #22d3ee); color: #1a1a24; }
        .btn-ghost   { background: transparent; border: 1px solid #3a3a52; color: #a0a0c0; }
        .btn-ghost:hover { border-color: #5c3af5; color: #8b5cf6; background: #1e1e2e; }
        .card  { background: #1a1a28; border: 1px solid #2a2a3e; border-radius: 14px; }
        .input { width: 100%; padding: 10px 14px; background: #12121e; border: 1px solid #2a2a3e; border-radius: 8px; color: #e8e8f0; font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border 0.2s; }
        .input:focus   { border-color: #5c3af5; box-shadow: 0 0 0 3px rgba(92,58,245,0.15); }
        .input:disabled { opacity: 0.6; cursor: not-allowed; }
        .label { font-size: 12px; font-weight: 600; color: #7070a0; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; display: block; }
        .tag   { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: rgba(92,58,245,0.15); color: #8b5cf6; border: 1px solid rgba(92,58,245,0.3); }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #5c3af5; border-bottom: 1px solid #2a2a3e; }
        td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #1e1e2e; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(92,58,245,0.05); }
        .toast { position: fixed; bottom: 24px; right: 24px; background: #1a1a28; border: 1px solid #5c3af5; border-radius: 10px; padding: 12px 20px; font-size: 14px; color: #e8e8f0; box-shadow: 0 8px 32px rgba(0,0,0,0.5); z-index: 999; animation: fadeIn 0.3s ease; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #2a2a3e", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, background: "#12121e" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#5c3af5,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👥</div>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 18 }}>User Management</div>
          <div style={{ fontSize: 12, color: "#5c5c80", marginTop: 2 }}>Frontend only · No backend required</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span className="tag">{users.length} Users</span>
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

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
                <div key={key}><span className="label">{label.replace(" *","")}</span><div style={{ fontSize: 14 }}>{searchResult[key] || "—"}</div></div>
              ))}
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
            <table>
              <thead>
                <tr><th>ID</th><th>Name</th><th>Designation</th><th>Code</th><th>Company</th><th>Email</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: "center", color: "#5c5c80", padding: 40 }}>No users found. Click "Add User" to begin.</td></tr>
                )}
                {users.map(u => (
                  <tr key={u.id}>
                    <td><span style={{ fontFamily: "'Space Mono', monospace", color: "#5c3af5", fontSize: 12 }}>#{u.id}</span></td>
                    <td><strong>{u.name}</strong></td>
                    <td style={{ color: "#a0a0c0" }}>{u.designation || "—"}</td>
                    <td><span className="tag">{u.code}</span></td>
                    <td>{u.company || "—"}</td>
                    <td style={{ color: "#a0a0c0", fontSize: 13 }}>{u.email}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-info"    style={{ padding: "5px 10px" }} onClick={() => handleView(u)}>View</button>
                        <button className="btn btn-warning" style={{ padding: "5px 10px" }} onClick={() => handleEdit(u)}>Edit</button>
                        <button className="btn btn-danger"  style={{ padding: "5px 10px" }} onClick={() => handleDelete(u.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  {mode === "view" ? "Read-only details" : "Fill in all required fields"}
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
              <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {mode === "add" ? "✓ Add User" : "✓ Update User"}
                </button>
                <button className="btn btn-ghost" onClick={() => setMode("list")}>Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>

      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}