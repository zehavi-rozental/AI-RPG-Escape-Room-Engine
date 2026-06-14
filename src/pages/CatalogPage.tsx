
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CatalogPage() {
  const { role, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <nav className="relative z-10 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <span className="text-amber-400 font-black tracking-widest text-lg" style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}>
          VAULT //
        </span>
        <div className="flex items-center gap-4">
          {role === "Game_Master" && (
            <Link to="/create-game" className="px-4 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-amber-400/20 transition-colors">
              + Forge Room
            </Link>
          )}
          <span className="text-neutral-600 text-xs font-mono hidden sm:block">
            {user} · {role?.replace("_", " ")}
          </span>
          <button onClick={logout} className="text-neutral-500 hover:text-rose-400 text-xs font-mono transition-colors">
            Logout
          </button>
        </div>
      </nav>
      <main className="relative z-10 px-6 py-16 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-black text-white tracking-widest mb-4" style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}>
          ESCAPE ROOM CATALOG
        </h1>
        <p className="text-neutral-500 font-mono text-sm mb-12">
          {role === "Game_Master"
            ? "As Game Master, you may forge new rooms or browse existing ones."
            : "Browse available escape rooms below."}
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {["The Forgotten Asylum", "Sector Ω-9", "The Alchemist's Den"].map((title) => (
            <div key={title} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 text-left hover:border-amber-400/30 transition-colors">
              <div className="text-2xl mb-3">🔐</div>
              <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
              <p className="text-neutral-600 text-xs font-mono">Sample room · 4 players · Hard</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}