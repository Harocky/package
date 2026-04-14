"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Data = { name: string };

type ContextType = {
  data: Data | null;
  setData: (data: Data | null) => void;
};

// ✅ No more `any`
const Ctx = createContext<ContextType | undefined>(undefined);

function useCtx(): ContextType {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error("useCtx must be used within Provider");
  }
  return context;
}

function Child() {
  const { data, setData } = useCtx();
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validate = (): boolean => {
    if (!input.trim()) {
      setError("Enter value");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <>
      <input
        className="input"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2 flex-wrap">
        <button
          className="btn bg-green-500"
          disabled={!input}
          onClick={() => validate() && setData({ name: input })}
        >
          Create
        </button>

        <button
          className="btn bg-yellow-500"
          disabled={!data}
          onClick={() => validate() && setData({ name: input })}
        >
          Update
        </button>

        <button
          className="btn bg-red-500"
          disabled={!data}
          onClick={() => confirm("Delete?") && setData(null)}
        >
          Delete
        </button>
      </div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default function Page() {
  const [data, setData] = useState<Data | null>(null);

  return (
    <div className="space-y-4 max-w-md">
      <h1>React Context</h1>

      <Ctx.Provider value={{ data, setData }}>
        <Child />
      </Ctx.Provider>
    </div>
  );
}
