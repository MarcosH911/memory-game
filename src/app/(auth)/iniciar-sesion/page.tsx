"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
        <h1 className="mx-2 mb-12 text-3xl font-bold">Iniciar sesión</h1>
        <label htmlFor="username" className="mx-2 mb-1 text-base">
          Usuario
        </label>
        <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
          <HiUser className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba su nombre de usuario"
            className="w-64 bg-transparent px-2 py-1 text-base transition placeholder:text-base focus:outline-none group-focus-within:placeholder:opacity-0"
          />
        </div>
        <label htmlFor="password" className="mx-2 mb-1 text-base">
          Contraseña
        </label>
        <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
          <HiLockClosed className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
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
            className="bg-transparent px-2 py-1 text-base transition placeholder:text-base focus:outline-none group-focus-within:placeholder:opacity-0"
          />
          {showPassword ? (
            <HiOutlineEyeSlash
              className="ml-auto cursor-pointer text-lg text-slate-400 transition hover:text-slate-700"
              onClick={handleShowPassword}
              onMouseUp={(e: React.MouseEvent) => e.preventDefault()}
              disabled={isLoading}
            />
          ) : (
            <HiOutlineEye
              className="ml-auto cursor-pointer text-lg text-slate-400 transition hover:text-slate-700"
              onClick={handleShowPassword}
              onMouseUp={(e: React.MouseEvent) => e.preventDefault()}
              disabled={isLoading}
            />
          )}
        </div>

        <div
          className={twMerge(
            "relative -mt-6 mb-6 flex items-center rounded border border-red-400 bg-red-50 px-2 py-2 text-xs text-red-700",
            !loginError && "hidden",
          )}
        >
          <HiMiniInformationCircle className="mr-1 text-lg" />
          <span className="font-bold">Info:&nbsp;</span>
          <span>{loginError}</span>
          <button
            type="button"
            onClick={() => setLoginError("")}
            className="absolute right-1 rounded-full p-1 text-xl transition hover:bg-red-200"
          >
            <HiXMark />
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="m-auto w-auto rounded-lg bg-teal-800 px-12 py-2 text-lg font-semibold text-white shadow-lg transition hover:bg-teal-900 active:shadow-none disabled:bg-slate-400"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
