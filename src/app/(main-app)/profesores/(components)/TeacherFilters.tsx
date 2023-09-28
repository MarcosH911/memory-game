"use client";

import { useState } from "react";
import { HiAdjustmentsHorizontal, HiMiniXMark } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";

import TeacherFiltersInput from "./TeacherFiltersInput";
import TeacherFiltersTimeItem from "./TeacherFiltersTimeItem";
import setSearchParams from "@/helpers/setSearchParams";

const gradesList = [
  { value: "primero", text: "Primero" },
  { value: "segundo", text: "Segundo" },
  { value: "tercero", text: "Tercero" },
  { value: "cuarto", text: "Cuarto" },
  { value: "quinto", text: "Quinto" },
  { value: "sexto", text: "Sexto" },
];

const allRankingViews = ["day", "week", "month", "year", "all_time"];

function TeacherFilters() {
  const [stage, setStage] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [isOpen, setIsOpen] = useState(true);

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
        ["stageFilter", stage],
        ["gradeFilter", grade],
        ["classFilter", schoolClass],
      ]),
    );
  };

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Dialog.Overlay className="fixed inset-0 z-40 animate-show-modal-overlay bg-black/10 data-[state=closed]:animate-fade-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-screen w-screen origin-center -translate-x-1/2 -translate-y-1/2 animate-show-modal rounded-xl border border-slate-100 bg-slate-50 px-2 py-20 shadow-2xl data-[state=closed]:animate-fade-out sm:h-fit sm:w-fit sm:px-12 sm:py-12">
          <h1 className="mb-14 block text-center text-3xl font-semibold text-teal-950 sm:text-4xl">
            Filtros
          </h1>

          <div className="-mt-4 mb-8 flex flex-col items-center justify-center gap-6">
            <ul className="flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
              {allRankingViews.map((itemType, index) => (
                <TeacherFiltersTimeItem
                  key={index}
                  itemType={itemType}
                  index={index}
                />
              ))}
            </ul>
          </div>

          <div className="mx-auto grid w-[19.05rem] grid-cols-2 grid-rows-2 gap-x-6 gap-y-4 xs:w-[21.3rem] xs:gap-x-8 xs:gap-y-6 sm:w-[28.5rem] sm:gap-y-8 xl:gap-x-16">
            <TeacherFiltersInput
              name={"grade"}
              label="Curso"
              options={getGrades()}
              value={grade}
              setValue={setGrade}
            />

            <TeacherFiltersInput
              name={"stage"}
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

            <TeacherFiltersInput
              name={"schoolClass"}
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

          <div className="mt-12 flex items-center justify-center gap-4 xs:gap-6 sm:gap-8">
            <button
              onClick={handleApplyFilters}
              className="sx:w-28 w-24 rounded-md border border-teal-900 bg-teal-700 py-1.5 text-lg font-semibold text-slate-50 shadow-md transition duration-200 hover:border-transparent hover:bg-teal-800 hover:shadow-lg xs:py-2 xs:text-xl sm:w-40 sm:py-3 sm:text-2xl"
            >
              Aplicar
            </button>
          </div>

          <Dialog.Close asChild>
            <HiMiniXMark className="fixed right-4 top-4 cursor-pointer rounded-full p-1 text-4xl text-slate-950 transition duration-150 hover:bg-slate-200" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-200 px-10 py-3 font-semibold text-slate-950 shadow-md transition duration-200 hover:bg-slate-300 hover:shadow-lg mx-auto mb-4 mt-6"
      >
        <HiAdjustmentsHorizontal className="text-xl" />
        <span>Filtros</span>
      </button>
    </div>
  );
}
export default TeacherFilters;
