const allBids = [
  {
    amount: 1,
    amount: 2,
    amount: 3,
  },
];

export function getHighestBid(bids) {
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);
  return sortedBids[0].amount;
}
