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
        const { error: pointsError } = await supabase
          .from("points_transactions")
          .insert({
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
        <h1 className="mx-2 mb-12 text-3xl font-bold">Registrar un usuario</h1>

        <label htmlFor="username" className="mx-2 mb-1 text-base">
          Usuario
        </label>
        <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
          <HiUser className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba el nombre de usuario"
            className="w-64 bg-transparent px-2 py-1 text-base transition placeholder:text-base focus:outline-none group-focus-within:placeholder:opacity-0"
          />
        </div>

        <label htmlFor="fullName" className="mx-2 mb-1 text-base">
          Nombre
        </label>
        <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
          <HiUsers className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
          <input
            type="text"
            name="fullName"
            id="fullName"
            autoComplete="off"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba el nombre y apellido"
            className="w-64 bg-transparent px-2 py-1 text-base transition placeholder:text-base focus:outline-none group-focus-within:placeholder:opacity-0"
          />
        </div>

        <label htmlFor="role" className="mx-2 mb-1 text-base">
          Rol
        </label>
        <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
          <HiBuildingOffice className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
          <select
            name="role"
            id="role"
            autoComplete="off"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isLoading}
            className={twMerge(
              "w-72 rounded-md bg-transparent px-2 py-1 pl-1 text-base transition placeholder:text-base focus:outline-none",
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
            <label htmlFor="school" className="mx-2 mb-1 text-base">
              Colegio
            </label>
            <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
              <HiAcademicCap className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
              <input
                type="text"
                name="school"
                id="school"
                autoComplete="off"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                disabled={isLoading}
                placeholder="Escriba el colegio"
                className="w-64 bg-transparent px-2 py-1 text-base transition placeholder:text-base focus:outline-none group-focus-within:placeholder:opacity-0"
              />
            </div>
          </>
        )}

        {/* TODO: School | New table with schools*/}

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
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Escriba la contraseña"
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
            className="absolute right-1 rounded-full p-1 text-xl transition hover:bg-red-200"
          >
            <HiXMark />
          </button>
        </div>

        <div
          className={twMerge(
            "relative -mt-6 mb-6 flex items-center rounded border border-teal-400 bg-teal-50 px-2 py-2 text-xs text-teal-700",
            !registerSuccess && "hidden",
          )}
        >
          <HiMiniInformationCircle className="mr-1 text-lg" />
          <span className="font-bold">Info:&nbsp;</span>
          <span>{registerSuccess}</span>
          <button
            type="button"
            onClick={() => setRegisterSuccess("")}
            className="absolute right-1 rounded-full p-1 text-xl transition hover:bg-teal-200"
          >
            <HiXMark />
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="m-auto w-auto rounded-lg bg-teal-800 px-10 py-2 text-lg font-semibold text-white shadow-lg transition hover:bg-teal-900 active:shadow-none disabled:bg-slate-400"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Register;
