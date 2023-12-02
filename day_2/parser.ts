export interface Turn {
  red: number;
  green: number;
  blue: number;
}

export interface Game {
  id: number;
  turns: Turn[];
}

export const parse_file = (input: string) => {
  return input.split("\n").map((line) => {
    const game: Game = { id: -1, turns: [] };
    const parts = line.replace(/^Game /, "").split(":");
    game.id = parseInt(parts[0]);
    const turns = parts[1].split(";");
    turns.map((turn) => {
      const turn_struct: Turn = { red: 0, green: 0, blue: 0 };
      turn
        .trim()
        .split(",")
        .forEach((part) => {
          const value = parseInt(part.trim().split(" ")[0]);
          switch (part.trim().split(" ")[1]) {
            case "red":
              turn_struct.red = value;
              break;
            case "green":
              turn_struct.green = value;
              break;
            case "blue":
              turn_struct.blue = value;
              break;
          }
        });
      game.turns.push(turn_struct);
    });
    return game;
  });
};
