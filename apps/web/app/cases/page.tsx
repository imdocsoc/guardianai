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

      <CasesClient cases={cases} />
    </main>
  );
}