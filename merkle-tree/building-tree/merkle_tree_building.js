const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

// define the values to be used in the tree
const values = [
  ["0x2f0b23f53734252bda2277357e97e1517d6b042a"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042b"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042c"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042d"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042e"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b042f"],
  ["0x2f0b23f53734252bda2277357e97e1517d6b0420"],
];

// create the tree
const tree = StandardMerkleTree.of(values, ["address"]);

console.log("Merkle Root:", tree.root);

// saves the tree in a file called tree.json in the same folder
// it will be used in the next script to generate the proof for a given value in the tree
// the proof will be used to verify the value in the smart contract
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
