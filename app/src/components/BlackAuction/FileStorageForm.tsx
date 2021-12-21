import React, { useState } from "react";
import { create } from 'ipfs-http-client'
import styled from "styled-components";

const client = create({
    url: 'https://ipfs.infura.io:5001/api/v0'
})

const FileStorageForm = () => {

    const [urlArr, setUrlArr] = useState<Array<string>>([])
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {      
        e.preventDefault();
        if(file != null){
        try{
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setUrlArr(prev => [...prev, url])
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
    }

    const retrieveFile = (e: React.FormEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;
        if(files != null){
            const data = files[0];
            const reader = new FileReader();
            reader.readAsArrayBuffer(data);
        
            reader.onloadend = () => {
                setFile(data);
            };
        }

        e.preventDefault();
      };

    return (
        <>
             <FileMain>
                <form onSubmit={handleSubmit}>
                    <FileInput type="file" onChange={retrieveFile} />
                <FileSubmit type="submit">Submit</FileSubmit>
                </form>
             </FileMain>    
            <FileDisplay>
                {urlArr.length !== 0 
                ? urlArr.map((el) => <IMG key={el} src={el} width={"200px"} />) 
                : <H3>Upload data</H3>}
            </FileDisplay>
        </>
       
    )
}

export default FileStorageForm;

const FileMain = styled.div`
    font-size: 2rem;
`

const FileDisplay = styled.div`
    font-size: 2rem;
`
const H3 = styled.h3`
    color: #282c34;
    border-bottom: 4px solid blueviolet;
    width: max-content;
    margin: 0 auto;
`

const IMG = styled.img`
    margin: 0rem auto;
`

const FileInput = styled.input`
    padding: 0.3rem 1rem;
    border: 2px solid blueviolet;
    font-size: large;
`
const FileSubmit = styled.button`
    padding: 0.5rem;
    font-size: large;
    background-color: blueviolet;
    margin-left: 1rem;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    color: white;
`
