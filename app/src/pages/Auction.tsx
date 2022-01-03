import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import TokenList from "../components/BlackAuction/TokenList";
import AuctionList from "../components/BlackAuction/AuctionList";

const Auction = () => {

    return (
        <DefaultLayout>
            <TokenList />
            <AuctionList />
        </DefaultLayout>
    );
}
export default Auction;