import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext(null);

//provider

function AuthProvider({ children }) {
  const persistValue = JSON.parse(localStorage.getItem("persist")) || "true";

  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState();

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
