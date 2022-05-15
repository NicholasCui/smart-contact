//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint) balances;
    receive () external payable {
        balances[msg.sender] = msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficent Funds");
        uint balance = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }
}
