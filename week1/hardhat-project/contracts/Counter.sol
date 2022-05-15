//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Counter {
    uint256 public counter;
    constructor() {
        counter = 0;
    }

    function count() public {
        counter = counter + 1;
        console.log("counter: ", counter);
    }
}
