import React, { useEffect } from "react";
import { useIterator } from "../hooks/useIterator";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RepoMenu({
    repositories,
    onSelect = (f:any) => f
}: any) {
    const [{name}, previous, next] = useIterator(repositories);

    useEffect(() => {
        if(!name) return;
        onSelect(name);
    }, [name]);

    return(
        <div style={{display: "flex"}}>
            <button onClick={previous}>&lt;</button>
            <p>{name}</p>
            <button onClick={next}>&gt;</button>
        </div>
    )
}