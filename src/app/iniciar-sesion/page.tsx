"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "../../../types/supabase";
import {
  HiUser,
  HiLockClosed,
  HiOutlineEyeSlash,
  HiOutlineEye,
  HiMiniInformationCircle,
  HiXMark,
} from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      if (!username || !password) {
        setLoginError("Introduce el usuario y la contraseña");
        return;
      }

      const fakeEmail = `${username.toLowerCase()}@fake.com`;
      const { error } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password,
      });

      if (error) {
        setLoginError("Usuario o contraseña incorrectos");
        return;
      }

      router.refresh();
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
    passwordInputRef?.current?.focus();
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        autoComplete="on"
        onSubmit={handleLogin}
        className="flex flex-col rounded-xl border bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-12 mx-2">Iniciar sesión</h1>
        <label htmlFor="username" className="mx-2 text-base mb-1">
          Usuario
        </label>
        <div className="flex mb-10 justify-start items-center border-b focus-within:border-teal-800 transition px-2 py-1 group">
          <HiUser className="text-slate-400 translate-y-0.5 group-focus-within:text-teal-800 transition" />
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba su nombre de usuario"
            className="text-base px-2 py-1 placeholder:text-base bg-transparent focus:outline-none group-focus-within:placeholder:opacity-0 transition w-64"
          />
        </div>
        <label htmlFor="password" className="mx-2 text-base mb-1">
          Contraseña
        </label>
        <div className="flex mb-10 justify-start items-center border-b focus-within:border-teal-800 transition px-2 py-1 group">
          <HiLockClosed className="text-slate-400 translate-y-0.5 group-focus-within:text-teal-800 transition" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            ref={passwordInputRef}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba su contraseña"
            className="text-base px-2 py-1 placeholder:text-base bg-transparent focus:outline-none group-focus-within:placeholder:opacity-0 transition"
          />
          {showPassword ? (
            <HiOutlineEyeSlash
              className="ml-auto text-slate-400 text-lg transition hover:text-slate-700 cursor-pointer"
              onClick={handleShowPassword}
              onMouseUp={(e: React.MouseEvent) => e.preventDefault()}
              disabled={isLoading}
            />
          ) : (
            <HiOutlineEye
              className="ml-auto text-slate-400 text-lg transition hover:text-slate-700 cursor-pointer"
              onClick={handleShowPassword}
              onMouseUp={(e: React.MouseEvent) => e.preventDefault()}
              disabled={isLoading}
            />
          )}
        </div>

        <div
          className={twMerge(
            "text-red-700 bg-red-50 px-2 py-2 border-red-400 border rounded text-xs -mt-6 mb-6 flex items-center relative",
            !loginError && "hidden",
          )}
        >
          <HiMiniInformationCircle className="mr-1 text-lg" />
          <span className="font-bold">Info:&nbsp;</span>
          <span>{loginError}</span>
          <button
            type="button"
            onClick={() => setLoginError("")}
            className="text-xl hover:bg-red-200 rounded-full p-1 absolute right-1 transition"
          >
            <HiXMark />
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-800 text-white w-auto m-auto py-2 px-12 rounded-lg text-lg font-semibold shadow-lg transition hover:bg-teal-900 active:shadow-none disabled:bg-slate-400"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
