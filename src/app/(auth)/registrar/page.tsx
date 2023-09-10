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
  HiUsers,
  HiBuildingOffice,
  HiAcademicCap,
} from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const role = (await supabase.auth.getSession()).data.session?.user
      .user_metadata.role;

    if (role !== "admin") {
      setErrorMessage('Esta cuenta no tiene el rol "admin"');
      return;
    }

    try {
      if (!username || !password || !fullName || !role) {
        setErrorMessage("Introduce todas las credenciales");
        return;
      }

      const fakeEmail = getFakeEmail(username);

      const { data: newUserData, error: newUserError } =
        await supabase.auth.signUp({
          email: fakeEmail,
          password,
          options: {
            data: { role },
          },
        });

      if (newUserError || !newUserData.user) {
        setErrorMessage("Error creando el usuario");
        return;
      }

      const { error: newProfileError } = await supabase
        .from("profiles")
        .insert({
          user_id: newUserData.user.id,
          username,
          full_name: fullName,
          role,
          school,
        });

      if (newProfileError) {
        setErrorMessage("Error creando el perfil");
        return;
      }

      if (role === "student") {
        const { error: avatarsError } = await supabase
          .from("avatars_transactions")
          .insert({
            user_id: newUserData.user.id,
            avatar_path: "Default-Avatar.png",
          });

        if (avatarsError) {
          setErrorMessage("Error insertando el avatar");
          return;
        }
      }

      setSuccessMessage("Usuario registrado correctamente!");

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
          autoComplete="off"
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
