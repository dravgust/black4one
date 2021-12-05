// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ApocalypseDesign is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ApocalypseDesign", "ADN") {}
    //function _baseURI() internal pure override returns (string memory) {
    //    return "https://ipfs.io/ipfs/QmUWWYt3udWXGZ3v7kefA3CHrHWVVLuwVPUe9kWzkpHBKs?filename=apocalypse.json";
    //}

    //function mint(address to) public returns (uint256) {
    //    require(_tokenIdCounter.current() < 2);
    //    _tokenIdCounter.increment();
    //    _safeMint(to, _tokenIdCounter.current());

    //    return _tokenIdCounter.current();
    //}

    function awardItem(address player, string memory tokenURI) public returns (uint256)
    {
        _tokenIdCounter.increment();

        uint256 newItemId = _tokenIdCounter.current();
        _safeMint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
