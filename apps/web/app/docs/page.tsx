export default function DocsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">Architecture</h1>
      <p className="mt-3 text-gray-700 max-w-2xl">
        GuardianAI is a security-first case management system with an AI-assisted
        document search layer (RAG). This page summarizes the architecture.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Components</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
            <li>Web: Next.js (apps/web)</li>
            <li>API: Fastify (apps/api)</li>
            <li>DB: PostgreSQL (next)</li>
            <li>Storage: S3 (later)</li>
            <li>AI: OpenAI + embeddings + retrieval (later)</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">Security posture</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
            <li>RBAC: admin/user</li>
            <li>Audit logging for critical actions</li>
            <li>Secrets kept in env vars, never committed</li>
            <li>Least-privilege cloud permissions</li>
          </ul>
        </div>
      </div>
    </main>
  );
}