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

  records.forEach((record) => console.log(record));
});
