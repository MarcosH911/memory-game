require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const { readFile } = require("fs");
const { parse } = require("csv-parse");

function getFakeEmail(username: string) {
  return `${username.toLowerCase()}@fake.com`;
}

const supabaseServiceClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

readFile(filename, "utf8", async (error: any, data: any) => {
  if (error) throw error;
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  await records.forEach(async (record: any) => {
    const username = record.username;
    const fullName = record.fullName;
    const password = record.password;
    const role = record.role;
    const school = record.school;
    const stage = record.stage;
    const grade = record.grade;
    const schoolClass = record.class;

    const fakeEmail = getFakeEmail(username);

    if (
      !username ||
      !password ||
      !fullName ||
      !role ||
      (role === "student" && (!school || !stage || !grade || !schoolClass)) ||
      (role === "teacher" && !school)
    ) {
      throw new Error("Not all credentials were provided");
    }

    if (password.length < 6) {
      throw new Error("The password should be longer");
    }

    const { data: newUserData, error: newUserError } =
      await supabaseServiceClient.auth.admin.createUser({
        email: fakeEmail,
        password,
        user_metadata: {
          role,
        },
        email_confirm: true,
      });

    if (newUserError || !newUserData.user) {
      throw new Error(`There was an error creating the user ${username}`);
    }

    const { error: newProfileError } = await supabaseServiceClient
      .from("profiles")
      .insert({
        user_id: newUserData.user.id,
        username,
        full_name: fullName,
        role,
        school: school || null,
        stage: stage || null,
        grade: grade || null,
        class: schoolClass || null,
      });

    if (newProfileError) {
      throw new Error("There was an error creating the profile");
    }

    const { error: avatarsError } = await supabaseServiceClient
      .from("avatars_transactions")
      .insert({
        user_id: newUserData.user.id,
        avatar_path: "Default-Avatar.png",
      });

    if (avatarsError) {
      throw new Error("There was an error creating the avatar");
    }

    console.log(`${username} registered successfully`);
  });
  console.log("All users registered successfully");
});
