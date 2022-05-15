//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Vault {
    address private _tokenAddress;
    mapping(address=>uint256) private balances;
    constructor(address tokenAddress) {
        _tokenAddress = tokenAddress;
    }

    function desposite (uint256 amount) public {
        uint256 balance = balances[msg.sender];
        IERC20(_tokenAddress).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] = balance + amount;
    }

    function withdraw() public {
        uint256 balance = balances[msg.sender];
        require(balance != 0, "Don't have balance");
        
        require(IERC20(_tokenAddress).transfer(msg.sender, balance), "Transfer failed");
        balances[msg.sender] = 0;
    }
}
