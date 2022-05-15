// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hello {
    uint256 public counter;

    constructor(uint x) {
      counter = x;
    }

    function count() public {
      counter = counter + 1;
    }
}
