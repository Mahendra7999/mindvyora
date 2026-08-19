"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Conversation = { conversation_id: string; student_id: string; school_id: string | null; student_code: string; student_name: string; class_name: string; section: string | null; status: string; last_message: string | null; last_message_role: string | null; last_message_at: string; unread_count: number };
type Message = { id: string; sender_role: "student" | "admin"; body: string; created_at: string; read_at: string | null };

export default function AdminMessages({ adminName }: { adminName: string }) {
  const [supabase] = useState(createClient);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function loadInbox() {
    const { data, error: rpcError } = await supabase.rpc("admin_support_inbox");
    if (rpcError) setError(rpcError.message); else setConversations((data ?? []) as Conversation[]);
    setLoading(false);
  }
  async function loadMessages(conversationId: string) {
    const { data, error: rpcError } = await supabase.rpc("admin_support_messages", { p_conversation_id: conversationId });
    if (rpcError) setError(rpcError.message); else setMessages((data ?? []) as Message[]);
    await supabase.rpc("mark_support_messages_read", { p_conversation_id: conversationId });
  }
  useEffect(() => { loadInbox(); const timer = window.setInterval(loadInbox, 5000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (selected) loadMessages(selected.conversation_id); }, [selected?.conversation_id]);

  async function reply(event: FormEvent) {
    event.preventDefault(); if (!selected || !body.trim()) return;
    setSending(true); setError("");
    const { error: sendError } = await supabase.rpc("admin_send_support_message", { p_conversation_id: selected.conversation_id, p_body: body.trim() });
    setSending(false); if (sendError) { setError(sendError.message); return; }
    setBody(""); await loadMessages(selected.conversation_id); await loadInbox();
  }

  const unread = conversations.reduce((sum, c) => sum + Number(c.unread_count || 0), 0);
  return <main className="dashboard">
    <nav className="nav"><div><div className="brand">MINDVYORA</div><span className="pill">ADMIN</span></div><div className="nav-actions"><span className="muted">{adminName}</span><a className="button-secondary button-inline" href="/admin">Students</a></div></nav>
    <section className="admin-heading"><div><p className="eyebrow">STUDENT SUPPORT</p><h1>Messages</h1><p className="muted">{conversations.length} conversation{conversations.length === 1 ? "" : "s"} · {unread} unread from students</p></div></section>
    {error && <p className="error">{error}</p>}
    <section className="message-layout">
      <aside className="tile conversation-list">{loading ? <p className="muted">Loading inbox…</p> : conversations.length === 0 ? <div className="empty-state"><h3>No messages yet</h3><p className="muted">Student questions will appear here.</p></div> : conversations.map((c) => <button key={c.conversation_id} className={`conversation-item ${selected?.conversation_id === c.conversation_id ? "conversation-selected" : ""}`} onClick={() => setSelected(c)}><div className="conversation-top"><strong>{c.student_name}</strong>{c.unread_count > 0 && <span className="pill unread-pill">{c.unread_count}</span>}</div><div className="muted">{c.student_code} · Class {c.class_name}{c.section ? `-${c.section}` : ""}</div><div className="conversation-preview">{c.last_message_role === "admin" ? "You: " : ""}{c.last_message || "New conversation"}</div><small className="muted">{new Date(c.last_message_at).toLocaleString()}</small></button>)}</aside>
      <section className="tile chat-card">{!selected ? <div className="empty-state"><h3>Select a conversation</h3><p className="muted">Choose a student from the inbox to read and reply.</p></div> : <><div className="chat-header"><div><h2>{selected.student_name}</h2><p className="muted">{selected.school_id || selected.student_code} · Class {selected.class_name}{selected.section ? `-${selected.section}` : ""}</p></div></div><div className="chat-window">{messages.map((message) => <div key={message.id} className={`chat-bubble ${message.sender_role === "admin" ? "chat-bubble-student" : "chat-bubble-admin"}`}><div>{message.body}</div><small>{message.sender_role === "admin" ? "You" : selected.student_name} · {new Date(message.created_at).toLocaleString()}</small></div>)}</div><form className="chat-form" onSubmit={reply}><textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} placeholder="Reply to this student…" rows={3} /><button disabled={sending || !body.trim()}>{sending ? "Sending…" : "Send reply"}</button></form></>}</section>
    </section>
  </main>;
}
