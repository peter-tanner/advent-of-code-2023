import * as fs from "fs";
import { Game, Turn, parse_file } from "./parser";

const input = fs.readFileSync("input", "utf8");

const total_power = parse_file(input)
  .map((game) => {
    const min_cubes = game.turns.reduce(
      (min_cubes, turn) => {
        return {
          blue: Math.max(turn.blue, min_cubes.blue),
          red: Math.max(turn.red, min_cubes.red),
          green: Math.max(turn.green, min_cubes.green),
        };
      },
      { red: 0, blue: 0, green: 0 }
    );
    return min_cubes.blue * min_cubes.green * min_cubes.red;
  })
  .reduce((total_power, game_power) => total_power + game_power, 0);

console.log(total_power);
