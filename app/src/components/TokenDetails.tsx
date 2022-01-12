import React from "react";
import TokenRepositories from "./TokenRepositories";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TokenDetails({ data }: any) {
    return (
        <div>
            {/*<img src={data.image} alt={data.name} style={{ width: 200 }} />*/}
            <div>
                <h1>{data.src}</h1>
                <p>{data.src}</p>
            </div>
            <TokenRepositories
                tokenURI={data.src}
                onSelect={(repoName: string) => console.log(`${repoName} selected`)}
            />
        </div>
    )
}