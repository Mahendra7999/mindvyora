"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import * as XLSX from "xlsx";

type Row = { school_id: string; full_name: string; class_name: string; section: string; roll_number: string };
type Result = { added: number; updated: number; unchanged: number; total: number };

const headers = ["School ID", "Student Name", "Class", "Section", "Roll No."];

function normalizeRow(raw: Record<string, unknown>): Row {
  const get = (names: string[]) => {
    const key = Object.keys(raw).find((k) => names.includes(k.trim().toLowerCase()));
    return key ? String(raw[key] ?? "").trim() : "";
  };
  return {
    school_id: get(["school id", "school_id", "schoolid"]),
    full_name: get(["student name", "full name", "name"]),
    class_name: get(["class", "class name", "class_name"]),
    section: get(["section"]),
    roll_number: get(["roll no.", "roll no", "roll number", "roll_number"]),
  };
}

function downloadTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([headers, ["KV001", "Test Student", "9", "A", "1"]]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, "mindvyora-student-template.xlsx");
}

export default function StudentImportPage() {
  const supabase = createClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const counts = useMemo(() => ({ total: rows.length }), [rows]);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name); setRows([]); setErrors([]); setResult(null); setMessage("");
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const first = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(first, { defval: "" });
      const parsed = raw.map(normalizeRow);
      const problems: string[] = [];
      const seen = new Map<string, number>();
      parsed.forEach((r, i) => {
        const n = i + 2;
        const id = r.school_id.toUpperCase();
        if (!r.school_id || !r.full_name || !r.class_name) problems.push(`Row ${n}: School ID, Student Name and Class are required.`);
        if (r.roll_number && !/^\d+$/.test(r.roll_number)) problems.push(`Row ${n}: Roll No. must be a whole number.`);
        if (id) {
          if (seen.has(id)) problems.push(`Row ${n}: duplicate School ID ${id} (also row ${seen.get(id)}).`);
          else seen.set(id, n);
        }
      });
      if (!wb.SheetNames.length || parsed.length === 0) problems.push("The file contains no student rows.");
      setErrors(problems); setRows(parsed);
    } catch (e) {
      setErrors([e instanceof Error ? e.message : "Could not read this file."]);
    }
  }

  async function importRows() {
    if (errors.length || !rows.length) return;
    setBusy(true); setMessage(""); setResult(null);
    const payload = rows.map((r) => ({ school_id: r.school_id.toUpperCase(), full_name: r.full_name, class_name: r.class_name, section: r.section || null, roll_number: r.roll_number ? Number(r.roll_number) : null }));
    const { data, error } = await supabase.rpc("import_students_bulk", { p_rows: payload });
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    setResult(data as Result); setMessage("Import completed successfully.");
  }

  return <main className="dashboard">
    <nav className="nav"><div><div className="brand">MINDVYORA</div><span className="pill">ADMIN</span></div><a className="button-secondary button-inline" href="/admin">← Students</a></nav>
    <section className="admin-heading"><div><p className="eyebrow">BULK IMPORT</p><h1>Import Students</h1><p className="muted">Upload Excel or CSV, validate it, preview it, then import safely.</p></div><button className="button-secondary button-inline" onClick={downloadTemplate}>Download Template</button></section>
    <section className="tile import-card">
      <h2>1. Upload file</h2><p className="muted">Required columns: School ID, Student Name, Class, Section, Roll No.</p>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} />
      {fileName && <p className="muted">Selected: {fileName} · {counts.total} rows</p>}
    </section>
    {errors.length > 0 && <section className="tile import-error"><h2>Fix these errors before importing</h2><ul>{errors.slice(0, 20).map((e) => <li key={e}>{e}</li>)}</ul>{errors.length > 20 && <p>…and {errors.length - 20} more.</p>}</section>}
    {rows.length > 0 && errors.length === 0 && <section className="tile import-card"><h2>2. Preview</h2><p className="muted">{rows.length} valid rows are ready. Existing School IDs will be updated; new ones will receive the next MINDVYORA ID.</p><div className="student-table-wrap"><table className="student-table"><thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.slice(0, 20).map((r, i) => <tr key={`${r.school_id}-${i}`}><td>{r.school_id}</td><td>{r.full_name}</td><td>{r.class_name}</td><td>{r.section || "—"}</td><td>{r.roll_number || "—"}</td></tr>)}</tbody></table></div>{rows.length > 20 && <p className="muted">Showing first 20 of {rows.length} rows.</p>}<button onClick={importRows} disabled={busy}>{busy ? "Importing…" : `Confirm Import (${rows.length})`}</button></section>}
    {message && <p className={result ? "success" : "error"}>{message}</p>}
    {result && <section className="summary-grid"><div className="stat-card"><span className="muted">Added</span><strong>{result.added}</strong></div><div className="stat-card"><span className="muted">Updated</span><strong>{result.updated}</strong></div><div className="stat-card"><span className="muted">Unchanged</span><strong>{result.unchanged}</strong></div></section>}
  </main>;
}
