//updated the code to allow vercel from erroring on delpoyment because production is not complete 
import CasesClient from "./CasesClient";

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
    return [];
  }

  try {
    const res = await fetch(new URL("/cases", baseUrl).toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.cases ?? [];
  } catch {
    return [];
  }
}

export default async function CasesPage() {
  const cases = await getCases();
  const hasApi = Boolean(process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold">Cases</h1>
      <p className="mt-3 text-gray-700">
        Live cases pulled from the GuardianAI API.
      </p>

      {!hasApi ? (
        <div className="mt-6 rounded-2xl border p-6">
          <p className="text-gray-700">
            API integration is configured for local development. A deployed API
            endpoint has not been connected yet.
          </p>
        </div>
      ) : null}

      <CasesClient cases={cases} />
    </main>
  );
}