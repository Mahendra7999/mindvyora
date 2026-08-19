"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  student_code: string;
  full_name: string;
  class_name: string;
  section: string | null;
  roll_number: number | null;
};

export default function AdminPage() {
  const supabase = createClient();
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    student_code: "",
    full_name: "",
    class_name: "",
    section: "",
    roll_number: "",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      router.push("/student");
      return;
    }

    const { data, error } = await supabase
      .from("students")
      .select(
        "id, student_code, full_name, class_name, section, roll_number"
      )
      .order("class_name")
      .order("roll_number");

    if (error) {
      setError(error.message);
    } else {
      setStudents(data || []);
    }

    setLoading(false);
  }

  function updateForm(field: string, value: string) {
    setForm((old) => ({
      ...old,
      [field]: value,
    }));
  }

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();

    if (!form.student_code || !form.full_name || !form.class_name) {
      setError("Student ID, name and class are required.");
      return;
    }

    setSaving(true);
    setError("");

    const { error } = await supabase.from("students").insert({
      student_code: form.student_code.trim(),
      full_name: form.full_name.trim(),
      class_name: form.class_name.trim(),
      section: form.section.trim() || null,
      roll_number: form.roll_number
        ? Number(form.roll_number)
        : null,
    });

    if (error) {
      setError(error.message);
    } else {
      setForm({
        student_code: "",
        full_name: "",
        class_name: "",
        section: "",
        roll_number: "",
      });

      setShowForm(false);
      await loadStudents();
    }

    setSaving(false);
  }

  async function deleteStudent(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadStudents();
  }

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.full_name.toLowerCase().includes(query) ||
      student.student_code.toLowerCase().includes(query) ||
      student.class_name.toLowerCase().includes(query) ||
      (student.section || "").toLowerCase().includes(query)
    );
  });

  return (
    <main className="dashboard">
      <nav className="nav">
        <div>
          <div className="brand">MINDVYORA</div>
          <span className="pill">ADMIN</span>
        </div>

        <button
          style={{ width: "auto" }}
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
        >
          Logout
        </button>
      </nav>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1>Student Management</h1>
          <p className="muted">
            Create and manage MINDVYORA student records.
          </p>
        </div>

        <button
          style={{ width: "auto" }}
          onClick={() => {
            setError("");
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "+ Add Student"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {showForm && (
        <section
          className="tile"
          style={{
            marginTop: 24,
            maxWidth: 700,
          }}
        >
          <h2>Add New Student</h2>

          <form
            onSubmit={addStudent}
            className="form"
          >
            <input
              placeholder="Student ID e.g. MV-0001"
              value={form.student_code}
              onChange={(e) =>
                updateForm("student_code", e.target.value)
              }
              required
            />

            <input
              placeholder="Full name"
              value={form.full_name}
              onChange={(e) =>
                updateForm("full_name", e.target.value)
              }
              required
            />

            <input
              placeholder="Class e.g. 9"
              value={form.class_name}
              onChange={(e) =>
                updateForm("class_name", e.target.value)
              }
              required
            />

            <input
              placeholder="Section e.g. A"
              value={form.section}
              onChange={(e) =>
                updateForm("section", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Roll number"
              value={form.roll_number}
              onChange={(e) =>
                updateForm("roll_number", e.target.value)
              }
            />

            <button disabled={saving}>
              {saving ? "Saving..." : "Create Student"}
            </button>
          </form>
        </section>
      )}

      <section style={{ marginTop: 32 }}>
        <input
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ marginTop: 16 }}>
          {loading ? (
            <p className="muted">Loading students...</p>
          ) : filteredStudents.length === 0 ? (
            <div className="tile">
              <h3>No students found</h3>
              <p className="muted">
                Add your first student using the button above.
              </p>
            </div>
          ) : (
            <div className="grid">
              {filteredStudents.map((student) => (
                <div
                  className="tile"
                  key={student.id}
                >
                  <span className="pill">
                    {student.student_code}
                  </span>

                  <h3>{student.full_name}</h3>

                  <p className="muted">
                    Class {student.class_name}
                    {student.section
                      ? `-${student.section}`
                      : ""}
                    {student.roll_number
                      ? ` • Roll ${student.roll_number}`
                      : ""}
                  </p>

                  <button
                    style={{
                      marginTop: 12,
                      background: "#27272a",
                      color: "#fca5a5",
                    }}
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
