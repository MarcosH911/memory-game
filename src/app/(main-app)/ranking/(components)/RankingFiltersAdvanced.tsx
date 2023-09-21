"use client";

import { useEffect, useRef, useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import * as Dialog from "@radix-ui/react-dialog";
import RankingFiltersAdvancedInput from "./RankingFiltersAdvancedInput";

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

  const schoolsList = useRef<{ text: string; value: string }[]>([]);

  const getGrades = () => {
    if (stage === "bachillerato") {
      return gradesList.slice(0, 3);
    } else if (stage === "secundaria") {
      return gradesList.slice(0, 5);
    } else {
      return gradesList;
    }
  };

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolsResponse = await fetch("/api/schools");
      const schools = await schoolsResponse.json();

      schoolsList.current = schools.data.map(
        (school: { school_name: string; school_value: string }) => ({
          text: school.school_name,
          value: school.school_value,
        })
      );
    };

    fetchSchools();
  });

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Dialog.Overlay className="fixed inset-0 z-40 animate-show-modal-overlay bg-black/10" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-40 origin-center -translate-x-1/2 -translate-y-1/2 animate-show-modal grid grid-cols-2 grid-rows-2 bg-slate-50">
          <RankingFiltersAdvancedInput
            name="school"
            label="Colegio"
            options={schoolsList.current}
            value={school}
            setValue={setSchool}
          />

          <RankingFiltersAdvancedInput
            name="stage"
            label="Curso"
            options={[
              { value: "infantil", text: "infantil" },
              { value: "primaria", text: "Primaria" },
              { value: "secundaria", text: "Secundaria" },
              { value: "bachillerato", text: "Bachillerato" },
            ]}
            value={stage}
            setValue={setStage}
          />

          <RankingFiltersAdvancedInput
            name="grade"
            label="Curso"
            options={getGrades()}
            value={grade}
            setValue={setGrade}
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
          <Dialog.Close asChild></Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-1.5 rounded-full border border-slate-400/70 bg-slate-200 px-10 py-3 font-semibold text-slate-950 shadow-md transition duration-200 hover:bg-slate-300 hover:shadow-lg"
      >
        <HiAdjustmentsHorizontal className="text-xl" />
        <span>Filtros avanzados</span>
      </button>
    </>
  );
}

export default RankingFiltersAdvanced;
