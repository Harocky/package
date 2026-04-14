"use client";
import { useState } from "react";

type Data = { name: string };

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!input.trim()) {
      setError("Enter value first");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="space-y-4 max-w-md">
      <h1>React State</h1>

      <input className="input" value={input} onChange={(e) => setInput(e.target.value)} />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2 flex-wrap">
        <button className="btn bg-green-500" disabled={!input} onClick={() => validate() && setData({ name: input })}>Create</button>
        <button className="btn bg-blue-500">Read</button>
        <button className="btn bg-yellow-500" disabled={!data} onClick={() => validate() && setData({ name: input })}>Update</button>
        <button className="btn bg-red-500" disabled={!data} onClick={() => confirm("Delete?") && setData(null)}>Delete</button>
      </div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}