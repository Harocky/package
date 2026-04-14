"use client";
import { useState } from "react";

const store = new Map<string, string>();

export default function Page() {
  const [input, setInput] = useState("");
  const [data1, setData1] = useState<string | null>(null);
  const [data2, setData2] = useState<string | null>(null);

  return (
    <div className="space-y-4 max-w-md">
      <h1>Memory Cache</h1>

      <input className="input" value={input} onChange={(e) => setInput(e.target.value)} />

      <div className="flex gap-2">
        <button className="btn bg-green-500" onClick={() => { store.set("k", input); setData1(input); }}>Create</button>
        <button className="btn bg-green-500" onClick={() => { store.set("ki", input); setData2(input); }}>Create</button>
        <button className="btn bg-blue-500" onClick={() => setData1(store.get("k") || null)}>Read</button>
        <button className="btn bg-blue-500" onClick={() => setData2(store.get("ki") || null)}>Read</button>
        <button className="btn bg-red-500" onClick={() => { store.delete("k"); setData1(null); }}>Delete</button>
        <button className="btn bg-red-500" onClick={() => { store.delete("ki"); setData2(null); }}>Delete</button>
      </div>

      <pre>{data1}{data2}</pre>
    </div>
  );
}