"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiUser,
  HiLockClosed,
  HiUsers,
  HiBuildingOffice,
  HiAcademicCap,
} from "react-icons/hi2";
import getFakeEmail from "@/helpers/getFakeEmail";
import AuthInputField from "../(components)/AuthInputField";
import AuthMessageBox from "../(components)/AuthMessageBox";
import AuthSubmitButton from "../(components)/AuthSubmitButton";

function Page() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    const registerDataResponse = await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        fullName,
        newUserRole: role,
        school,
      }),
    });

    const registerData = await registerDataResponse.json();

    if (registerDataResponse.status === 400) {
      setErrorMessage(registerData.message);
    } else if (registerDataResponse.status === 200) {
      setSuccessMessage(registerData.message);
    }

    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        autoComplete="off"
        onSubmit={handleRegister}
        className="flex flex-col rounded-xl border bg-white p-8 shadow-xl"
      >
        <h1 className="mx-2 mb-12 text-3xl font-bold text-teal-950">
          Registrar un usuario
        </h1>

        <AuthInputField
          label="Usuario"
          name="username"
          disabled={isLoading}
          Icon={HiUser}
          placeholder="Escriba el nombre de usuario"
          type="text"
          value={username}
          setValue={setUsername}
        />

        <AuthInputField
          label="Nombre"
          name="fullName"
          disabled={isLoading}
          Icon={HiUsers}
          placeholder="Escriba el nombre y apellido"
          type="text"
          value={fullName}
          setValue={setFullName}
        />

        <AuthInputField
          Icon={HiBuildingOffice}
          disabled={isLoading}
          label="Rol"
          name="role"
          type="select"
          placeholder="Seleccione un rol"
          setValue={setRole}
          value={role}
          options={[
            { value: "", text: "Seleccione un rol" },
            { value: "student", text: "Estudiante" },
            { value: "teacher", text: "Profesor" },
            { value: "admin", text: "Admin" },
          ]}
        />

        <AuthInputField
          disabled={isLoading || role === "admin"}
          Icon={HiAcademicCap}
          label="Colegio"
          name="school"
          type="text"
          placeholder={role === "admin" ? "No aplica" : "Escriba el colegio"}
          value={school}
          setValue={setSchool}
        />

        <AuthInputField
          Icon={HiLockClosed}
          disabled={isLoading}
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Escriba la contraseña"
          value={password}
          setValue={setPassword}
        />

        <AuthMessageBox
          errorMessage={errorMessage}
          successMessage={successMessage}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />

        <AuthSubmitButton disabled={isLoading} text="Registrar" />
      </form>
    </div>
  );
}

export default Page;
