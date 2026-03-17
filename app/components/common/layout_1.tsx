import React from "react";

const Layout_1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
};

export default Layout_1;
