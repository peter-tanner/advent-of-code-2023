import { RANK, cmp_by_card } from "./compare";
import { HandBid, read_file } from "./parser";

const rank_hand = (hand: string) => {
  const cards = hand.split("");
  const card_count = cards.reduce((count, char) => {
    const c = count.get(char);
    return c ? count.set(char, c + 1) : count.set(char, 1);
  }, new Map<string, number>(Object.entries({ J: 0 })));

  // It is always the most optimal choice to greedily substitute J for the card with the most occurrences.
  var max_card = "?";
  Array.from(card_count.keys()).forEach((card) => {
    if (
      card !== "J" &&
      (card_count.get(card) || 0) > (card_count.get(max_card) || 0)
    ) {
      max_card = card;
    }
  });

  card_count.set(
    max_card,
    (card_count.get(max_card) || 0) + (card_count.get("J") || 0)
  );
  card_count.delete("J");

  const unique_cards = Array.from(card_count.keys()).filter(
    (card) => card !== "J"
  );

  if (unique_cards.length === 1) return RANK.FIVE_OF_A_KIND;
  if (unique_cards.length === 4) return RANK.ONE_PAIR;
  if (unique_cards.length === 5) return RANK.HIGH_CARD;
  if (
    unique_cards.length === 2 &&
    [1, 4].includes(card_count.get(unique_cards[0]) || 0)
  )
    return RANK.FOUR_OF_A_KIND;
  if (
    unique_cards.length === 2 &&
    [2, 3].includes(card_count.get(unique_cards[0]) || 0)
  )
    return RANK.FULL_HOUSE;
  if (
    unique_cards.length === 3 &&
    unique_cards.reduce((c, card) => card_count.get(card) === 3 || c, false)
  )
    return RANK.THREE_OF_A_KIND;

  return RANK.TWO_PAIR;
};

const STRENGTH = new Map<string, number>(
  Object.entries({
    A: 0,
    K: 1,
    Q: 2,
    T: 3,
    "9": 4,
    "8": 5,
    "7": 6,
    "6": 7,
    "5": 8,
    "4": 9,
    "3": 10,
    "2": 11,
    J: 12,
  })
);

const cmp_hand = (hand_bid1: HandBid, hand_bid2: HandBid) => {
  if (rank_hand(hand_bid1.hand) > rank_hand(hand_bid2.hand)) return -1;
  if (rank_hand(hand_bid1.hand) < rank_hand(hand_bid2.hand)) return 1;
  return cmp_by_card(hand_bid1.hand, hand_bid2.hand, STRENGTH);
};

console.log(
  read_file()
    .sort(cmp_hand)
    .reduce((sum, hand_bid, i) => sum + hand_bid.bid * (1 + i), 0)
);
