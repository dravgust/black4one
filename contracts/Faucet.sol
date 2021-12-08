// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Mortal is Ownable {
    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}

contract Faucet is Mortal {

    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    function withdraw(uint256 withdrawAmount) public {
        require(withdrawAmount <= 0.1 ether, "You can't withdraw more than 0.1 ether");
        require(address(this).balance >= withdrawAmount, "Insufficiaent balance in faucet for withdrawal requist");

        payable(msg.sender).transfer(withdrawAmount);
        emit Withdrawal(msg.sender, withdrawAmount);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}