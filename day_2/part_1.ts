import * as fs from "fs";
import { Game, Turn, parse_file } from "./parser";

const MAX_CUBES: Turn = { red: 12, green: 13, blue: 14 };

const input = fs.readFileSync("input", "utf8");

const sum_possible_games = parse_file(input)
  .map((game) =>
    game.turns.reduce(
      (valid, turn) =>
        valid &&
        turn.blue <= MAX_CUBES.blue &&
        turn.red <= MAX_CUBES.red &&
        turn.green <= MAX_CUBES.green,
      true
    )
      ? game.id
      : 0
  )
  .reduce((sum, game_id) => sum + game_id, 0);

console.log(sum_possible_games);
