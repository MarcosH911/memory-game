"use client";

import { useEffect, useState } from "react";
import { HiAdjustmentsHorizontal, HiMiniXMark } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";

import RankingFiltersAdvancedInput from "./RankingFiltersAdvancedInput";
import setSearchParams from "@/helpers/setSearchParams";
import { twMerge } from "tailwind-merge";
import RankingFiltersTimeItem from "./RankingFiltersTimeItem";
import RankingFiltersPointsItem from "./RankingFiltersPointsItem";
import useSWR from "swr";
import toast from "react-hot-toast";

interface Props {
  type?: "normal" | "advanced";
}

const gradesList = [
  { value: "primero", text: "Primero" },
  { value: "segundo", text: "Segundo" },
  { value: "tercero", text: "Tercero" },
  { value: "cuarto", text: "Cuarto" },
  { value: "quinto", text: "Quinto" },
  { value: "sexto", text: "Sexto" },
];

const allRankingViews = ["day", "week", "month", "year", "all_time"];

function RankingFiltersAdvanced({ type = "normal" }: Props) {
  const [school, setSchool] = useState("");
  const [stage, setStage] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: schoolsList, error: schoolsListError } = useSWR("/api/schools");

  if (schoolsListError) {
    toast.error("Ha ocurrido un error inesperado");
  }

  const formattedSchoolsList =
    schoolsList?.data.map(
      (school: { school_name: string; school_value: string }) => ({
        text: school.school_name,
        value: school.school_value,
      }),
    ) || [];

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
    setSchool(searchParams.get("schoolFilter") || "");
    setStage(searchParams.get("stageFilter") || "");
    setGrade(searchParams.get("gradeFilter") || "");
    setSchoolClass(searchParams.get("classFilter") || "");
  }, [searchParams]);

  return (
    <div
      className={twMerge(
        type === "normal" && "block xl:hidden",
        type === "advanced" && "hidden xl:block",
      )}
    >
      <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Dialog.Overlay className="fixed inset-0 z-40 animate-show-modal-overlay bg-black/10 data-[state=closed]:animate-fade-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-screen w-screen origin-center -translate-x-1/2 -translate-y-1/2 animate-show-modal rounded-xl border border-slate-100 bg-slate-50 px-2 py-20 shadow-2xl data-[state=closed]:animate-fade-out sm:h-fit sm:w-fit sm:px-12 sm:py-12">
          <h1 className="mb-14 block text-center text-3xl font-semibold text-teal-950 sm:text-4xl">
            {type === "normal" ? "Filtros" : "Filtros avanzados"}
          </h1>

          <div
            className={twMerge(
              "-mt-4 mb-8 flex flex-col items-center justify-center gap-6",
              type === "advanced" && "hidden",
            )}
          >
            <ul className="flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
              {allRankingViews.map((itemType, index) => (
                <RankingFiltersTimeItem
                  key={index}
                  itemType={itemType}
                  index={index}
                />
              ))}
            </ul>

            <ul className="relative flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
              {["coins", "diamonds", "max_level"].map((itemType, index) => (
                <RankingFiltersPointsItem
                  key={index}
                  itemType={itemType}
                  index={index}
                />
              ))}
            </ul>
          </div>

          <div className="mx-auto grid w-[19.05rem] grid-cols-2 grid-rows-2 gap-x-6 gap-y-4 xs:w-[21.3rem] xs:gap-x-8 xs:gap-y-6 sm:w-[28.5rem] sm:gap-y-8 xl:gap-x-16">
            <RankingFiltersAdvancedInput
              name={"school" + type}
              label="Colegio"
              options={formattedSchoolsList}
              value={school}
              setValue={setSchool}
            />

            <RankingFiltersAdvancedInput
              name={"grade" + type}
              label="Curso"
              options={getGrades()}
              value={grade}
              setValue={setGrade}
            />

            <RankingFiltersAdvancedInput
              name={"stage" + type}
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
              name={"schoolClass" + type}
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
            <button
              onClick={() => setIsOpen(false)}
              className={twMerge(
                "w-24 rounded-md border border-slate-300/50 bg-slate-200 py-1.5 text-lg font-semibold text-slate-950 shadow-md transition duration-200 hover:border-transparent hover:bg-slate-300 hover:shadow-lg xs:w-28 xs:py-2 xs:text-xl sm:w-40 sm:py-3 sm:text-2xl",
                type === "normal" && "hidden",
              )}
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
        className={twMerge(
          "flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-200 px-10 py-3 font-semibold text-slate-950 shadow-md transition duration-200 hover:bg-slate-300 hover:shadow-lg",
          type === "normal" && "mx-auto mb-4 mt-6",
        )}
      >
        <HiAdjustmentsHorizontal className="text-xl" />
        <span>{type === "normal" ? "Filtros" : "Filtros avanzados"}</span>
      </button>
    </div>
  );
}
export default RankingFiltersAdvanced;
