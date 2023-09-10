"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiUser,
  HiLockClosed,
  HiMiniInformationCircle,
  HiXMark,
} from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import getFakeEmail from "@/helpers/getFakeEmail";
import AuthInputField from "../(components)/AuthInputField";
import AuthSubmitButton from "../(components)/AuthSubmitButton";
import AuthMessageBox from "../(components)/AuthMessageBox";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

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

      const fakeEmail = getFakeEmail(username);
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

  return (
    <div className="flex h-full items-center justify-center">
      <form
        autoComplete="on"
        onSubmit={handleLogin}
        className="flex flex-col rounded-xl border bg-white p-8 shadow-xl"
      >
        <h1 className="mx-2 mb-12 text-3xl font-bold text-teal-950">
          Iniciar sesión
        </h1>

        <AuthInputField
          Icon={HiUser}
          label="Usuario"
          placeholder="Escriba su nombre de usuario"
          name="username"
          value={username}
          setValue={setUsername}
          autoComplete="username"
          disabled={isLoading}
        />

        <AuthInputField
          Icon={HiLockClosed}
          label="Contraseña"
          placeholder="Escriba su contraseña"
          type="password"
          name="password"
          value={password}
          setValue={setPassword}
          autoComplete="current-password"
          disabled={isLoading}
        />

        <AuthMessageBox
          errorMessage={loginError}
          setErrorMessage={setLoginError}
        />

        <AuthSubmitButton text="Entrar" disabled={isLoading} />
      </form>
    </div>
  );
}

export default Page;
