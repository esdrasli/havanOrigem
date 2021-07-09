import React, { createContext, useCallback, useContext, useState } from "react";
import { decode } from "jsonwebtoken";
import api from "../services/api";

type User = {
  nome: string;
  codigo: string;
  id: string;
  avatar?: string;
  role: string;
};

type AuthContextData = {
  signOut(): void;
  user: User;
  signIn(token: string): void;
};

type AuthState = {
  token: string;
  user: User;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@HavanLabs:token");
    const user = localStorage.getItem("@HavanLabs:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback((token: string) => {
    const { nom, sub, id, role } = decode(token) as { nom: string; sub: string; id: string; role: string };
    const user = {
      nome: nom,
      codigo: sub,
      id: id,
      role: role
    };
    if (user.role === "TI-III") {
      localStorage.setItem("@HavanLabs:token", token);
      localStorage.setItem("@HavanLabs:user", JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

     setData({ token, user });

    }

    
  }, []);

  

  const signOut = useCallback(() => {
    localStorage.removeItem("@HavanLabs:token");

    setData({} as AuthState);
  }, []);
  
  

  return (
    <AuthContext.Provider value={{ signOut, user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
