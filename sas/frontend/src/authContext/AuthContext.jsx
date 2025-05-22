import { createContext } from "react";

const AuthContext = createContext(null);

//provider

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // handle login

  function handleLogin(email, password) {
    setLoading(true);
    fetch("http://localhost:7070/api/v1/owner/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message || "Something went wrong");
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      })
      .then((data) => {});
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export default { AuthContext, AuthProvider };
