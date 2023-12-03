import * as fs from "fs";
import { iterPoint, parse_file, point_2_string } from "./parser";

const input = fs.readFileSync("input", "utf8");
const { part_numbers, part_number_cells, symbols } = parse_file(input);

interface GearPair {
  g1: number;
  g2: number;
}

const gear_pairs: Set<GearPair> = new Set();

symbols.forEach((e) => {
  if (e.symbol === "*") {
    const gears: Set<number> = new Set();
    iterPoint(e.p)
      .map((e) => point_2_string(e))
      .forEach((adjP) => {
        const part_number_index = part_number_cells.get(adjP);

        if (part_number_index !== undefined) {
          gears.add(part_number_index);
        }
      });
    if (gears.size === 2) {
      const gear_pair: GearPair = {
        g1: [...gears][0],
        g2: [...gears][1],
      };
      gear_pairs.add(gear_pair);
    }
  }
});

console.log(
  [...gear_pairs]
    .map((pair) => part_numbers[pair.g1] * part_numbers[pair.g2])
    .reduce((sum, v) => sum + v, 0)
);
