import React from "react";

import RoutesComponent from "./routes";
import { AuthProvider } from "./context/auth";
import { PageProvider } from "./context/page";
import { BasketProvider } from "./context/basket";

function App() {
  return (
    <PageProvider>
      <BasketProvider>
        <AuthProvider>
          <RoutesComponent />
        </AuthProvider>
      </BasketProvider>
    </PageProvider>
  );
}

export default App;
