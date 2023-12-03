enum PARSER_STATE {
  EMPTY,
  NUMBER,
}

export interface Point {
  i: number;
  j: number;
}

export const iterPoint = (p: Point) => {
  const adjacent_points: Point[] = [
    { i: p.i + 1, j: p.j + 1 },
    { i: p.i + 1, j: p.j + 0 },
    { i: p.i + 1, j: p.j + -1 },
    { i: p.i + 0, j: p.j + 1 },
    // {i: p.i + 0, j: p.j + 0},
    { i: p.i + 0, j: p.j + -1 },
    { i: p.i + -1, j: p.j + 1 },
    { i: p.i + -1, j: p.j + 0 },
    { i: p.i + -1, j: p.j + -1 },
  ];
  return adjacent_points;
};

export interface Symbol {
  p: Point;
  symbol: string;
}

export const point_2_string = (p: Point) => `${p.i},${p.j}`;

export const parse_file = (input: string) => {
  const grid = input.split("\n").map((row) => row.split(""));

  var parser_state = PARSER_STATE.EMPTY;
  const part_numbers: number[] = [];
  const part_number_cells: Map<string, number> = new Map();
  const symbols: Symbol[] = [];

  for (const j in grid) {
    const row = grid[j];

    // Numbers do not go down rows.
    parser_state = parser_state = PARSER_STATE.EMPTY;
    var number_buf = "";

    for (const i in row) {
      const cell = row[i];
      const point: Point = { i: parseInt(i), j: parseInt(j) };
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(cell)) {
        parser_state = PARSER_STATE.NUMBER;
        number_buf += cell;
        part_number_cells.set(point_2_string(point), part_numbers.length);
      } else {
        if (parser_state === PARSER_STATE.NUMBER) {
          part_numbers.push(parseInt(number_buf));
          number_buf = "";
        }
        if (cell !== ".") {
          symbols.push({ p: point, symbol: cell });
        }
        parser_state = PARSER_STATE.EMPTY;
      }
    }

    // Cleanup at end of file.
    if (parser_state === PARSER_STATE.NUMBER) {
      part_numbers.push(parseInt(number_buf));
    }
  }

  return {
    part_numbers: part_numbers,
    part_number_cells: part_number_cells,
    symbols: symbols,
  };
};
