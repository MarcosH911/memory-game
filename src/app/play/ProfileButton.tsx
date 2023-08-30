"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function ProfileButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("There was an error logging out");
    }

    router.refresh();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default ProfileButton;
