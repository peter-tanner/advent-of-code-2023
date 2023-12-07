export enum RANK {
  FIVE_OF_A_KIND,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  THREE_OF_A_KIND,
  TWO_PAIR,
  ONE_PAIR,
  HIGH_CARD,
}

export const cmp_by_card = (
  hand1: string,
  hand2: string,
  strength_order: Map<string, number>
) => {
  for (var i = 0; i < hand1.length; i++) {
    const s1 = strength_order.get(hand1[i]);
    const s2 = strength_order.get(hand2[i]);
    if (undefined === s1 || undefined === s2) {
      console.error("ERROR", i, hand1[i], hand2[i]);
      return 0;
    }
    if (s1 > s2) return -1;
    if (s1 < s2) return 1;
  }
  return 0;
};
