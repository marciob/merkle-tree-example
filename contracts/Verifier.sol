//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Verifier {
    // merkle root of the merkle tree containing the qualified addresses
    bytes32 public root;

    constructor(bytes32 _root) {
        root = _root;
    }

    // verifies if the address is within the merkle tree
    function verify(
        bytes32[] memory proof, // merkle proof of the address, it's an array of hashes
        address addr // address to be verified
    ) public view returns (bool) {
        // hash the address
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(addr))));

        // it will return true if the address is within the merkle tree
        return MerkleProof.verify(proof, root, leaf);
    }
}
