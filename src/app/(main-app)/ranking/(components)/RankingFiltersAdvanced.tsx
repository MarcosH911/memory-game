"use client";

import { useEffect, useRef, useState } from "react";
import { HiAdjustmentsHorizontal, HiMiniXMark } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";

import RankingFiltersAdvancedInput from "./RankingFiltersAdvancedInput";
import useSetSearchParams from "@/helpers/setSearchParams";
import setSearchParams from "@/helpers/setSearchParams";

const gradesList = [
  { value: "primero", text: "Primero" },
  { value: "segundo", text: "Segundo" },
  { value: "tercero", text: "Tercero" },
  { value: "cuarto", text: "Cuarto" },
  { value: "quinto", text: "Quinto" },
  { value: "sexto", text: "Sexto" },
];

function RankingFiltersAdvanced() {
  const [school, setSchool] = useState("");
  const [stage, setStage] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [schoolsList, setSchoolsList] = useState<
    { text: string; value: string }[]
  >([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getGrades = () => {
    if (stage === "bachillerato") {
      return gradesList.slice(0, 3);
    } else if (stage === "secundaria") {
      return gradesList.slice(0, 5);
    } else {
      return gradesList;
    }
  };

  const handleApplyFilters = () => {
    setIsOpen(false);

    router.replace(
      setSearchParams(pathname, searchParams, [
        ["schoolFilter", school],
        ["stageFilter", stage],
        ["gradeFilter", grade],
        ["classFilter", schoolClass],
      ]),
    );
  };

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolsResponse = await fetch("/api/schools");
      const schools = await schoolsResponse.json();

      setSchoolsList(
        schools.data.map(
          (school: { school_name: string; school_value: string }) => ({
            text: school.school_name,
            value: school.school_value,
          }),
        ),
      );
    };

    fetchSchools();
  });

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Dialog.Overlay className="fixed inset-0 z-40 animate-show-modal-overlay bg-black/10 data-[state=closed]:animate-fade-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-40 origin-center -translate-x-1/2 -translate-y-1/2 animate-show-modal rounded-xl border border-slate-100 bg-slate-50 p-12 shadow-2xl data-[state=closed]:animate-fade-out">
          <h1 className="mb-14 block text-center text-4xl font-semibold text-teal-950">
            Filtros avanzados
          </h1>

          <div className="grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-8">
            <RankingFiltersAdvancedInput
              name="school"
              label="Colegio"
              options={schoolsList}
              value={school}
              setValue={setSchool}
            />

            <RankingFiltersAdvancedInput
              name="grade"
              label="Curso"
              options={getGrades()}
              value={grade}
              setValue={setGrade}
            />

            <RankingFiltersAdvancedInput
              name="stage"
              label="Etapa"
              options={[
                { value: "infantil", text: "Infantil" },
                { value: "primaria", text: "Primaria" },
                { value: "secundaria", text: "Secundaria" },
                { value: "bachillerato", text: "Bachillerato" },
              ]}
              value={stage}
              setValue={setStage}
            />

            <RankingFiltersAdvancedInput
              name="schoolClass"
              label="Clase"
              options={[
                { value: "a", text: "A" },
                { value: "b", text: "B" },
                { value: "c", text: "C" },
                { value: "d", text: "D" },
                { value: "e", text: "E" },
                { value: "f", text: "F" },
              ]}
              value={schoolClass}
              setValue={setSchoolClass}
            />
          </div>

          <div className="mt-12 flex items-center justify-center gap-8">
            <button
              onClick={handleApplyFilters}
              className="w-40 rounded-md border border-teal-900 bg-teal-700 py-3 text-2xl font-semibold text-slate-50 shadow-md transition duration-200 hover:border-transparent hover:bg-teal-800 hover:shadow-lg"
            >
              Aplicar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-40 rounded-md border border-slate-300/50 bg-slate-200 py-3 text-2xl font-semibold text-slate-950 shadow-md transition duration-200 hover:border-transparent hover:bg-slate-300 hover:shadow-lg"
            >
              Cancelar
            </button>
          </div>

          <Dialog.Close asChild>
            <HiMiniXMark className="fixed right-4 top-4 cursor-pointer rounded-full p-1 text-4xl text-slate-950 transition duration-150 hover:bg-slate-200" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-200 px-10 py-3 font-semibold text-slate-950 shadow-md transition duration-200 hover:bg-slate-300 hover:shadow-lg"
      >
        <HiAdjustmentsHorizontal className="text-xl" />
        <span>Filtros avanzados</span>
      </button>
    </>
  );
}
export default RankingFiltersAdvanced;
