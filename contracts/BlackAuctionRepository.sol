// SPDX-License-Identifier: MIT
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
    // Mapping from owner to a list of owned auctions
    mapping(address => uint[]) public auctionOwner;

    // Bid struct to hold bidder and amount
    struct Bid {
        address payable from;
        uint256 amount;
    }

    // Auction struct which holds all the required info
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

    event BidSuccess(address _from, uint _auctionId);

    // AuctionCreated is fired when an auction is created
    event AuctionCreated(address _owner, uint _auctionId);

    // AuctionCanceled is fired when an auction is canceled
    event AuctionCanceled(address _owner, uint _auctionId);

    // AuctionFinalized is fired when an auction is finalized
    event AuctionFinalized(address _owner, uint _auctionId);

    /**
    * @dev Guarantees msg.sender is owner of the given auction
    * @param auctionId uint ID of the auction to validate its ownership belongs to msg.sender
    */
    modifier isOwner(uint auctionId) {
        require(auctions[auctionId].owner == msg.sender, "REPO: the sender is not owner of the given action");
        _;
    }

    /**
    * @dev Guarantees this contract is owner of the given deed/token
    * @param deedRepositoryAddress address of the deed repository to validate from
    * @param deedId uint256 ID of the deed which has been registered in the deed repository
    */
    modifier contractIsDeedOwner(address deedRepositoryAddress, uint256 deedId) {
        address deedOwner = BlackDeedRepository(deedRepositoryAddress).ownerOf(deedId);
        require(deedOwner == address(this), "REPO: this contract is not owner of the given deed/token");
        _;
    }

    /**
    * @dev Disallow payments to this contract directly
    */
    fallback()  external {
        revert("REPO: payments to this contract directly are not allowed");
    }

    /**
    * @dev Gets the length of auctions
    * @return uint representing the auction count
    */
    function getCount() public view returns(uint) {
        return auctions.length;
    }

    /**
    * @dev Gets the bid counts of a given auction
    * @param auctionId uint ID of the auction
    */
    function getBidsCount(uint auctionId) public view returns(uint) {
        return auctionBids[auctionId].length;
    }

    /**
    * @dev Gets an array of owned auctions
    * @param owner address of the auction owner
    */
    function getAuctionsOf(address owner) public view returns(uint[] memory) {
        uint[] memory ownedAuctions = auctionOwner[owner];
        return ownedAuctions;
    }

    /**
    * @dev Gets an array of owned auctions
    * @param auctionId uint of the auction owner
    * @return amount uint256, address of last bidder
    */
    function getCurrentBid(uint auctionId) public view returns(uint256, address) {
        uint bidsLength = auctionBids[auctionId].length;
        // if there are bids refund the last bid
        if( bidsLength > 0 ) {
            Bid memory lastBid = auctionBids[auctionId][bidsLength - 1];
            return (lastBid.amount, lastBid.from);
        }
        return (uint256(0), address(0));
    }

    /**
    * @dev Gets the total number of auctions owned by an address
    * @param owner address of the owner
    * @return uint total number of auctions
    */
    function getAuctionsCountOfOwner(address owner) public view returns(uint) {
        return auctionOwner[owner].length;
    }

    /**
    * @dev Gets the info of a given auction which are stored within a struct
    * @param auctionId uint ID of the auction
    * string name of the auction
    * uint256 timestamp of the auction in which it expires
    * uint256 starting price of the auction
    * string representing the metadata of the auction
    * uint256 ID of the deed registered in DeedRepository
    * address Address of the DeedRepository
    * address owner of the auction
    * bool whether the auction is active
    * bool whether the auction is finalized
    */
    function getAuctionById(uint auctionId) public view returns(
        string memory name,
        uint256 blockDeadline,
        uint256 startPrice,
        string memory metadata,
        uint256 deedId,
        address deedRepositoryAddress,
        address owner,
        bool active,
        bool finalized) {

        Auction memory auc = auctions[auctionId];
        return (
            auc.name, 
            auc.blockDeadline, 
            auc.startPrice, 
            auc.metadata, 
            auc.deedId, 
            auc.deedRepositoryAddress, 
            auc.owner, 
            auc.active, 
            auc.finalized);
    }

    /**
    * @dev Creates an auction with the given informatin
    * @param deedRepositoryAddress address of the DeedRepository contract
    * @param deedId uint256 of the deed registered in DeedRepository
    * @param auctionTitle string containing auction title
    * @param metadata string containing auction metadata 
    * @param startPrice uint256 starting price of the auction
    * @param blockDeadline uint is the timestamp in which the auction expires
    * @return bool whether the auction is created
    */
    function createAuction(address deedRepositoryAddress, uint256 deedId, string memory auctionTitle, string memory metadata, uint256 startPrice, uint blockDeadline) public contractIsDeedOwner(deedRepositoryAddress, deedId) returns(bool) {
        uint auctionId = auctions.length;
        Auction memory newAuction;
        newAuction.name = auctionTitle;
        newAuction.blockDeadline = blockDeadline;
        newAuction.startPrice = startPrice;
        newAuction.metadata = metadata;
        newAuction.deedId = deedId;
        newAuction.deedRepositoryAddress = deedRepositoryAddress;
        newAuction.owner = payable(msg.sender);
        newAuction.active = true;
        newAuction.finalized = false;
        
        auctions.push(newAuction);        
        auctionOwner[msg.sender].push(auctionId);
        
        emit AuctionCreated(msg.sender, auctionId);
        return true;
    }

    function approveAndTransfer(address from, address to, address deedRepositoryAddress, uint256 deedId) internal returns(bool) {
        BlackDeedRepository remoteContract = BlackDeedRepository(deedRepositoryAddress);
        remoteContract.approve(to, deedId);
        remoteContract.transferFrom(from, to, deedId);
        return true;
    }

    /**
    * @dev Cancels an ongoing auction by the owner
    * @dev Deed is transfered back to the auction owner
    * @dev Bidder is refunded with the initial amount
    * @param auctionId uint ID of the created auction
    */
    function cancelAuction(uint auctionId) public isOwner(auctionId) {
        Auction memory myAuction = auctions[auctionId];
        uint bidsLength = auctionBids[auctionId].length;

        // if there are bids refund the last bid
        if( bidsLength > 0 ) {
            Bid memory lastBid = auctionBids[auctionId][bidsLength - 1];
            if(!lastBid.from.send(lastBid.amount)) {
                revert("REPO: Err on refund the last bidder");
            }
        }

        // approve and transfer from this contract to auction owner
        if(approveAndTransfer(address(this), myAuction.owner, myAuction.deedRepositoryAddress, myAuction.deedId)){
            auctions[auctionId].active = false;
            emit AuctionCanceled(msg.sender, auctionId);
        }
    }

    /**
    auction not ended
     */

    /**
    * @dev Finalized an ended auction
    * @dev The auction should be ended, and there should be at least one bid
    * @dev On success Deed is transfered to bidder and auction owner gets the amount
    * @param auctionId uint ID of the created auction
    */
    function finalizeAuction(uint auctionId) public {
        Auction memory myAuction = auctions[auctionId];
        uint bidsLength = auctionBids[auctionId].length;

        // 1. if auction not ended just revert
        if( block.timestamp < myAuction.blockDeadline ) revert("REPO: auction not ended");
        
        // if there are no bids cancel
        if(bidsLength == 0) {
            cancelAuction(auctionId);
        }else{

            // 2. the money goes to the auction owner
            Bid memory lastBid = auctionBids[auctionId][bidsLength - 1];
            if(!myAuction.owner.send(lastBid.amount)) {
                revert("REPO: Err on sending money to the auction owner");
            }

            // approve and transfer from this contract to the bid winner 
            if(approveAndTransfer(address(this), lastBid.from, myAuction.deedRepositoryAddress, myAuction.deedId)){
                auctions[auctionId].active = false;
                auctions[auctionId].finalized = true;
                emit AuctionFinalized(msg.sender, auctionId);
            }
        }
    }

    /**
    * @dev Bidder sends bid on an auction
    * @dev Auction should be active and not ended
    * @dev Refund previous bidder if a new bid is valid and placed.
    * @param auctionId uint ID of the created auction
    */
    function bidOnAuction(uint auctionId) external payable {
        uint256 ethAmountSent = msg.value;

        // owner can't bid on their auctions
        Auction memory myAuction = auctions[auctionId];
        if(myAuction.owner == msg.sender) revert("REPO: owner can't bid on their auctions");

        // if auction is expired
        if(block.timestamp > myAuction.blockDeadline ) revert("REPO: auction is expired");

        uint bidsLength = auctionBids[auctionId].length;
        uint256 tempAmount = myAuction.startPrice;
        Bid memory lastBid;

        // there are previous bids
        if( bidsLength > 0 ) {
            lastBid = auctionBids[auctionId][bidsLength - 1];
            tempAmount = lastBid.amount;
        }

        // check if amound is greater than previous amount  
        if( ethAmountSent < tempAmount ) revert("REPO: amound is smaller than previous amount"); 

        // refund the last bidder
        if( bidsLength > 0 ) {
            if(!lastBid.from.send(lastBid.amount)) {
                revert("REPO: Err on refund the last bidder");
            }  
        }

        // insert bid 
        Bid memory newBid;
        newBid.from = payable(msg.sender);
        newBid.amount = ethAmountSent;
        auctionBids[auctionId].push(newBid);
        emit BidSuccess(msg.sender, auctionId);
    }
}