import * as fs from "fs";

const file = fs.readFileSync("input", "utf8");

const first_half = file
  .split("\n")
  .map((e) =>
    e.replace(/one|two|three|four|five|six|seven|eight|nine/, (substr) => {
      switch (substr) {
        case "one":
          return "1";
        case "two":
          return "2";
        case "three":
          return "3";
        case "four":
          return "4";
        case "five":
          return "5";
        case "six":
          return "6";
        case "seven":
          return "7";
        case "eight":
          return "8";
        case "nine":
          return "9";
        default:
          console.error("ERROR");
          return "X";
      }
    })
  )
  .map((e) => e.replace(/[^0-9\n]/g, ""))
  .map((e) => e.at(0));

const second_half = file
  .split("\n")
  .map((e) =>
    e
      .split("")
      .reverse()
      .join("")
      .replace(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/, (substr) => {
        switch (substr) {
          case "eno":
            return "1";
          case "owt":
            return "2";
          case "eerht":
            return "3";
          case "ruof":
            return "4";
          case "evif":
            return "5";
          case "xis":
            return "6";
          case "neves":
            return "7";
          case "thgie":
            return "8";
          case "enin":
            return "9";
          default:
            console.error("ERROR");
            return "X";
        }
      })
      .split("")
      .reverse()
      .join("")
  )
  .map((e) => e.replace(/[^0-9\n]/g, ""))
  .map((e) => e.at(-1));

const sum = first_half
  .map((e, i) => {
    if (e) return parseInt(e + second_half[i]);
    else console.error("MISSING VALUE");
  })
  .reduce((sum, value) => (sum || 0) + (value || 0), 0);

console.log(sum);
