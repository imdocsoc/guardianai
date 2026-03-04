export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
          <span className="font-semibold">GuardianAI</span>
          <span className="text-gray-600">Security-first case management + AI search</span>
        </div>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight">
          Secure cases. Auditable actions. AI that cites sources.
        </h1>

        <p className="mt-6 text-xl text-gray-700 max-w-2xl">
          A flagship full-stack system demonstrating identity, access control,
          audit logs, cloud-ready storage, and retrieval-augmented generation (RAG).
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a className="rounded-lg bg-black text-white px-5 py-2" href="/docs">
            Architecture
          </a>
          <a className="rounded-lg border px-5 py-2" href="/status">
            System Status
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Card title="RBAC + Auth" desc="Role-based access control designed for real organizations." />
          <Card title="Audit Logging" desc="Every critical action is traceable—who, what, when, where." />
          <Card title="AI Search (RAG)" desc="Ask questions over documents with retrieval + citations." />
        </div>
      </section>
    </main>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}