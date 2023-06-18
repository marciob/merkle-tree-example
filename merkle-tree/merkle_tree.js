const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

let addressesList = [
  "0x2f0b23f53734252bda2277357e97e1517d6b042a",
  "0x2f0b23f53734252bda2277357e97e1517d6b042b",
  "0x2f0b23f53734252bda2277357e97e1517d6b042c",
  "0x2f0b23f53734252bda2277357e97e1517d6b042d",
  "0x2f0b23f53734252bda2277357e97e1517d6b042e",
  "0x2f0b23f53734252bda2277357e97e1517d6b042f",
  "0x2f0b23f53734252bda2277357e97e1517d6b0420",
];

// convert addresses to keccak256 hashes
const leafNodes = addressesList.map((address) =>
  keccak256(Buffer.from(address.slice(2), "hex"))
);

const merkleTree = new MerkleTree(leafNodes, keccak256, {
  sortPairs: true, // sorts leaf nodes and pairs before building the tree
  //hashLeaves: true, // keccak256 is used to hash the leaves
});

const rootHash = merkleTree.getHexRoot();

console.log("Merkle Root: ", rootHash);

const claimAddress = "0x2f0b23f53734252bda2277357e97e1517d6b042a";
const hashedClaimAddress = keccak256(Buffer.from(claimAddress.slice(2), "hex"));
const hexProof = merkleTree.getHexProof(hashedClaimAddress);

console.log("Hex Proof: ", hexProof);

// verify the proof
console.log(
  "Verify Proof: ",
  merkleTree.verify(hexProof, hashedClaimAddress, rootHash)
);
