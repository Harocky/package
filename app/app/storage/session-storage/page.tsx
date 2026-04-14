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

  const create = () => {
    if (!validate()) return;
    const d = { name: input };
    sessionStorage.setItem("user", JSON.stringify(d));
    setData(d);
  };

  const read = () => {
    const d = sessionStorage.getItem("user");
    if (d) {
      const parsed = JSON.parse(d);
      setData(parsed);
      setInput(parsed.name);
    }
  };

  const remove = () => {
    if (!confirm("Delete?")) return;
    sessionStorage.removeItem("user");
    setData(null);
    setInput("");
  };

  return (
    <div className="space-y-4 max-w-md">
      <h1>Local Storage</h1>

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

// // INIT
// const key = "user";

// // CREATE / UPDATE
// sessionStorage.setItem(key, JSON.stringify({ name: input }));

// // READ
// const data = JSON.parse(sessionStorage.getItem(key) || "null");

// // DELETE
// sessionStorage.removeItem(key);