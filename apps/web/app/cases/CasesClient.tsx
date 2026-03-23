"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CaseItem = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string | null;
};

export default function CasesClient({ cases }: { cases: CaseItem[] }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
      }

      const res = await fetch(new URL("/cases", baseUrl).toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error?.fieldErrors?.title?.[0] || "Failed to create case");
      }

      setTitle("");
      setDescription("");
      setStatus("open");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <section className="rounded-2xl border p-6">
        <h2 className="text-2xl font-semibold">Create Case</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter case title"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Status</label>
            <select
              className="rounded-lg border bg-transparent px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">open</option>
              <option value="closed">closed</option>
            </select>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg border px-5 py-2"
          >
            {submitting ? "Creating..." : "Create Case"}
          </button>
        </form>
      </section>

      <section className="grid gap-4">
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
      </section>
    </div>
  );
}