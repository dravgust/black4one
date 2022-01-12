import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React from "react";
import Fetch from "./Fetch";
import RepoMenu from "./RepoMenu";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TokenRepositories({
    tokenURI,
    selectedRepo,
    onSelect = (f: any) => f
}: any) {
    return (
        <Fetch
            uri={tokenURI}
            renderSuccess={({ data }: any) => (
                <RepoMenu
                    repositories={data}
                    selectedRepo={selectedRepo}
                    onSelect={onSelect}
                />
            )}
        />
    );
}