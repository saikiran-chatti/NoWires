import { React, useEffect, useState } from 'react';
import FileComponent from '../FileComponent/FileComponent';
import Modal from '../../Modal/Modal'
import axios from 'axios'
import './ExplorerMenu.css'
import DragAndDrop from '../../DragAndDrop/DragAndDrop';
import CreateFolder from './CreateFolder/CreateFolder'
import { useSelector, useDispatch } from 'react-redux'
import DownloadPopup from './DownloadPopup/DownloadPopup'

// import { Menu, Item, useContextMenu } from "react-contexify";
import {
    MenuItem,
    ControlledMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import Snackbar from './Snackbar/Snackbar';
import NoFiles from '../../NoFiles/NoFiles';

// const MENU_ID = "menu-id";

const ExplorerMenu = () => {

    // fetching the ftp details
    const connectionDetails = useSelector(state => state != null ? state.connectionDetails : null);

    const [fileList, setFileList] = useState([]);
    const [currentDirectoryPath, setCurrentDirectoryPath] = useState('/');
    const [modalState, setModalState] = useState(false);
    const [renameModalState, setRenameModalState] = useState(false);
    const [transferModalState, setTransferModalState] = useState(false);
    const [transferItemDetails, setTransferItemDetails] = useState({ fileName: "filename", fileType: 1, fileSize: "200 Mb", transferType: "download" });

    // used for menu's.
    // const [menuProp, setMenuProp] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [itemDataa, setItemDataa] = useState({ fileName: "fileName", fileType: 1, fileSize: "230 Mb" })

    // File transfer 
    const [transferPercent, setTransferPercent] = useState(0);
    const [files, setFiles] = useState(() => []);
    // const [downloadFile, downloaderComponentUI] = useFileDownloader();
    const [downloaderComponentUI, setDownloaderComponentUI] = useState(true);
    const [snackbarStatus, setSnackbarStatus] = useState(false)

    useEffect(() => {
        if (currentDirectoryPath === '/') {
            console.log(connectionDetails);
            axios.post('/rootDirectory', { connectionDetails: connectionDetails })
                .then((res) => {
                    setFileList(res.data);
                })
                .catch((e) => {
                    console.log('error while fetching files list ' + e);
                });
        }
        else {
            axios.post('/changePath', { path: currentDirectoryPath, connectionDetails: connectionDetails })
                .then(res => {
                    setFileList(res.data);
                })
                .catch((e) => {
                    console.log('error while fetching files list ' + e);
                });
        }
    }, [currentDirectoryPath])

    //CreateFolder
    const createFolder = folderName => {

        axios.post('/createFolder', { name: folderName, path: currentDirectoryPath, connectionDetails: connectionDetails })
            .then(res => {
                setFileList(res.data);
            })
            .catch((e) => {
                console.log('error while fetching files list ' + e);
            });
    }

    const renameItem = newName => {
        // let oldName = itemData.slice(0, -1);
        let oldName = itemDataa.fileName;
        let ext = oldName.split('.').pop();

        newName = newName + '.' + ext;

        axios.post('/renameFile', { oldName: oldName, path: currentDirectoryPath, newName: newName, connectionDetails: connectionDetails })
            .then(res => {
                setFileList(res.data);
            })
            .catch((e) => {
                console.log('error while renaming file ' + e);
            })
    }

    const changePath = (name, type, size) => {
        setTransferItemDetails({ fileSize: size, fileType: type, fileName: name, transferType: "download" });
        if (type === 2) {
            setCurrentDirectoryPath(currentDirectoryPath + '/' + name) // works for ftp-server app
            // setCurrentDirectoryPath(currentDirectoryPath + name) 
        }
        else {

            // file name without extension = filename.split('.').slice(0, -1).join('.')

            // const file = {
            //     name: name,
            //     // name: "photo-1",
            //     thumb:
            //         "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=427&q=80 427w",
            //     file:
            //         "https://images.unsplash.com/photo-1604263439201-171fb8c0fddc?rnd=" +
            //         Math.random(),

            //     filename: name,
            //     // filename: "photo-1.jpg",
            //     currentDirectoryPath: currentDirectoryPath,
            //     connectionDetails: connectionDetails
            // };

            // downloadFile(file)

            // Download file function..
            setTransferModalState(true);
            setDownloaderComponentUI(true);

            console.log("Before download " + downloaderComponentUI);

            axios.post('/downloadFile', { path: currentDirectoryPath, name: name, connectionDetails: connectionDetails })
                .then(res => {
                    console.log("After download: " + downloaderComponentUI);
                    setDownloaderComponentUI(false)
                    setTransferModalState(false);
                    setSnackbarStatus(true);
                    // alert(res.data + ' Implement a download progress bar');
                })
                .catch((e) => {
                    console.log('error while going back ' + e);
                });
            // }
        }
    }

    const goBack = () => {
        const p = (currentDirectoryPath.slice(0, currentDirectoryPath.lastIndexOf('/')));
        if (p !== '') {
            axios.post('/changePath', { path: p, connectionDetails: connectionDetails })
                .then(res => {
                    setFileList(res.data);
                })
                .catch((e) => {
                    console.log('error while going back ' + e);
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
        setTransferModalState(true);

        for (let i = 0; i < files.length; i++) {

            let fileType = "Folder";
            let fileSize = files[i].size

            if (files[i].isFile) {
                fileType = 1;
                fileSize = files[i].size;
                console.log("file size: " + files[i].size);
            }

            setTransferItemDetails({
                fileName: files[i].name,
                fileType: fileType,
                fileSize: fileSize,
                transferType: "upload"
            })

            getCodedBuffer(files[i]).then(result => {
                axios.post('/handleDrop', { value: result, fileName: files[i].name, path: currentDirectoryPath, connectionDetails: connectionDetails })
                    .then(res => {
                        setTransferModalState(false);
                        setFileList(res.data);
                        setSnackbarStatus(true);
                    })
                    .catch(err => {
                        alert('error occured while uploading ' + err)
                    });
            })
        }
    }

    const closeModal = () => {
        setModalState(false);
    }

    const closeSnackbar = () => {
        setSnackbarStatus(false);
    }
    const closeRenameModal = () => {
        setRenameModalState(false);
    }

    const closeTransferModal = () => {
        setTransferModalState(false);
    }

    // const { show } = useContextMenu({
    //     id: MENU_ID,
    // });

    // const handleItemClick = ({ event, props, triggerEvent, data }) => {
    //     console.log(event, props, triggerEvent, data);

    //     let fileName = props.id.slice(0, -1);
    //     let fileType = props.id.charAt(fileName.length);

    //     switch (event.currentTarget.id) {
    //         case "rename":
    //             // logic to remove the row
    //             console.log(props.id + " " + fileName + " " + "rename"); // contain to item.id passed by `show`
    //             break;

    //         case "delete":
    //             console.log(props.id + " delete " + fileType);


    //             let deletePath = currentDirectoryPath + '/' + fileName
    //             console.log(deletePath);

    //             if (fileType === "2") {
    //                 // Delete a directory
    //                 console.log('deleting a folder');
    //                 axios.post('/deleteDir', { path: currentDirectoryPath, fileName: fileName })
    //                     .then(res => {
    //                         setFileList(res.data);
    //                     })
    //                     .catch(() => {
    //                         console.log('error while deleting file');
    //                     });
    //             }
    //             else {
    //                 // Delete a file
    //                 console.log('deleting a file');
    //                 axios.post('/deleteFile', { path: currentDirectoryPath, fileName: fileName })
    //                     .then(res => {
    //                         setFileList(res.data);
    //                     })
    //                     .catch(() => {
    //                         console.log('error while deleting file');
    //                     });
    //             }
    //             break;

    //         case "download":
    //             console.log(fileType + " download");
    //             // downloading a file.. 

    //             if (fileType === "2") {
    //                 console.log('downloading a folder');

    //                 axios.post('/downloadDirectory', { path: currentDirectoryPath, name: fileName })
    //                     .then(res => {
    //                         alert(res.data + ' Implement a download progress bar');
    //                     })
    //                     .catch(() => {
    //                         console.log('error while going back');
    //                     });
    //             }
    //             else {
    //                 // downloading a file
    //                 console.log('downloading a File');
    //                 axios.post('/downloadFile', { path: currentDirectoryPath, name: fileName })
    //                     .then(res => {
    //                         alert(res.data + ' Implement a download progress bar');
    //                     })
    //                     .catch(() => {
    //                         console.log('error while going back');
    //                     });
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }


    const handleItemClick = e => {

        let fileName = itemDataa.fileName;
        let fileType = itemDataa.fileType;
        let fileSize = itemDataa.fileSize;

        switch (e.value) {
            case "rename":
                // logic to remove the row
                console.log(fileName + " " + "rename"); // contain to item.id passed by `show`
                setRenameModalState(true);
                break;

            case "delete":
                console.log(" delete " + fileType);


                let deletePath = currentDirectoryPath + '/' + fileName
                console.log(deletePath);

                if (fileType === "2") {
                    // Delete a directory
                    console.log('deleting a folder');
                    axios.post('/deleteDir', { path: currentDirectoryPath, fileName: fileName, connectionDetails: connectionDetails })
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
                    axios.post('/deleteFile', { path: currentDirectoryPath, fileName: fileName, connectionDetails: connectionDetails })
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
                setTransferItemDetails({ fileSize: fileSize, fileType: fileType, fileName: fileName, transferType: "download" });

                if (fileType === 2) {
                    console.log('downloading a folder');

                    setTransferModalState(true);
                    setDownloaderComponentUI(
                        true);

                    axios.post('/downloadDirectory', { path: currentDirectoryPath, name: fileName, connectionDetails: connectionDetails })
                        .then(res => {
                            setDownloaderComponentUI(false)
                            setTransferModalState(false);
                            setSnackbarStatus(true);
                            // alert(res.data + ' Implement a download progress bar');
                        })
                        .catch(() => {
                            console.log('error while going back');
                        });
                }
                else {
                    // downloading a file
                    setTransferModalState(true);
                    setDownloaderComponentUI(
                        true);

                    console.log("Before download " + downloaderComponentUI);

                    axios.post('/downloadFile', { path: currentDirectoryPath, name: fileName, connectionDetails: connectionDetails })
                        .then(res => {
                            console.log("After download: " + downloaderComponentUI);
                            setDownloaderComponentUI(false)
                            setTransferModalState(false);
                            setSnackbarStatus(true);
                            // alert(res.data + ' Implement a download progress bar');
                        })
                        .catch((e) => {
                            console.log('error while going back ' + e);
                        });
                }
                break;
            default:
                break;
        }
    }



    // const displayMenu = (e) => {
    //     // put whatever custom logic you need
    //     // you can even decide to not display the Menu
    //     console.log('reaching displayMenu (e)');
    //     show(e, { props: { id: e.currentTarget.id } });
    // }

    const displayMenu = (e, fileName, fileType, fileSize) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setOpen(true);
        setItemDataa({ fileName: fileName, fileType: fileType, fileSize: fileSize });
    };

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
                        placeholder="Enter folder name"
                        title="Create Folder"
                        action="Create"
                        create={(folderName) => createFolder(folderName)}
                        closeHandler={closeModal}
                        path={currentDirectoryPath} />
                </Modal>

                <div className="explorer-snackbar">
                    <Snackbar
                        text={transferItemDetails.transferType === "download" ? "Downloaded Successfully!  Check Desktop/NoWires" : "Uploaded Successfully! "}
                        handleSnackbarClose={closeSnackbar}
                        show={snackbarStatus} />
                </div>

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

            {/* popup for rename */}
            <Modal
                show={renameModalState}
                modalClosed={closeRenameModal}
                color="#fff">
                <CreateFolder
                    placeholder="Enter new name"
                    title={"Rename " + itemDataa.fileName}
                    create={(newName) => renameItem(newName)}
                    closeHandler={closeRenameModal}
                    action="Rename"
                    path={currentDirectoryPath + '/' + itemDataa.fileName} />
            </Modal>

            {/* popup for transfer progress */}
            <Modal
                show={transferModalState}
                // modalClosed={closeTransferModal}
                color="#fff">
                <DownloadPopup
                    placeholder={transferItemDetails.transferType}
                    name={transferItemDetails.fileName}
                    // create={(newName) => renameItem(newName)}
                    type={transferItemDetails.fileType}
                    closeHandler={closeTransferModal}
                    size={transferItemDetails.fileSize}
                    path={currentDirectoryPath + '/' + transferItemDetails.fileName.split('.').slice(0, -1).join('.')} />
            </Modal>

            {/* popup for upload progress */}
            {/* <Modal
                show={transferModalState}
                // modalClosed={closeTransferModal}
                color="#fff">
                <DownloadPopup
                    placeholder="Upload"
                    // name={transferItemDetails.fileName.split('.').slice(0, -1).join('.')}
                    name={transferItemDetails.fileName}
                    // create={(newName) => renameItem(newName)}
                    type={transferItemDetails.fileType}
                    closeHandler={closeTransferModal}
                    size={transferItemDetails.fileSize}
                    path={currentDirectoryPath + '/' + transferItemDetails.fileName.split('.').slice(0, -1).join('.')} />
            </Modal> */}

            <DragAndDrop handleDrop={handleDrop}>
                <div className="explorer-data">
                    {fileList.length > 0 ? fileList.map((item, index) => {
                        return (
                            <FileComponent key={index}
                                id={item.name + item.type}
                                onContextMenu={(e) => displayMenu(e, item.name, item.type, item.size)}
                                onClick={() => changePath(item.name, item.type, item.size)}
                                name={item.name}
                                type={item.type}
                                size={item.size}
                                lastMod={item.modifiedAt} />
                        )
                    }) : <div className="noFilesImage" >
                        <NoFiles />
                        <p>No Files</p>
                    </div>}

                    {/* <Menu id={MENU_ID}>
                        <Item id="rename" onClick={handleItemClick}>
                            Rename
                        </Item>
                        <Item id="delete" onClick={handleItemClick}>
                            Delete
                        </Item>
                        <Item id="download" onClick={handleItemClick}>
                            Download
                        </Item>
                    </Menu> */}

                    <ControlledMenu anchorPoint={anchorPoint} isOpen={isOpen}
                        onClose={() => setOpen(false)}>
                        <MenuItem value="rename" onClick={handleItemClick}>
                            Rename
                        </MenuItem>
                        <MenuItem value="delete" onClick={handleItemClick}>
                            Delete
                        </MenuItem>
                        <MenuItem value="download" onClick={handleItemClick}>
                            Download
                        </MenuItem>
                    </ControlledMenu>

                </div>
                {/* Add lottie animation if no files are present */}
            </DragAndDrop>
        </div>

    )
}

export default ExplorerMenu;