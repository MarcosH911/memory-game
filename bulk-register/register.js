// Handle imports
const { parse } = require("csv-parse");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const filename = process.argv[2];

fs.readFile(filename, "utf8", async (error, data) => {
  if (error) throw error;

  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  records.forEach(async (record) => {
    const username = record.Username;
    const fullName = record["Full Name"];
    const password = record.Password;
    const fakeEmail = getFakeEmail(record.username);

    const { data: newUserData, error: newUserError } =
      await supabaseServiceClient.auth.admin.createUser({
        email: fakeEmail,
        password,
        user_metadata: {
          data: { role: "admin" },
        },
        email_confirm: true,
      });

    if (newUserError || !newUserData.user) {
      throw new Error("There was an error creating the user");
    }

    const { error: newProfileError } = await supabase.from("profiles").insert({
      user_id: newUserData.user.id,
      username,
      full_name: fullName,
      role: "admin",
      school: null,
      stage: null,
      grade: null,
      class: null,
    });

    if (newProfileError) {
      throw new Error("There was an error creating the profile");
    }

    const { error: avatarsError } = await supabase
      .from("avatars_transactions")
      .insert({
        user_id: newUserData.user.id,
        avatar_path: "Default-Avatar.png",
      });

    if (avatarsError) {
      throw new Error("There was an error creating the avatar");
    }

    console.log("Users registered successfully");
  });
});
