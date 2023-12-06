import * as fs from "fs";
import { Race, solve_all_races } from "./solver";

export const read_file = () => {
  const input = fs.readFileSync("input", "ascii");
  const [times_str, distances_str] = input.split("\n");
  const times = times_str
    .replace(/ /g, "")
    .split(":")
    .map((token) => Number.parseInt(token))
    .filter((token) => !isNaN(token));
  const distances = distances_str
    .replace(/ /g, "")
    .split(":")
    .map((token) => Number.parseInt(token))
    .filter((token) => !isNaN(token));

  const races: Race[] = times.map((time, i) => {
    return { time: time, distance: distances[i] };
  });

  return races;
};

console.log(solve_all_races(read_file()));
