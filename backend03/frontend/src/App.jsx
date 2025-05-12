import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user/delete", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Login />
    </>
  );
}

export default App;
