import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import FileStorageForm from "../components/BlackAuction/FileStorageForm";
import StarRating from "../components/Rating/StarRating";

import { useFaker } from "react-fakers"
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

    const { success, error, loading } = useFaker({ type: 'persons', params: { persons: { quantity: 500 } } as any })

    if (error) {
        alert((error as any).message)
    }


    const renderItem = (item: any) => (
        <div style={{ display: "flex" }}>
            <img src={item.image} alt={item.firstname} width={50} />
            <p>
                {item.firstname} {item.lastname} - {item.email}
            </p>
        </div>
    );

    return (
        <>
            {!loading && <h4>Loading....</h4>}
            {loading && <List loading={loading} data={success} renderItem={renderItem} renderEmpty={<p>This list is empty</p>} />}
        </>
    )
}

const List = ({ data = [], renderItem, renderEmpty }: any) => {

    return !data.length ? (
        renderEmpty
    ) : (
        <>
            <ul>
                {data.map((item: any, i: number) => (
                    <li key={i}>{renderItem(item)}</li>
                ))}
            </ul>
        </>
    )
}