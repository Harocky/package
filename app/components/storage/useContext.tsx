"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = { name: string };

type ContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AppContext = createContext<ContextType | undefined>(undefined);

function Provider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

function Child() {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");

  return (
    <div>
      <button onClick={() => context.setUser({ name: "Harish" })}>
        Set User
      </button>
      <p>{context.user?.name}</p>
    </div>
  );
}

