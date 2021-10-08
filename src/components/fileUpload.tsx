import React, { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import Button from 'react-bootstrap/Button';
import { items } from '../store/items';
import { http } from '../http/http';

interface Props {
}

export const FileUpload = (props: Props) => {
    const [file, setFile] = useState('');
    const selectFile = (e: any) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }
    const onClick = () => {
        const formData = new FormData();
        if (file) {
            formData.append(
                "file",
                file,
                "input_file"
            );
        let payload={
            file:formData,
            onSuccess:()=>console.log('File Uploaded'),
            onFailure:()=>console.log('File not Uploaded')
        }
        http.uploadFile('fileUpload',payload)
        }

        // return;
    }

    return (
        <div style={{ padding: 5 }}>
            <form encType='multipart/form-data'>
                <input type="file" name="file" onChange={selectFile} />
                <Button onClick={onClick} >
                    Save file
                </Button>
            </form>
        </div>

    )

}