export interface Race {
  time: number;
  distance: number;
}

const try_soln = (time: number, race: Race) =>
  time * (race.time - time) > race.distance;

// In[60]:= distance[ta_, tmax_] := ta*(tmax - ta)
//
// In[103]:=
// solns[d_, tmax_] := Reduce[distance[ta, tmax] >= d + 1, ta, Integers]
//
// In[104]:= solns[d, t]
//
// Out[104]= (d | t | ta) \[Element]
//   Integers && ((d < 1/4 (-4 + t^2) &&
//      t/2 - 1/2 Sqrt[-4 - 4 d + t^2] <= ta <=
//       t/2 + 1/2 Sqrt[-4 - 4 d + t^2]) || (d == 1/4 (-4 + t^2) &&
//      ta == t/2))

const get_interval_length = (race: Race) => {
  var low = Math.ceil(
    race.time / 2 - (1 / 2) * Math.sqrt(race.time ** 2 - 4 * race.distance)
  );
  var high = Math.floor(
    race.time / 2 + (1 / 2) * Math.sqrt(race.time ** 2 - 4 * race.distance)
  );

  //   lol, lmao even.
  if (!try_soln(low, race)) {
    low += 1;
  }
  if (try_soln(low - 1, race)) {
    low -= 1;
  }
  if (!try_soln(high, race)) {
    high -= 1;
  }
  if (try_soln(high + 1, race)) {
    high += 1;
  }
  return high - low + 1;
};

export const solve_all_races = (races: Race[]) =>
  races
    .map((race) => get_interval_length(race))
    .reduce((prod, v) => prod * v, 1);
