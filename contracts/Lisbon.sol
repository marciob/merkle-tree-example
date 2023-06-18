// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Lisbon is ERC20 {
    constructor() ERC20("Lisbon", "LBS") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }
}
