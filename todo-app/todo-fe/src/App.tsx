import React from 'react';
import { AuthContextProvider } from "./context/AuthProvider";
import Router from "./Router";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
