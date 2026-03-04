export default function StatusPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">System Status</h1>
      <p className="mt-3 text-gray-700">
        API health checks and deployment status will appear here soon.
      </p>

      <div className="mt-8 rounded-2xl border p-6">
        <p className="text-gray-700">
          Next step: connect this page to the API <code>/health</code> endpoint.
        </p>
      </div>
    </main>
  );
}