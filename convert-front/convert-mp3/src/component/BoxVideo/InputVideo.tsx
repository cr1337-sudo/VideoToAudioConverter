import React, { useRef, useState, ChangeEvent } from 'react';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import './InputVideo.css';

import { ListItemIcon } from '@mui/material';

interface DropFileInputProps {
    onFileChange: (fileList: File[]) => void;
}

function bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
}

const DropFileInput: React.FC<DropFileInputProps> = (props) => {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

  // ...

const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];

    if (newFile && isVideoFile(newFile)) {
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }
}

const isVideoFile = (file: File) => {
    return file.type.startsWith('video/');
}

// ...


    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        const index = updatedList.indexOf(file);
        if (index !== -1) {
            updatedList.splice(index, 1);
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <ListItemIcon >
                        <CloudUploadIcon />
                    </ListItemIcon>
                    <p>Drag & Drop your videos here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to convert
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <ListItemIcon>
                                    <VideoFileIcon/>
                                    </ListItemIcon>
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p style={{paddingLeft: '5px'}}>{bytesToMB(item.size).toFixed(2)}MB</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}><ClearIcon/></span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired,
}

export default DropFileInput;
