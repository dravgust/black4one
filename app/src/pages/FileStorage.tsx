import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import FileStorageForm from "../components/BlackAuction/FileStorageForm";
import StarRating from "../components/Rating/StarRating";
import { useFaker } from "react-fakers"
import { FixedSizeList, } from "react-window"

/* eslint-disable @typescript-eslint/no-explicit-any */
const FileStorage = () => {
    return (
        <DefaultLayout>
            <FileStorageForm />
            <StarRating totalStars={5} />
            <PersoneList />
        </DefaultLayout>
    );
}
export default FileStorage;

const PersoneList = () => {

    const { success: bigList, error, loading } = useFaker({ type: 'persons', params: { persons: { quantity: 2000 } } as any })

    if (error) {
        alert((error as any).message)
    }


    const renderRow = ({ index, style }: any) => (
        <div style={{ ...style, ...{ display: "flex" } }}>
            <img
                src={bigList[index].image}
                alt={bigList[index].firstName}
                width={50}
            />
            <p>
                {bigList[index].firstname} {bigList[index].lastname} — {bigList[index].email}
            </p>
        </div>
    );

    return (
        <div style={{ paddingTop: "20px" }}>
            {!loading && <h4>Loading....</h4>}
            {loading &&
                <FixedSizeList height={500} width={"auto"} itemCount={bigList.length} itemSize={50}>
                    {renderRow}
                </FixedSizeList>
            }
        </div>
    )
}
