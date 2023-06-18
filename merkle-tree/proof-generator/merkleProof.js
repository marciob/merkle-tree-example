const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

// it loads the tree from the file tree.json
const tree = StandardMerkleTree.load(
  JSON.parse(fs.readFileSync("./../building-tree/tree.json"))
);

// it iterates over the tree to find the index of the value we want to generate the proof for
// if the value is found, it generates the proof and prints it
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
console.log(false);
