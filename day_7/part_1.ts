import { RANK, cmp_by_card } from "./compare";
import { HandBid, read_file } from "./parser";

const rank_hand = (hand: string) => {
  const cards = hand.split("");
  const card_count = cards.reduce((count, char) => {
    const c = count.get(char);
    return c ? count.set(char, c + 1) : count.set(char, 1);
  }, new Map<string, number>());

  const unique_cards = Array.from(card_count.keys());

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
    J: 3,
    T: 4,
    "9": 5,
    "8": 6,
    "7": 7,
    "6": 8,
    "5": 9,
    "4": 10,
    "3": 11,
    "2": 12,
  })
);

const cmp_hand = (hand_bid1: HandBid, hand_bid2: HandBid) => {
  if (rank_hand(hand_bid1.hand) > rank_hand(hand_bid2.hand)) return -1;
  if (rank_hand(hand_bid1.hand) < rank_hand(hand_bid2.hand)) return 1;
  return cmp_by_card(hand_bid1.hand, hand_bid2.hand, STRENGTH);
};

const hand_bids = read_file();

console.log(
  hand_bids
    .sort(cmp_hand)
    .reduce((sum, hand_bid, i) => sum + hand_bid.bid * (1 + i), 0)
);
