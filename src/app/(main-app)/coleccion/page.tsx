import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AvatarCollectionItem from "./AvatarCollectionItem";

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("user_avatars").select("*");

  return (
    <div>
      {data ? (
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-x-3 gap-y-3">
          {data.map((item, index) => (
            <AvatarCollectionItem key={index} data={item} />
          ))}
        </div>
      ) : (
        <div>Prueba a comprarte un avatar</div>
      )}
    </div>
  );
}

export default Page;
