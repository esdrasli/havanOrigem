import React from "react";

import { AuthProvider } from "./auth";

const Hooks: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default Hooks;
