// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TutorialToken is ERC20, AccessControl, Ownable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint public INITIAL_SUPPLY = 12000;
    //string public name = "TutorialToken";
    //string public symbol = "TT";
    //uint public decimals = 2;
    
    //constructor() ERC20("TutorialToken", "TT") {
      //  _mint(msg.sender, INITIAL_SUPPLY);
    //}

    //function reward(address to, uint256 amount) public onlyOwner {
    //    _mint(to, amount);
    //}

    constructor() ERC20("TutorialToken", "TT") {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(from, amount);
    }
}
