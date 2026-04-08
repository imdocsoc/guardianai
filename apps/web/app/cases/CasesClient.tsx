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

type EditState = {
  title: string;
  description: string;
  status: string;
};

export default function CasesClient({ cases }: { cases: CaseItem[] }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<EditState>({
    title: "",
    description: "",
    status: "open",
  });
  const [actionError, setActionError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function getBaseUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL is not configured for this environment.");
    }
    return baseUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(new URL("/cases", getBaseUrl()).toString(), {
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
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error?.fieldErrors?.title?.[0] ||
            data?.message ||
            "Failed to create case"
        );
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

  function startEdit(item: CaseItem) {
    setActionError("");
    setEditingId(item.id);
    setEditValues({
      title: item.title,
      description: item.description ?? "",
      status: item.status,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValues({
      title: "",
      description: "",
      status: "open",
    });
    setActionError("");
  }

  async function handleSave(id: string) {
    setSavingId(id);
    setActionError("");

    try {
      const res = await fetch(new URL(`/cases/${id}`, getBaseUrl()).toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editValues.title,
          description: editValues.description,
          status: editValues.status,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to update case");
      }

      setEditingId(null);
      router.refresh();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this case?");
    if (!confirmed) return;

    setDeletingId(id);
    setActionError("");

    try {
      const res = await fetch(new URL(`/cases/${id}`, getBaseUrl()).toString(), {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to delete case");
      }

      if (editingId === id) {
        cancelEdit();
      }

      router.refresh();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <section className="rounded-2xl border p-6">
        <h2 className="text-2xl font-semibold">Create Case</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm">Title</label>
            <input
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter case title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Description</label>
            <textarea
              className="w-full rounded-lg border bg-transparent px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Status</label>
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

      {actionError ? (
        <p className="text-sm text-red-400">{actionError}</p>
      ) : null}

      <section className="grid gap-4">
        {cases.length === 0 ? (
          <div className="rounded-2xl border p-6">
            <p className="text-gray-600">No cases found.</p>
          </div>
        ) : (
          cases.map((item) => {
            const isEditing = editingId === item.id;
            const isSaving = savingId === item.id;
            const isDeleting = deletingId === item.id;

            return (
              <div key={item.id} className="rounded-2xl border p-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm">Title</label>
                      <input
                        className="w-full rounded-lg border bg-transparent px-3 py-2"
                        value={editValues.title}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm">Description</label>
                      <textarea
                        className="w-full rounded-lg border bg-transparent px-3 py-2"
                        rows={4}
                        value={editValues.description}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm">Status</label>
                      <select
                        className="rounded-lg border bg-transparent px-3 py-2"
                        value={editValues.status}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >
                        <option value="open">open</option>
                        <option value="closed">closed</option>
                      </select>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleSave(item.id)}
                        disabled={isSaving}
                        className="rounded-lg border px-4 py-2"
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={cancelEdit}
                        disabled={isSaving}
                        className="rounded-lg border px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <span className="rounded-full border px-3 py-1 text-sm">
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-3 text-gray-700">
                      {item.description ?? "No description provided."}
                    </p>

                    <div className="mt-4 text-sm text-gray-500">
                      <p>ID: {item.id}</p>
                      <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
                      <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        disabled={isDeleting}
                        className="rounded-lg border px-4 py-2"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                        className="rounded-lg border px-4 py-2"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}