"use client";

import { useEffect, useState } from "react";
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
    } else if (loginDataResponse.status === 200) {
      router.push("/jugar");
      router.refresh();
      return;
    }

    setIsLoading(false);
    router.refresh();
  };

  useEffect(() => {
    router.prefetch("/jugar?prefetch=true");
  }, [router]);

  return (
    <div className="flex min-h-full items-center justify-center bg-white py-8 md:bg-transparent md:py-0">
      <div className="-mt-16 flex h-full w-full items-center justify-center bg-white p-8 md:mt-0 md:h-fit md:w-fit md:rounded-xl md:border md:shadow-xl">
        <form
          autoComplete="on"
          onSubmit={handleLogin}
          className="flex w-full max-w-sm flex-col align-middle"
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
    </div>
  );
}

export default Page;
