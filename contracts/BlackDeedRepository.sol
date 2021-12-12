// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlackDeedRepository is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event DeedRegistred(address by, uint256 tokenId);

    constructor() ERC721("BlackRepository", "BREP"){ }

    function registerDeed(string memory tokenURI) public returns(uint256) {
        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit DeedRegistred(msg.sender, newItemId);

        return newItemId;
    }

    //function _baseURI() internal pure override returns (string memory) {
    //    return "https://ipfs.io/ipfs/QmUWWYt3udWXGZ3v7kefA3CHrHWVVLuwVPUe9kWzkpHBKs?filename=apocalypse.json";
    //}
}