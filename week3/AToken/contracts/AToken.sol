//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AToken is ERC20 {
    address private creator;
    constructor() ERC20("A Token", "ATK") {
        creator = msg.sender;
        _mint(msg.sender, 0);
    }

    modifier isCreator () {
        require(msg.sender == creator, "is not a creator");
        _;
    }

    function mintToken (uint256 amount) isCreator public {
        _mint(creator, amount);
    }
}
