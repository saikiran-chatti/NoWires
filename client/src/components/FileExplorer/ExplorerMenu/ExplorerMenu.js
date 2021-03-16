import { React, useEffect, useState } from 'react';
import FileComponent from '../FileComponent/FileComponent';
import Modal from '../../Modal/Modal'
import axios from 'axios'
import './ExplorerMenu.css'
import DragAndDrop from '../../DragAndDrop/DragAndDrop';
import CreateFolder from './CreateFolder/CreateFolder'
import { Menu, Item, useContextMenu } from "react-contexify";

import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "menu-id";

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

        axios.post('/createFolder', { name: folderName, path: currentDirectoryPath })
            .then(res => {
                setFileList(res.data);
            })
            .catch(() => {
                console.log('error while fetching files list');
            });
    }

    const changePath = (name, type) => {
        if (type === 2) {
            setCurrentDirectoryPath(currentDirectoryPath + '/' + name) // works for ftp-server app
            // setCurrentDirectoryPath(currentDirectoryPath + name) 
        }
        else {
            // Download file function..
            axios.post('/downloadFile', { path: currentDirectoryPath, name: name })
                .then(res => {
                    alert(res.data + ' Implement a download progress bar');
                })
                .catch(() => {
                    console.log('error while going back');
                });
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

    const getCodedBuffer = file => {
        return new Promise(function (resolve, reject) {
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = function (ev) {
                const array = new Uint8Array(ev.target.result);
                // const fileByteArray = [];
                let codedBuffer = '';

                for (let i = 0; i < array.length; i++) {
                    // fileByteArray.push(array[i]);
                    codedBuffer += String.fromCharCode(array[i]);
                }
                resolve(codedBuffer);  // successful
            }
            fileReader.onerror = reject; // call reject if error
        })
    }

    const handleDrop = files => {
        // Implement upload function

        for (let i = 0; i < files.length; i++) {
            getCodedBuffer(files[i]).then(result => {
                axios.post('/handleDrop', { value: result, fileName: files[i].name, path: currentDirectoryPath })
                    .then(res => {
                        setFileList(res.data);
                        alert('Uploaded. Implement an upload progress bar!!')
                    })
                    .catch(err => {
                        alert('error occured while uploading')
                    });
            })
        }
    }

    const closeModal = () => {
        setModalState(false);
    }

    const { show } = useContextMenu({
        id: MENU_ID,
    });

    const handleItemClick = ({ event, props, triggerEvent, data }) => {
        console.log(event, props, triggerEvent, data);

        let fileName = props.id.slice(0, -1);
        let fileType = props.id.charAt(fileName.length);

        switch (event.currentTarget.id) {
            case "rename":
                // logic to remove the row
                console.log(props.id + " " + fileName + " " + "rename"); // contain to item.id passed by `show`
                break;

            case "delete":
                console.log(props.id + " delete " + fileType);


                let deletePath = currentDirectoryPath + '/' + fileName
                console.log(deletePath);

                if (fileType === "2") {
                    // Delete a directory
                    console.log('deleting a folder');
                    axios.post('/deleteDir', { path: currentDirectoryPath, fileName: fileName })
                        .then(res => {
                            setFileList(res.data);
                        })
                        .catch(() => {
                            console.log('error while deleting file');
                        });
                }
                else {
                    // Delete a file
                    console.log('deleting a file');
                    axios.post('/deleteFile', { path: currentDirectoryPath, fileName: fileName })
                        .then(res => {
                            setFileList(res.data);
                        })
                        .catch(() => {
                            console.log('error while deleting file');
                        });
                }
                break;

            case "download":
                console.log(fileType + " download");
                // downloading a file.. 

                if (fileType === "2") {
                    console.log('downloading a folder');
                   
                    axios.post('/downloadDirectory', { path: currentDirectoryPath, name: fileName })
                        .then(res => {
                            alert(res.data + ' Implement a download progress bar');
                        })
                        .catch(() => {
                            console.log('error while going back');
                        });
                }
                else {
                    // downloading a file
                    console.log('downloading a File');
                    axios.post('/downloadFile', { path: currentDirectoryPath, name: fileName })
                        .then(res => {
                            alert(res.data + ' Implement a download progress bar');
                        })
                        .catch(() => {
                            console.log('error while going back');
                        });
                }
                break;
            default:
                break;
        }
    }

    const displayMenu = (e) => {
        // put whatever custom logic you need
        // you can even decide to not display the Menu
        console.log('reaching displayMenu (e)');
        show(e, { props: { id: e.currentTarget.id } });
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
                <span className="goBack">
                    <img alt="goBack" onClick={() => goBack()}
                        className="goBackImg" src="/images/icons/goBack.svg"></img>
                </span>
                {/* 
                <span className="upload">
                    <input type="file" name="u" />
                </span> */}
                {/* Modal */}
                <Modal
                    show={modalState}
                    modalClosed={closeModal}
                    color="#fff">
                    <CreateFolder
                        create={(folderName) => createFolder(folderName)}
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
                        return (
                            <FileComponent key={index}
                                id={item.name + item.type}
                                onContextMenu={(e) => displayMenu(e)}
                                onClick={() => changePath(item.name, item.type)}
                                name={item.name}
                                type={item.type}
                                size={item.size}
                                lastMod={item.modifiedAt} />
                        )
                    }) : null}
                    <Menu id={MENU_ID}>
                        <Item id="rename" onClick={handleItemClick}>
                            Rename
                        </Item>
                        <Item id="delete" onClick={handleItemClick}>
                            Delete
                        </Item>
                        <Item id="download" onClick={handleItemClick}>
                            Download
                        </Item>
                    </Menu>
                </div>
                {/* Add lottie animation if no files are present */}
            </DragAndDrop>
        </div>

    )
}

export default ExplorerMenu;