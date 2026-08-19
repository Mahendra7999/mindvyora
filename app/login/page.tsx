"use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Login(){
  const supabase=createClient(); const router=useRouter();
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError("");
    const {error}=await supabase.auth.signInWithPassword({email,password});
    if(error){setError(error.message);setLoading(false);return;}
    router.push("/student");
    router.refresh();
  }
  return <main className="shell"><section className="card"><div className="brand">MINDVYORA</div><p className="muted">Sign in to continue</p><form className="form" onSubmit={submit}><input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><button disabled={loading}>{loading?"Signing in…":"Sign in"}</button></form>{error&&<p className="error">{error}</p>}</section></main>}