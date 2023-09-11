"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiUser, HiLockClosed } from "react-icons/hi2";

import AuthInputField from "../(components)/AuthInputField";
import AuthSubmitButton from "../(components)/AuthSubmitButton";
import AuthMessageBox from "../(components)/AuthMessageBox";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoginError("");
    setIsLoading(true);

    const loginDataResponse = await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
    });

    if (loginDataResponse.status === 400) {
      const { message } = await loginDataResponse.json();
      setLoginError(message);
    }

    setIsLoading(false);
    router.refresh();
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
