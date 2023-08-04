const hre = require("hardhat");
const { ethers } = hre;
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");
const assert = require("assert");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");

chai.use(solidity);
const { expect } = chai;

describe("Verifier contract", function () {
  let Verifier;
  let verifier;
  let owner;

  let root;

  beforeEach(async function () {
    Verifier = await ethers.getContractFactory("Verifier");
    [owner] = await ethers.getSigners();

    // Load the tree from the file tree.json
    const tree = StandardMerkleTree.load(
      JSON.parse(fs.readFileSync("./test/tree.json"))
    );

    // Get the root of the Merkle tree
    root = tree.root;

    verifier = await Verifier.deploy(root);
    await verifier.deployed();
  });

  it("should verify if the address is part of the merkle tree", async function () {
    let addressToCheck = "0x2f0b23f53734252bda2277357e97e1517d6b042d";

    // Load the tree from the file tree.json
    const tree = StandardMerkleTree.load(
      JSON.parse(fs.readFileSync("./test/tree.json"))
    );

    let proof;

    for (const [i, v] of tree.entries()) {
      if (v[0] === addressToCheck) {
        proof = tree.getProof(i);
        break;
      }
    }

    console.log("Generated Proof:", proof);

    if (!proof) {
      assert.fail("Proof not found for the given address.");
    }

    // Convert proof buffers to hex strings
    proof = proof.map((buffer) => buffer.toString("hex"));

    const isPartOfMerkleTree = await verifier.verify(proof, addressToCheck);

    assert(isPartOfMerkleTree, "Address is not a part of the Merkle Tree.");
  });
});
