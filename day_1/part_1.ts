import * as fs from "fs";
const sum = fs
  .readFileSync("input", "utf8")
  .replace(/[^0-9\n]/g, "")
  .split("\n")
  .map((e) => parseInt(e[0] + e.at(-1)))
  .reduce((sum, value) => sum + value, 0);
console.log(sum);
