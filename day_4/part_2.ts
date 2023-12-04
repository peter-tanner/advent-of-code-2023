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

const card_dupe_count = Array(cards.length).fill(1);

const get_matching_numbers = (card: number[][]) =>
  card[1].reduce(
    (score, your_number) => (card[0].includes(your_number) ? score + 1 : score),
    0
  );

cards.map((card, i) => {
  const matching_numbers = get_matching_numbers(card);
  [...Array(matching_numbers).keys()].forEach((off) => {
    card_dupe_count[i + off + 1] += card_dupe_count[i];
  });
});

console.log(card_dupe_count.reduce((sum, v) => sum + v, 0));
