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

    BlackToken private _blackToken;
    address private _blackTokenOwner;

    mapping(address => uint256) private _lockTime;
    
    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    constructor(BlackToken tokenAddress, address blackTokenOwner) {
        _blackToken = BlackToken(tokenAddress);
        _blackTokenOwner = blackTokenOwner;
    }

    function withdraw(uint256 withdrawAmount) public {
        require(withdrawAmount <= 0.1 ether, "You can't withdraw more than 0.1 ETH");
        require(block.timestamp > _lockTime[msg.sender], "Lock time has not expired. Please try again later");
        require(address(this).balance >= withdrawAmount, "Insufficiaent balance in faucet for withdrawal requist");

        payable(msg.sender).transfer(withdrawAmount);

        emit Withdrawal(msg.sender, withdrawAmount);
    }

    function requestTokens(uint256 requestAmount) public {
        require(requestAmount <= 100, "You can't request more than 100 BONE");
        require(block.timestamp > _lockTime[msg.sender], "Lock time has not expired. Please try again later");

        _blackToken.transferFrom(_blackTokenOwner, msg.sender, requestAmount);

        _lockTime[msg.sender] = block.timestamp + 1 days;
    }

    function rewardTokens() public payable {
        require(msg.value >= 0.1 ether, "Please donate at least 0.1 ETH for reward");
        
        _blackToken.transferFrom(_blackTokenOwner, msg.sender, 100);
    }

    receive() external payable {
        //revert();
        emit Deposit(msg.sender, msg.value);
    }
}