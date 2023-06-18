const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

// (1)
const values = [
  ["0x2f0b23f53734252bda2277357e97e1517d6b042a"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042b"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042c"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042d"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042e"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042f"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b0420"],
];

// (2)
const tree = StandardMerkleTree.of(values, ["address"]);

// (3)
console.log("Merkle Root:", tree.root);

// (4)
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
