import React from "react";
import { createContext } from "react";

const PageContext = createContext();

function PageProvider({ children }) {
  const [page, setPage] = React.useState("/");

  const bag = {
    page,
    setPage,
  };

  return <PageContext.Provider value={bag}>{children}</PageContext.Provider>;
}

export { PageProvider, PageContext };
