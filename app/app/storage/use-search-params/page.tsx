"use client";

import { useRouter, useSearchParams } from "next/navigation";

function SearchComponent() {
  const router = useRouter();
  const params = useSearchParams();

  const filter = params.get("filter") ?? "";

  const update = (value: string): void => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("filter", value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="space-y-4">
      <h1>URL Params</h1>

      <p>Current: {filter}</p>

      <button onClick={() => update("active")}>Active</button>
      <button onClick={() => update("done")}>Done</button>
    </div>
  );
}

export default SearchComponent;