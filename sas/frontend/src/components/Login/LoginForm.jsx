import React, { useContext } from "react";
import logo from "/logo.png";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // axios
    // axios.get("url" , {body} ,  {headers / credencials })
    try {
      const res = await axios.post(
        "http://localhost:7070/api/v1/owner/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status === 1) {
        toast.success("login successfully");
        setAuth((prev) => {
          return {
            ...prev,
            accessToken: res?.data?.accessToken,
            user: res?.data?.data?.user,
          };
        });
        localStorage.setItem("persist", true);
        console.log(res, "response");
        switch (res?.data?.data?.user?.role) {
          case "OWNER":
            navigate("/owner/dashboard");
            break;
          case "PRINCIPAL":
            navigate("/principal/dashboard");
            break;
          case "TEACHER":
            navigate("/teacher/dashboard");
            break;
          case "STUDENT":
            navigate("/student/dashboard");
            break;
          default:
            navigate("/auth/login");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="w-full bg-slate-100 h-screen flex">
      <div className=" flex-1">
        <div className="logo">
          <img src={logo} className="w-[200px]" alt="" />
        </div>
        <div className="content pl-4 pt-4 flex flex-col gap-2">
          <h2 className="text-2xl leading-6 font-semibold">
            Welcome to <br /> Schoolify LMS 👋
          </h2>
          <p className="text-sm text-slate-600">
            Kindly fill in your details below to log in.
          </p>
        </div>
        <div className="form">
          <form className="flex flex-col p-6 gap-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="text-sm text-slate-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-slate-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-sm text-slate-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-slate-300 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>
          <div className="p-4">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-blue-500 font-semibold">
                Register
              </Link>
            </p>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-600">
              Verify your account{" "}
              <Link to="/auth/verify" className="text-blue-500 font-semibold">
                Verify
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex-1 p-8">
        <img
          className=" shadow-xl shadow-slate-400 w-full h-full object-cover"
          src="https://img.freepik.com/free-photo/children-drawing-together-classroom_23-2148925456.jpg?uid=R81763851&ga=GA1.1.1431774858.1747201417&semt=ais_hybrid&w=740"
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginForm;
