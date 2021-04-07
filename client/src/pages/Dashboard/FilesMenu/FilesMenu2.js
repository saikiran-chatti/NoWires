import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import './FilesMenu2.css'
import DragAndDrop from '../../../components/DragAndDrop/DragAndDrop'
import FileComponent from '../../../components/FileExplorer/FileComponent/FileComponent'
import NoFiles from '../../../Errors/NoFiles/NoFiles'
import axios from 'axios'
import Snackbar from '../../../components/Snackbar/Snackbar'
import Modal from '../../../components/Modal/Modal'
import DownloadPopup from '../../../components/FileExplorer/ExplorerMenu/DownloadPopup/DownloadPopup'
import CreateFolder from '../../../components/FileExplorer/ExplorerMenu/CreateFolder/CreateFolder'
import { useHistory } from "react-router-dom";
import SearchBar from '../../../components/FileExplorer/ExplorerMenu/SearchBar/SearchBar'

import {
    MenuItem,
    ControlledMenu
} from '@szhsin/react-menu';

const FilesMenu2 = () => {

    const connectionDetails = useSelector(state => state != null ? state.connectionDetails : null);

    const [fileList, setFileList] = useState([]);

    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [itemDataa, setItemDataa] = useState({ fileName: "fileName", fileType: 1, fileSize: "230 Mb" })

    const [currentDirectoryPath, setCurrentDirectoryPath] = useState('/Download');
    const [transferModalState, setTransferModalState] = useState(false);
    const [transferItemDetails, setTransferItemDetails] = useState({ fileName: "filename", fileType: 1, fileSize: "200 Mb", transferType: "download" });

    const [renameModalState, setRenameModalState] = useState(false);

    const [downloaderComponentUI, setDownloaderComponentUI] = useState(true);
    const [snackbarStatus, setSnackbarStatus] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    let storagePercent = (connectionDetails.usedSpace / connectionDetails.totalSize) * 100;

    useEffect(() => {
        axios.post('/changePath', { path: currentDirectoryPath, connectionDetails: connectionDetails })
            .then(res => {
                setFileList(res.data);
            })
            .catch((e) => {
                console.log('error while fetching files list ' + e);
            });
    }, [currentDirectoryPath])

    useEffect(() => {
        let results = [];
        if (fileList.length > 0) {
            fileList.map(jsFrameworksSearch => {
                if (jsFrameworksSearch.name.toLowerCase().includes(searchTerm.trim()))
                    results.push(jsFrameworksSearch)
            })
        }

        setSearchResults(results);
    }, [searchTerm, fileList])

    let history = useHistory();

    const changeRoute = (path) => {
        history.push(path);
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

    const closeRenameModal = () => {
        setRenameModalState(false);
    }

    const closeTransferModal = () => {
        setTransferModalState(false);
    }

    const closeSnackbar = () => {
        setSnackbarStatus(false);
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

    const displayMenu = (e, fileName, fileType, fileSize) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setOpen(true);
        setItemDataa({ fileName: fileName, fileType: fileType, fileSize: fileSize });
    };

    const updateSearchResult = async (input) => {
        // setSearchTerm(event.target.value)
        let results = [];
        if (fileList.length > 0) {
            fileList.map(jsFrameworksSearch => {
                if (jsFrameworksSearch.name.toLowerCase().includes(input.trim()))
                    results.push(jsFrameworksSearch)
            })
        }
        setSearchTerm(input)
        setSearchResults(results);
    }

    return (
        <div className="dashboard-screen">
            <h1 className="dashboard-copy poppins-bold-black-27-3px">Dashboard</h1>
            <div className="dashboard-storage-details">
                <div className="dashboard-overlap-group">
                    <div className="dashboard-overlap-group-header">
                        <img className="macos-folder-icon" src="/images/macos-folder-icon.png" />
                        <div className="internal-storage poppins-medium-black-14px">Internal Storage</div>
                    </div>
                    <div className="storage-progress">
                        <progress max="100" value={storagePercent}></progress>
                        <div className="storage-progress-count poppins-regular-black-12px">
                            {console.log(connectionDetails)}
                            <p>{connectionDetails.usedSpace + " GB"}</p>
                            <p>{connectionDetails.totalSize  + " GB"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="recently-used">
                <div className="dashboard-recently-used-title">
                    <div className="downloadsPath">
                        <div className="recently-used-1 poppins-medium-black-18px">
                            {currentDirectoryPath === '/Download' ? 'Downloads ' : currentDirectoryPath.slice(2).replaceAll('/', ' > ')}
                        </div>
                        {currentDirectoryPath != '/Download' ? <span className="goBack">
                            <img alt="goBack" onClick={() => goBack()}
                                className="goBackImg" src="/images/icons/goBack.svg"></img>
                        </span> : null}
                        {/* <span className="goBack">
                            <img alt="goBack" onClick={() => goBack()}
                                className="goBackImg" src="/images/icons/goBack.svg"></img>
                        </span> */}
                        <SearchBar input={searchTerm} onChange={updateSearchResult} />
                    </div>
                    <div className="view-all poppins-regular-normal-black-14px"
                        onClick={() => changeRoute("/explorer")}>View all</div>
                </div>
                <div className="recently-used-data">
                    <div className="recently-used-name valign-text-middle poppins-light-black-14px">Name</div>
                    <div className="recently-used-last-m valign-text-middle poppins-light-black-14px">Last Modified</div>
                    <div className="size valign-text-middle poppins-light-black-14px">Size</div>
                </div>

                {/* Rename */}
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

                {/* Snackbar */}
                <div className="explorer-snackbar">
                    <Snackbar
                        text={transferItemDetails.transferType === "download" ? "Downloaded Successfully!  Check Desktop/NoWires" : "Uploaded Successfully! "}
                        handleSnackbarClose={closeSnackbar}
                        show={snackbarStatus} />
                </div>

                <DragAndDrop handleDrop={handleDrop}>
                    <div className="recently-used-explorer-data">
                        {searchResults.length > 0 ? searchResults.map((item, index) => {
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
                        }) : <div className="noFilesImageDashboard" >
                            <NoFiles height="280" width="355" />
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
                </DragAndDrop>
            </div>
        </div >
    )
}

export default FilesMenu2;