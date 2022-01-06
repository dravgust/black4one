import React from "react";
import DefaultLayout from "../components/layouts/DefaultLayout";
import FileStorageForm from "../components/BlackAuction/FileStorageForm";
import StarRating from "../components/Rating/StarRating";

const FileStorage = () => {
    return (
        <DefaultLayout>
            <FileStorageForm />
            <StarRating totalStars={5} />
        </DefaultLayout>
    );
}
export default FileStorage;