import * as fs from "fs";

export interface HandBid {
  hand: string;
  bid: number;
}

export const read_file = (): HandBid[] =>
  fs
    .readFileSync("input", "ascii")
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      return { hand: hand, bid: Number.parseInt(bid) };
    });
