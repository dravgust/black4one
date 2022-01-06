import React, { useState } from "react";
import { FaStar } from "react-icons/fa"
import { createArray } from "../../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Star = ({ selected = false, onSelect = (f: any) => f }) => (
    <FaStar style={{display: "inline-block"}} color={selected ? "red" : "grey"} onClick={onSelect} />
)

export default function StarRating({ style = {}, totalStars = 5, ...props }) {
    const [selectedStars, setSelectedStars] = useState(0)
    return (
        <div style={{padding: "5px", ...style}} {...props}>
            {createArray(totalStars).map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => setSelectedStars(i + 1)}
                />
            ))}
            <p>
                {selectedStars} of {totalStars} stars
            </p>
        </div>
    )
}