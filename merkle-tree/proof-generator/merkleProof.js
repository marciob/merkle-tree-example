const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

// (1)
const tree = StandardMerkleTree.load(
  JSON.parse(fs.readFileSync("./../tree.json"))
);

// (2)
for (const [i, v] of tree.entries()) {
  if (v[0] === "0x2f0b23f53734252bda2277357e97e1517d6b042d") {
    // (3)
    const proof = tree.getProof(i);
    console.log("Value:", v);
    console.log("Proof:", proof);
    console.log(true);
    return;
  }
}
