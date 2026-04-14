"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const getRequest = () => new Request("/key");

  const validate = (): boolean => {
    if (!input.trim()) {
      setError("Please enter a value");
      return false;
    }
    setError("");
    return true;
  };

  const create = async (): Promise<void> => {
    if (!("caches" in window)) {
      alert("Cache API not supported");
      return;
    }

    if (!validate()) return;

    const cache = await caches.open("cache");
    await cache.put(getRequest(), new Response(input));
    setData(input);
  };

  const read = async (): Promise<void> => {
    if (!("caches" in window)) return;

    const cache = await caches.open("cache");
    const res = await cache.match(getRequest());

    if (!res) {
      setData(null);
      return;
    }

    const text = await res.text();
    setData(text);
    setInput(text);
  };

  const update = async (): Promise<void> => {
    await create();
  };

  const remove = async (): Promise<void> => {
    if (!("caches" in window)) return;

    if (!confirm("Are you sure you want to delete?")) return;

    const cache = await caches.open("cache");
    await cache.delete(getRequest());

    setData(null);
    setInput("");
  };

  return (
    <div className="space-y-4 max-w-md">
      <h1 className="text-xl font-semibold">Cache Storage</h1>

      <input
        className="input"
        placeholder="Enter value..."
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2 flex-wrap">
        <button
          className="btn bg-green-500"
          disabled={!input.trim()}
          onClick={create}
        >
          Create
        </button>

        <button className="btn bg-blue-500" onClick={read}>
          Read
        </button>

        <button className="btn bg-yellow-500" disabled={!data} onClick={update}>
          Update
        </button>

        <button className="btn bg-red-500" disabled={!data} onClick={remove}>
          Delete
        </button>
      </div>

      <div className="p-3 bg-gray-50">
        <p className="text-sm text-gray-600">Stored Data:</p>
        <pre className="text-sm">{data}</pre>
      </div>
    </div>
  );
}

// // INIT (open cache)
// const cache = await caches.open("cache");

// // CREATE / UPDATE
// await cache.put(new Request("/key"), new Response(input));

// // READ (for show/edit)
// const res = await cache.match(new Request("/key"));
// const text = res ? await res.text() : null;

// // DELETE
// await cache.delete(new Request("/key"));