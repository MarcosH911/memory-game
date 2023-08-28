"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "../../../types/supabase";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user || user.user_metadata.role !== "admin") {
      console.error("You need to be an admin to create new users");
      return;
    }

    const fakeEmail = `${username.toLowerCase()}@fake.com`;
    const { data: newUserData, error: newUserError } =
      await supabase.auth.signUp({
        email: fakeEmail,
        password,
        options: {
          data: {
            role,
          },
        },
      });

    if (newUserError || !newUserData.user) {
      console.error("There was an error creating the new user");
      return;
    }

    const { error: newProfileError } = await supabase.from("profiles").insert({
      user_id: newUserData.user.id,
      full_name: fullName,
      username,
      nickname: "",
      role,
    });

    if (newProfileError) {
      console.log("There was an error creating the new profile");
    }

    router.refresh();
  };

  return (
    <div>
      <form onSubmit={(e) => handleRegister(e)}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
