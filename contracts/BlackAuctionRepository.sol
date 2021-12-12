// SPDF-Licens-Identifier: MIT
pragma solidity ^0.8.10;

import "./BlackDeedRepository.sol";

/**
 * @title Auction Repository
 * This contracts allows auctions to be created for non-fungible tokens
 * Moreover, it includes the basic functionalities of an auction house
 */
contract BlackAuctionRepository {

    // Array with all auctions
    Auction[] public auctions;
    // Mapping from auction index to user bids
    mapping(uint256 => Bid[]) public auctionBids;
    mapping(address => uint[]) public auctionOwner;

    struct Bid {
        address payable from;
        uint256 amount;
    }

    struct Auction {
        string name;
        uint256 blockDeadline;
        uint256 startPrice;
        string metadata;
        uint256 deedId;
        address deedRepositoryAddress;
        address payable owner;
        bool active;
        bool finalized;
    }

    modifier isOwner(uint auctionId_) {
        require(auctions[auctionId_].owner == msg.sender);
        _;
    }

    modifier contractIsDeedOwner(BlackDeedRepository deedRepository_, uint256 deedId_) {
        address deedOwner = deedRepository_.ownerOf(deedId_);
        require(deedOwner == address(this));
        _;
    }

    fallback()  external {
        revert();
    }

}