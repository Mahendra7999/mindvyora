import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <><div className="admin-layout-shell">{children}<Link href="/admin/ideas" className="admin-ideas-float">💡 <span>Student Ideas</span></Link></div><style>{`
.admin-layout-shell{min-height:100vh}
.admin-ideas-float{position:fixed;right:22px;bottom:22px;z-index:70;display:flex;align-items:center;gap:8px;padding:11px 14px;border:1px solid #59436f;border-radius:999px;background:rgba(13,10,18,.9);backdrop-filter:blur(12px);color:#eee;font-size:10px;font-weight:800;box-shadow:0 12px 35px rgba(0,0,0,.35);transition:.25s}
.admin-ideas-float:hover{transform:translateY(-3px);border-color:#a78bfa;box-shadow:0 0 28px rgba(124,58,237,.2)}
@media(max-width:600px){.admin-ideas-float{right:12px;bottom:12px;width:44px;height:44px;justify-content:center;padding:0}.admin-ideas-float span{display:none}}
`}</style></>;
}
