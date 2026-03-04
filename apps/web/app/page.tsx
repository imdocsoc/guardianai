export default function DocsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">Architecture</h1>
      <p className="mt-3 text-gray-700">
        This project demonstrates a security-first architecture: identity, access control,
        audit logging, and AI retrieval with citations.
      </p>

      <ul className="mt-6 list-disc pl-5 text-gray-700 space-y-2">
        <li>Web: Next.js (apps/web)</li>
        <li>API: Fastify (apps/api)</li>
        <li>DB: PostgreSQL (next step)</li>
        <li>Docs: /docs + repo docs folder</li>
      </ul>
    </main>
  );
}