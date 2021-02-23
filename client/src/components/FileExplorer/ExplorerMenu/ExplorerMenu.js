import { React, useEffect, useState } from 'react';
import FileComponent from '../FileComponent/FileComponent';
import Modal from '../../Modal/Modal'
import axios from 'axios'
import './ExplorerMenu.css'
import DragAndDrop from '../../DragAndDrop/DragAndDrop';
import CreateFolder from './CreateFolder/CreateFolder'

const ExplorerMenu = () => {

    const [fileList, setFileList] = useState([]);
    const [currentDirectoryPath, setCurrentDirectoryPath] = useState('/');
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        if (currentDirectoryPath === '/') {
            axios.get('/rootDirectory')
                .then((res) => {
                    setFileList(res.data);
                })
                .catch(() => {
                    console.log('error while fetching files list');
                });
        }
        else {
            axios.post('/changePath', { path: currentDirectoryPath })
                .then(res => {
                    setFileList(res.data);
                })
                .catch(() => {
                    console.log('error while fetching files list');
                });
        }
    }, [currentDirectoryPath])

    //CreateFolder
    const createFolder = folderName => {
        axios.post('/createFolder', { name: folderName })
            .then(res => {
                setFileList(res.data);
            })
            .catch(() => {
                console.log('error while fetching files list');
            });
    }

    const changePath = (name, type) => {
        if (type === 2) {
            setCurrentDirectoryPath(currentDirectoryPath + '/' + name)
        }
        else {
            alert('Need to implement Download function');
        }
    }

    const goBack = () => {
        const p = (currentDirectoryPath.slice(0, currentDirectoryPath.lastIndexOf('/')));
        if (p !== '') {
            axios.post('/changePath', { path: p })
                .then(res => {
                    setFileList(res.data);
                })
                .catch(() => {
                    console.log('error while going back');
                });
            setCurrentDirectoryPath(currentDirectoryPath.slice(0, currentDirectoryPath.lastIndexOf('/')))
        }
        else {
            alert('nope nope')
        }
    }

    const handleDrop = files => {
        // Implement upload function

        for (let i = 0; i < files.length; i++) {

        }
    }

    const closeModal = () => {
        setModalState(false);
    }

    return (
        <div className="explorer-main-menu">
            <div className="explorer-title">
                <h1 className="dashboard-copy poppins-bold-black-27-3px">File Explorer</h1>
                <div className="overlap-group2">
                    <img
                        alt="magnifier"
                        className="oval-9"
                        src="/images/icons/Magnifier.svg"
                    />
                    {/* <img
                        className="path-6"
                        src="/images/icons/Magnifier.svg"
                    /> */}
                </div>
            </div>
            <div className="directory-path">
                <div className="overlap-group-1">
                    <div className="rectangle-9"></div>
                    <div className="rectangle-10"></div>
                    <div className="rectangle-5-copy"></div>
                </div>
                <p className="text-1 valign-text-middle poppins-medium-black-14px">
                    {currentDirectoryPath === '/' ? 'Internal Storage >' : currentDirectoryPath.slice(2).replaceAll('/', ' > ')}</p>
                <span class="goBack">
                    <img alt="goBack" onClick={() => goBack()}
                        class="goBackImg" src="/images/icons/goBack.svg"></img>
                </span>

                {/* Modal */}
                <Modal
                    show={modalState}
                    modalClosed={closeModal}
                    color="#fff">
                    <CreateFolder
                        closeHandler={closeModal}
                        path={currentDirectoryPath} />
                </Modal>

                <div className="frame-1">
                    <div className="overlap-group">
                        <div className="rectangle-1 bizarre-border-1px"></div>
                        <div className="rectangle-1 bizarre-border-1px"></div>
                        <div className="create-folder valign-text-middle poppins-light-black-14px"
                            onClick={() => setModalState(true)} >
                            Create Folder
                        </div>
                        <img
                            alt="addFolder"
                            className="icons8-add-older-50-1"
                            src="/images/icons/addFolder.svg"
                        />
                    </div>
                </div>
            </div>
            <div className="explorer-header">
                <div className="place valign-text-middle poppins-light-black-14px">Name</div>
                <div className="explorer-last-modified valign-text-middle poppins-light-black-14px">Last Modified</div>
                <div className="size valign-text-middle poppins-light-black-14px">Size</div>
            </div>

            <DragAndDrop handleDrop={handleDrop}>
                <div className="explorer-data">
                    {fileList.length ? fileList.map((item, index) => {
                        return <FileComponent key={index}
                            onClick={() => changePath(item.name, item.type)}
                            name={item.name}
                            type={item.type}
                            size={item.size}
                            lastMod={item.modifiedAt} />
                    }) : null}
                    {/* Add lottie animation if no files are present */}
                </div>
            </DragAndDrop>

        </div>

    )
}

export default ExplorerMenu;