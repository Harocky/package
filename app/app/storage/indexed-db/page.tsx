"use client";
import { useState } from "react";

type Data = { name: string };

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!input.trim()) return setError("Enter value"), false;
    setError(""); return true;
  };

  const openDB = () =>
    new Promise<IDBDatabase>((res, rej) => {
      const r = indexedDB.open("DB", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("store");
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });

  const create = async () => {
    if (!validate()) return;
    const db = await openDB();
    const d = { name: input };
    db.transaction("store", "readwrite").objectStore("store").put(d, "user");
    setData(d);
  };

  const read = async () => {
    const db = await openDB();
    const r = await new Promise<Data>((res) => {
      const req = db.transaction("store").objectStore("store").get("user");
      req.onsuccess = () => res(req.result);
    });
    setData(r);
    setInput(r?.name || "");
  };

  const remove = async () => {
    if (!confirm("Delete?")) return;
    const db = await openDB();
    db.transaction("store", "readwrite").objectStore("store").delete("user");
    setData(null);
    setInput("");
  };

  return (
    <div className="space-y-4 max-w-md">
      <h1>IndexedDB</h1>

      <input className="input" value={input} onChange={(e) => setInput(e.target.value)} />
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2">
        <button className="btn bg-green-500" disabled={!input} onClick={create}>Create</button>
        <button className="btn bg-blue-500" onClick={read}>Read</button>
        <button className="btn bg-yellow-500" disabled={!data} onClick={create}>Update</button>
        <button className="btn bg-red-500" disabled={!data} onClick={remove}>Delete</button>
      </div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// // INIT (open DB + store)
// const db = await new Promise<IDBDatabase>((res, rej) => {
//   const r = indexedDB.open("DB", 1);
//   r.onupgradeneeded = () => r.result.createObjectStore("store");
//   r.onsuccess = () => res(r.result);
//   r.onerror = () => rej(r.error);
// });

// // CREATE / UPDATE
// db.transaction("store", "readwrite").objectStore("store").put({ name: input }, "user");

// // READ
// const data = await new Promise((res) => {
//   const req = db.transaction("store").objectStore("store").get("user");
//   req.onsuccess = () => res(req.result);
// });

// // DELETE
// db.transaction("store", "readwrite").objectStore("store").delete("user");