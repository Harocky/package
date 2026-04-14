"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<string | null>(null);

  const create = () => {
    if (!input) return alert("Enter value");
    document.cookie = `user=${input}`;
    setData(input);
  };

  const read = () => {
    const v = document.cookie.split("; ").find((r) => r.startsWith("user="))?.split("=")[1];
    setData(v || null);
    setInput(v || "");
  };

  return (
    <div className="space-y-4 max-w-md">
      <h1>Cookies</h1>

      <input className="input" value={input} onChange={(e) => setInput(e.target.value)} />

      <div className="flex gap-2">
        <button className="btn bg-green-500" onClick={create}>Create</button>
        <button className="btn bg-blue-500" onClick={read}>Read</button>
        <button className="btn bg-red-500" onClick={() => confirm("Delete?") && (document.cookie="user=;max-age=0")}>Delete</button>
      </div>

      <pre>{data}</pre>
    </div>
  );
}