"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiUser,
  HiLockClosed,
  HiUsers,
  HiBuildingOffice,
  HiAcademicCap,
} from "react-icons/hi2";

import AuthInputField from "../(components)/AuthInputField";
import AuthMessageBox from "../(components)/AuthMessageBox";
import AuthSubmitButton from "../(components)/AuthSubmitButton";
import useSWR from "swr";

const gradesList = [
  { value: "", text: "Seleccione un curso" },
  { value: "primero", text: "Primero" },
  { value: "segundo", text: "Segundo" },
  { value: "tercero", text: "Tercero" },
  { value: "cuarto", text: "Cuarto" },
  { value: "quinto", text: "Quinto" },
  { value: "sexto", text: "Sexto" },
];

function Page() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [school, setSchool] = useState("");
  const [stage, setStage] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: schoolsData } = useSWR("/api/schools");
  const schoolsList =
    schoolsData?.data.map(
      (school: { school_name: string; school_value: string }) => ({
        text: school.school_name,
        value: school.school_value,
      }),
    ) || [];

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const registerDataResponse = await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        fullName,
        role,
        school,
        stage,
        grade,
        schoolClass,
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

  const handleSelectRole = (value: string) => {
    setRole(value);
    if (value === "admin") {
      setSchool("");
      setStage("");
      setGrade("");
      setSchoolClass("");
    } else if (value === "teacher") {
      setStage("");
      setGrade("");
      setSchoolClass("");
    }
  };

  const getGrades = () => {
    if (stage === "bachillerato") {
      return gradesList.slice(0, 3);
    } else if (stage === "secundaria") {
      return gradesList.slice(0, 5);
    } else {
      return gradesList;
    }
  };

  return (
    <div className="flex h-fit min-h-full items-center justify-center bg-white py-8 md:h-full md:bg-transparent">
      <div className="flex h-full w-full items-center justify-center bg-white p-8 md:h-fit md:w-fit md:rounded-xl md:border md:shadow-xl">
        <form
          autoComplete="off"
          onSubmit={handleRegister}
          className="flex w-full max-w-sm flex-col md:max-w-2xl"
        >
          <h1 className="mx-2 mb-12 text-left text-3xl font-bold text-teal-950 md:text-center">
            Registrar a un usuario
          </h1>

          <div className="grid md:grid-cols-2 md:gap-x-20">
            <div>
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
                setValue={handleSelectRole}
                value={role}
                options={[
                  { value: "", text: "Seleccione un rol" },
                  { value: "student", text: "Estudiante" },
                  { value: "teacher", text: "Profesor" },
                  { value: "admin", text: "Admin" },
                ]}
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
            </div>
            <div>
              <AuthInputField
                disabled={isLoading || role === "admin"}
                Icon={HiAcademicCap}
                label="Colegio"
                name="school"
                type="select"
                placeholder="Seleccione un colegio"
                value={school}
                setValue={setSchool}
                options={[
                  { value: "", text: "Seleccione un colegio" },
                  ...schoolsList,
                ]}
              />

              <AuthInputField
                disabled={isLoading || role === "admin" || role === "teacher"}
                Icon={HiAcademicCap}
                label="Etapa"
                name="stage"
                type="select"
                placeholder="Seleccione una etapa"
                value={stage}
                setValue={setStage}
                options={[
                  { value: "", text: "Seleccione una etapa" },
                  { value: "infantil", text: "Infantil" },
                  { value: "primaria", text: "Primaria" },
                  { value: "secundaria", text: "Secundaria" },
                  { value: "bachillerato", text: "Bachillerato" },
                ]}
              />

              <AuthInputField
                disabled={isLoading || role === "admin" || role === "teacher"}
                Icon={HiAcademicCap}
                label="Curso"
                name="grade"
                type="select"
                placeholder="Seleccione un curso"
                value={grade}
                setValue={setGrade}
                options={getGrades()}
              />

              <AuthInputField
                disabled={isLoading || role === "admin" || role === "teacher"}
                Icon={HiAcademicCap}
                label="Clase"
                name="class"
                type="select"
                placeholder="Seleccione una clase"
                value={schoolClass}
                setValue={setSchoolClass}
                options={[
                  { value: "", text: "Seleccione una clase" },
                  { value: "a", text: "A" },
                  { value: "b", text: "B" },
                  { value: "c", text: "C" },
                  { value: "d", text: "D" },
                  { value: "e", text: "E" },
                  { value: "f", text: "F" },
                ]}
              />
            </div>
          </div>

          <AuthMessageBox
            errorMessage={errorMessage}
            successMessage={successMessage}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />

          <AuthSubmitButton disabled={isLoading} text="Registrar" />
        </form>
      </div>
    </div>
  );
}

export default Page;
