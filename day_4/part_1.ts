import * as fs from "fs";

const input = fs.readFileSync("input", "utf8");

const cards = input.split("\n").map((card) =>
  card
    .split(": ")[1]
    .split(" | ")
    .map((part) =>
      part
        .split(" ")
        .filter((num) => num !== "")
        .map((num) => parseInt(num))
    )
);

console.log(
  cards
    .map((card) =>
      card[1].reduce(
        (score, your_number) =>
          card[0].includes(your_number) ? (score === 0 ? 1 : score * 2) : score,
        0
      )
    )
    .reduce((sum, score) => sum + score, 0)
);
