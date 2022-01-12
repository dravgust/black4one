import React from "react";
import TokenRepositories from "./TokenRepositories";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TokenDetails({ data }: any) {
    return (
        <div>
            <img src={data.image} alt={data.name} style={{ height: 64 }} />
            <div>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
            </div>
            <TokenRepositories
                tokenURI={data.src}
                onSelect={(repoName: string) => console.log(`${repoName} selected`)}
            />
        </div>
    )
}