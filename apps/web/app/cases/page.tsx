type CaseItem = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string | null;
};

async function getCases(): Promise<CaseItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  const res = await fetch(new URL("/cases", baseUrl).toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cases");
  }

  const data = await res.json();
  return data.cases ?? [];
}

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold">Cases</h1>
      <p className="mt-3 text-gray-700">
        Live cases pulled from the GuardianAI API.
      </p>

      <div className="mt-8 grid gap-4">
        {cases.length === 0 ? (
          <div className="rounded-2xl border p-6">
            <p className="text-gray-600">No cases found.</p>
          </div>
        ) : (
          cases.map((item) => (
            <div key={item.id} className="rounded-2xl border p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <span className="text-sm rounded-full border px-3 py-1">
                  {item.status}
                </span>
              </div>

              <p className="mt-3 text-gray-700">
                {item.description ?? "No description provided."}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                <p>ID: {item.id}</p>
                <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}