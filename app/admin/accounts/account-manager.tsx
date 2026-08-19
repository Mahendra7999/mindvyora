"use client";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AccountStudent } from "./page";

export type Credential = { student_id: string; school_id: string; student_code: string; full_name: string; login: string; password: string };

export default function AccountManager({ adminName, initialError, initialStudents }: { adminName: string; initialError: string; initialStudents: AccountStudent[] }) {
  const supabase = createClient();
  const [students, setStudents] = useState(initialStudents);
  const [selected, setSelected] = useState<string[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(initialError);
  const [busy, setBusy] = useState(false);
  const unlinked = useMemo(() => students.filter(s => !s.auth_user_id), [students]);
  const selectedUnlinked = selected.filter(id => unlinked.some(s => s.id === id));
  function toggle(id: string) { setSelected(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); }
  function selectAll() { setSelected(selectedUnlinked.length === unlinked.length ? [] : unlinked.map(s => s.id)); }
  async function createAccounts() {
    if (!selectedUnlinked.length) return;
    setBusy(true); setError(""); setMessage(""); setCredentials([]);
    const { data, error: invokeError } = await supabase.functions.invoke("create-student-accounts", { body: { student_ids: selectedUnlinked } });
    setBusy(false);
    if (invokeError) { setError(invokeError.message); return; }
    if (data?.error) { setError(data.error); return; }
    const created = (data?.created ?? []) as Credential[];
    setCredentials(created);
    setMessage(`${created.length} student account${created.length === 1 ? "" : "s"} created. Save the credentials below; passwords are shown only once.`);
    setStudents(current => current.map(s => { const c = created.find(x => x.student_id === s.id); return c ? { ...s, auth_user_id: c.student_id } : s; }));
    setSelected([]);
  }
  function downloadCredentials() {
    if (!credentials.length) return;
    const header = "School ID,Student Code,Student Name,Login,Password";
    const csv = [header, ...credentials.map(c => [c.school_id,c.student_code,c.full_name,c.login,c.password].map(v => `"${String(v).replaceAll('"','""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "mindvyora-student-credentials.csv"; a.click(); URL.revokeObjectURL(url);
  }
  return <main className="dashboard"><nav className="nav admin-nav"><div><div className="brand">MINDVYORA</div><span className="pill">ADMIN</span></div><div className="nav-actions"><span className="muted">{adminName}</span><a className="button-secondary button-inline" href="/admin">← Students</a><a className="button-secondary button-inline" href="/admin/messages">Messages</a></div></nav>
    <section className="admin-heading"><div><p className="eyebrow">STUDENT ACCOUNTS</p><h1>Create Logins</h1><p className="muted">Generate Supabase login accounts for imported students who do not have one yet.</p></div></section>
    <section className="summary-grid"><div className="stat-card"><span className="muted">Students without login</span><strong>{unlinked.length}</strong></div><div className="stat-card"><span className="muted">Selected</span><strong>{selectedUnlinked.length}</strong></div></section>
    {error && <p className="error" role="alert">{error}</p>}{message && <p className="success" role="status">{message}</p>}
    <section className="tile student-list-section"><div className="section-heading"><div><h2>Students</h2><p className="muted">Select students to create accounts.</p></div><div className="nav-actions"><button className="button-secondary button-inline" onClick={selectAll}>{selectedUnlinked.length === unlinked.length && unlinked.length ? "Clear selection" : "Select all"}</button><button className="button-inline" onClick={createAccounts} disabled={busy || !selectedUnlinked.length}>{busy ? "Creating…" : `Create Accounts (${selectedUnlinked.length})`}</button></div></div>
      {unlinked.length === 0 ? <div className="empty-state"><h3>All students have accounts.</h3><p className="muted">There are no unlinked student records.</p></div> : <div className="student-table-wrap"><table className="student-table"><thead><tr><th></th><th>Student</th><th>School ID</th><th>Code</th><th>Class</th><th>Status</th></tr></thead><tbody>{students.map(s => <tr key={s.id}><td><input type="checkbox" checked={selected.includes(s.id)} disabled={!!s.auth_user_id} onChange={() => toggle(s.id)} /></td><td>{s.full_name}</td><td>{s.school_id}</td><td><span className="pill">{s.student_code}</span></td><td>{s.class_name}{s.section ? `-${s.section}` : ""}</td><td>{s.auth_user_id ? "Account created" : "Not created"}</td></tr>)}</tbody></table></div>}
    </section>
    {credentials.length > 0 && <section className="tile student-list-section"><div className="section-heading"><div><h2>New login credentials</h2><p className="muted">Passwords are not stored in MINDVYORA. Download this file now and share credentials securely.</p></div><button className="button-secondary button-inline" onClick={downloadCredentials}>Download CSV</button></div><div className="student-table-wrap"><table className="student-table"><thead><tr><th>Student</th><th>School ID</th><th>Login</th><th>Password</th></tr></thead><tbody>{credentials.map(c => <tr key={c.student_id}><td>{c.full_name}</td><td>{c.school_id}</td><td>{c.login}</td><td><code>{c.password}</code></td></tr>)}</tbody></table></div></section>}
  </main>;
}
