"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Message = { id: string; sender_role: "student" | "admin"; body: string; created_at: string; read_at: string | null };

export default function StudentChat({ studentName }: { studentName: string }) {
  const [supabase] = useState(createClient);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const { data, error: rpcError } = await supabase.rpc("student_support_messages");
    if (!rpcError) setMessages((data ?? []) as Message[]);
    else if (!rpcError.message.includes("function")) setError(rpcError.message);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, []);

  async function send(event: FormEvent) {
    event.preventDefault();
    if (!body.trim()) return;
    setSending(true); setError("");
    const { error: sendError } = await supabase.rpc("send_support_message", { p_body: body.trim() });
    setSending(false);
    if (sendError) { setError(sendError.message); return; }
    setBody(""); await load();
  }

  return <main className="dashboard">
    <nav className="nav"><div><div className="brand">MINDVYORA</div><span className="pill">STUDENT</span></div><a className="button-secondary button-inline" href="/student">← Learning Space</a></nav>
    <section className="admin-heading"><div><p className="eyebrow">STUDENT SUPPORT</p><h1>Message your teacher</h1><p className="muted">Hi {studentName}. Send a question anytime. Your teacher can reply when available.</p></div></section>
    <section className="tile chat-card">
      <div className="chat-window">{loading ? <p className="muted">Loading messages…</p> : messages.length === 0 ? <div className="empty-state"><h3>Start a conversation</h3><p className="muted">Ask about homework, classwork, activities, or anything you need help with.</p></div> : messages.map((message) => <div key={message.id} className={`chat-bubble ${message.sender_role === "student" ? "chat-bubble-student" : "chat-bubble-admin"}`}><div>{message.body}</div><small>{message.sender_role === "student" ? "You" : "Teacher"} · {new Date(message.created_at).toLocaleString()}</small></div>)}</div>
      {error && <p className="error">{error}</p>}
      <form className="chat-form" onSubmit={send}><textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} placeholder="Type your message…" rows={3} /><button disabled={sending || !body.trim()}>{sending ? "Sending…" : "Send message"}</button></form>
    </section>
  </main>;
}
