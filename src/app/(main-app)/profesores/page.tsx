/*
Partidas jugadas (diamantes)
Tiempo jugado (partidas jugadas * tiempo)
Filtros obligatorios
Dia, semana, mes, año, todo el tiempo
*/

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import TeacherFilters from "./(components)/TeacherFilters";
import { cookies } from "next/headers";
import TeacherItem from "./(components)/TeacherItem";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ searchParams }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const timeFilter = `points_ranking_${
    (searchParams.timeFilter as string) || "day"
  }`;
  const stageFilter = searchParams.stageFilter as string;
  const gradeFilter = searchParams.gradeFilter as string;
  const classFilter = searchParams.classFilter as string;

  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!userId) {
    console.error("No user id found");
    return;
  }

  const { data: schoolFilter, error: schoolError } = await supabase
    .from("profiles")
    .select("school")
    .eq("user_id", userId)
    .single();

  if (schoolError) {
    console.error("Error getting school");
  }

  const { data: studentsData, error: studentsError } = await supabase
    .from("profiles")
    .select("username, full_name, avatar_path")
    .match({
      school: schoolFilter?.school,
      stage: stageFilter,
      grade: gradeFilter,
      class: classFilter,
      role: "student",
    })
    .order("full_name", {
      ascending: false,
    });

  if (studentsError) {
    console.error("Error getting student data");
  }

  const { data: studentsDiamondsData, error: studentsDiamondsError } =
    await supabase
      .from(timeFilter)
      .select("username, diamonds")
      .match({
        school: schoolFilter?.school,
        stage: stageFilter,
        grade: gradeFilter,
        class: classFilter,
      });

  if (studentsDiamondsError) {
    console.error("Error getting student diamonds");
  }

  const allStudentsData = studentsData?.map((item) => {
    return {
      ...item,
      diamonds:
        studentsDiamondsData?.find(
          (student) => student.username === item.username,
        )?.diamonds || 0,
    };
  });

  return (
    <div>
      <TeacherFilters />
      {allStudentsData?.map((item, index) => (
        <TeacherItem key={index} data={item} />
      ))}
    </div>
  );
}

export default Page;
