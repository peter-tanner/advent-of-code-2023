import * as fs from "fs";
import { iterPoint, parse_file, point_2_string } from "./parser";

const input = fs.readFileSync("input", "utf8");
const { part_numbers, part_number_cells, symbols } = parse_file(input);

const valid_part_number_indices: Set<number> = new Set();

symbols.forEach((e) => {
  iterPoint(e.p)
    .map((e) => point_2_string(e))
    .forEach((adjP) => {
      const part_number_index = part_number_cells.get(adjP);

      if (part_number_index !== undefined) {
        valid_part_number_indices.add(part_number_index);
      }
    });
});

console.log(
  [...valid_part_number_indices]
    .map((i) => part_numbers[i])
    .reduce((sum, v) => sum + v, 0)
);
