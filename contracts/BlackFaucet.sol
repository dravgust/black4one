// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BlackToken.sol";

contract Mortal is Ownable {
    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}

contract BlackFaucet is Mortal {

    BlackToken public _blackToken;
    address public _blackTokenOwner;
    
    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    constructor(BlackToken tokenAddress, address blackTokenOwner){
        _blackToken = BlackToken(tokenAddress);
        _blackTokenOwner = blackTokenOwner;
    }

    function withdraw(uint256 withdrawAmount) public {
        require(withdrawAmount <= 0.1 ether, "You can't withdraw more than 0.1 ether");
        require(address(this).balance >= withdrawAmount, "Insufficiaent balance in faucet for withdrawal requist");

        payable(msg.sender).transfer(withdrawAmount);
        emit Withdrawal(msg.sender, withdrawAmount);
    }

    function withdrawBONE(uint256 withdrawAmount) public {
        require(withdrawAmount <= 100, "You can't withdraw more than 100 BONE");
        _blackToken.transferFrom(_blackTokenOwner, msg.sender, withdrawAmount);
    }

    receive() external payable {
        //revert();
        emit Deposit(msg.sender, msg.value);
    }
}