// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Counter {

    uint256 count = 0;

    function increment() public {
        count = count + 1;
    }

    function getCount() public view returns (uint256){
        return count;
    }
}