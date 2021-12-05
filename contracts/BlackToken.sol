// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract BlackToken is ERC20, ERC20Permit, ERC20Votes {
    uint public INITIAL_SUPPLY = 10000;
    constructor() ERC20("BlackToken", "BLT") ERC20Permit("BlackToken"){
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes){
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes){
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes){
        super._burn(account, amount);
    }
}