// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Repository of ERC721 BlackDeed
 * This contract contains the list of deeds registered by users.
 */
contract BlackDeedRepository is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    /**
    * @dev Event is triggered if deed/token is registered
    * @param by address of the registrar
    * @param tokenId uint256 represents a specific deed
    */
    event DeedRegistred(address by, uint256 tokenId);

    /**
    * @dev Created a DeedRepository with a name and symbol
    * @param name string represents the name of the repository
    * @param symbol string represents the symbol of the repository
    */
    constructor(string memory name, string memory symbol) ERC721(name, symbol){ }

    /**
    * @dev Public function to register a new deed
    * @dev Call the ERC721Token minter
    * @param tokenURI string containing metadata/uri
    */
    function registerDeed(string memory tokenURI) public returns(uint256) {
        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit DeedRegistred(msg.sender, newItemId);

        return newItemId;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }
}