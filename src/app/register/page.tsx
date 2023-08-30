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
  HiUsers,
  HiBuildingOffice,
} from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

function Register() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError("");

    const role = (await supabase.auth.getSession()).data.session?.user
      .user_metadata.role;

    if (role !== "admin") {
      setRegisterError('Esta cuenta no tiene el rol "admin"');
      return;
    }

    try {
      if (!username || !password || !fullName || !role) {
        setRegisterError("Introduce todas las credenciales");
        return;
      }

      const fakeEmail = `${username.toLowerCase()}@fake.com`;

      const { data: newUserData, error: newUserError } =
        await supabase.auth.signUp({
          email: fakeEmail,
          password,
          options: {
            data: { role },
          },
        });

      if (newUserError || !newUserData.user) {
        setRegisterError("Error creando el usuario");
        return;
      }

      const { data, error: newProfileError } = await supabase
        .from("profiles")
        .insert({
          user_id: newUserData.user.id,
          username,
          full_name: fullName,
          role,
        });

      if (newProfileError) {
        setRegisterError("Error creando el perfil");
        return;
      }

      if (role === "student") {
        const { error: pointsError } = await supabase.from("points").insert({
          user_id: newUserData.user.id,
        });

        if (pointsError) {
          setRegisterError("Error creando los puntos");
          return;
        }
      }

      setRegisterSuccess("Usuario registrado correctamente!");

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
        <h1 className="text-3xl font-bold mb-12 mx-2">Registrar un usuario</h1>

        <label htmlFor="username" className="mx-2 text-base mb-1">
          Usuario
        </label>
        <div className="flex mb-10 justify-start items-center border-b focus-within:border-teal-800 transition px-2 py-1 group">
          <HiUser className="text-slate-400 translate-y-0.5 group-focus-within:text-teal-800 transition" />
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba el nombre de usuario"
            className="text-base px-2 py-1 placeholder:text-base bg-transparent focus:outline-none group-focus-within:placeholder:opacity-0 transition w-64"
          />
        </div>

        <label htmlFor="fullName" className="mx-2 text-base mb-1">
          Nombre
        </label>
        <div className="flex mb-10 justify-start items-center border-b focus-within:border-teal-800 transition px-2 py-1 group">
          <HiUsers className="text-slate-400 translate-y-0.5 group-focus-within:text-teal-800 transition" />
          <input
            type="text"
            name="fullName"
            id="fullName"
            autoComplete="off"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba el nombre y apellido"
            className="text-base px-2 py-1 placeholder:text-base bg-transparent focus:outline-none group-focus-within:placeholder:opacity-0 transition w-64"
          />
        </div>

        <label htmlFor="role" className="mx-2 text-base mb-1">
          Rol
        </label>
        <div className="flex mb-10 justify-start items-center border-b focus-within:border-teal-800 transition px-2 py-1 group">
          <HiBuildingOffice className="text-slate-400 translate-y-0.5 group-focus-within:text-teal-800 transition" />
          <select
            name="role"
            id="role"
            autoComplete="off"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isLoading}
            className={twMerge(
              "text-base px-2 py-1 placeholder:text-base bg-transparent focus:outline-none transition w-72 pl-1 rounded-md",
              !role && "text-gray-400",
            )}
          >
            <option value="" className="text-gray-400">
              Seleccione un rol
            </option>
            <option value="student" className="text-black">
              Estudiante
            </option>
            <option value="teacher" className="text-black">
              Profesor
            </option>
            <option value="admin" className="text-black">
              Admin
            </option>
          </select>
        </div>

        {role !== "admin" && (
          // TODO: School icon
          <>
            <label htmlFor="school" className="mx-2 text-base mb-1">
              Colegio
            </label>
            <div className="flex mb-10 justify-start items-center border-b focus-within:border-teal-800 transition px-2 py-1 group">
              <HiUser className="text-slate-400 translate-y-0.5 group-focus-within:text-teal-800 transition" />
              <input
                type="text"
                name="school"
                id="school"
                autoComplete="off"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                disabled={isLoading}
                placeholder="Escriba el colegio"
                className="text-base px-2 py-1 placeholder:text-base bg-transparent focus:outline-none group-focus-within:placeholder:opacity-0 transition w-64"
              />
            </div>
          </>
        )}

        {/* TODO: School | New table with schools*/}

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
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba la contraseña"
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
            !registerError && "hidden",
          )}
        >
          <HiMiniInformationCircle className="mr-1 text-lg" />
          <span className="font-bold">Info:&nbsp;</span>
          <span>{registerError}</span>
          <button
            type="button"
            onClick={() => {
              setRegisterError("");
              setRegisterSuccess("");
            }}
            className="text-xl hover:bg-red-200 rounded-full p-1 absolute right-1 transition"
          >
            <HiXMark />
          </button>
        </div>

        <div
          className={twMerge(
            "text-teal-700 bg-teal-50 px-2 py-2 border-teal-400 border rounded text-xs -mt-6 mb-6 flex items-center relative",
            !registerSuccess && "hidden",
          )}
        >
          <HiMiniInformationCircle className="mr-1 text-lg" />
          <span className="font-bold">Info:&nbsp;</span>
          <span>{registerSuccess}</span>
          <button
            type="button"
            onClick={() => setRegisterSuccess("")}
            className="text-xl hover:bg-teal-200 rounded-full p-1 absolute right-1 transition"
          >
            <HiXMark />
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-800 text-white w-auto m-auto py-2 px-10 rounded-lg text-lg font-semibold shadow-lg transition hover:bg-teal-900 active:shadow-none disabled:bg-slate-400"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Register;
