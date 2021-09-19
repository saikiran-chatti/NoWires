import { React, useEffect, useState, useRef } from "react";
import FileComponent from "../../../components/FileExplorer/FileComponent/FileComponent";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import "./ExplorerMenu.css";
import DragAndDrop from "../../../components/DragAndDrop/DragAndDrop";
import { useSelector } from "react-redux";
import DownloadPopup from "../../../components/FileExplorer/ExplorerMenu/DownloadPopup/DownloadPopup";
import FileSkeleton from "../../../components/skeleton/FileSkeleton2";

// import { Menu, Item, useContextMenu } from "react-contexify";
import { MenuItem, ControlledMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Snackbar from "../../../components/Snackbar/Snackbar";
import NoFiles from "../../../Errors/NoFiles/NoFiles";
import SearchBar from "../../../components/FileExplorer/ExplorerMenu/SearchBar/SearchBar";
import NoConnection from "../../../Errors/NoConnection/NoConnection";
import ConfirmDelete from "../../../components/FileExplorer/ExplorerMenu/ConfirmDelete/ConfirmDelete";
import ModifyContent from "../../../components/FileExplorer/ExplorerMenu/ModifyContent/ModifyContent";

// const MENU_ID = "menu-id";
import { fetch, Body, ResponseType } from "@tauri-apps/api/http";

const ExplorerMenu = () => {
  // fetching the ftp details
  const connectionDetails = useSelector((state) =>
    state != null ? state.connectionDetails : null
  );
  const [connectionLiveStatus, setConnectionLiveStatus] = useState(true);

  const [fileList, setFileList] = useState([]);
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState("/");
  const [modalState, setModalState] = useState(false);
  const [renameModalState, setRenameModalState] = useState(false);
  const [transferModalState, setTransferModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const [transferItemDetails, setTransferItemDetails] = useState({
    fileName: "filename",
    fileType: 1,
    fileSize: "200 Mb",
    transferType: "Download",
  });

  const [errorSVG, setErrorSVG] = useState(null);

  // used for menu's.
  // const [menuProp, setMenuProp] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [itemDataa, setItemDataa] = useState({
    fileName: "fileName",
    fileType: 1,
    fileSize: "230 Mb",
  });

  // File transfer
  // const [transferPercent, setTransferPercent] = useState(0);
  // const [files, setFiles] = useState(() => []);
  // const [downloadFile, downloaderComponentUI] = useFileDownloader();
  const [downloaderComponentUI, setDownloaderComponentUI] = useState(true);
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ref for scroll
  const ref = useRef();

  //LazyLoading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentDirectoryPath === "/") {
      console.log(connectionDetails);

      fetch('http://localhost:8000/rootDirectory', {
        method: 'POST',
        body: Body.json({ connectionDetails: connectionDetails })
      }).then((res) => {
        setFileList(res.data);
        // refreshScrollBar();
        setLoading(false);
      })
        .catch((e) => {
          console.log("error while fetching files list " + e);
          setLoading(false);
          setConnectionLiveStatus(false);
          setErrorSVG(
            <div className="noFilesImage">
              <NoConnection svgHeight={500} svgWidth={336} />
            </div>
          );
        });

      // axios
      //   .post("/rootDirectory", { connectionDetails: connectionDetails })
      //   .then((res) => {
      //     setFileList(res.data);
      //     // refreshScrollBar();
      //     setLoading(false);
      //   })
      //   .catch((e) => {
      //     console.log("error while fetching files list " + e);
      //     setLoading(false);
      //     setConnectionLiveStatus(false);
      //     setErrorSVG(
      //       <div className="noFilesImage">
      //         <NoConnection svgHeight={500} svgWidth={336} />
      //       </div>
      //     );
      //   });
    } else {

      fetch('http://localhost:8000/changePath', {
        method: 'POST',
        body: Body.json({
          path: currentDirectoryPath,
          connectionDetails: connectionDetails,
        })
      }).then((res) => {
        setLoading(false);
        setFileList(res.data);
        setSearchTerm("");
        refreshScrollBar();
      })
        .catch((e) => {
          setLoading(false);
          console.log("error while fetching files list " + e);
          setConnectionLiveStatus(false);
          setErrorSVG(
            <div className="noFilesImage">
              <NoConnection svgHeight={500} svgWidth={336} />
            </div>
          );
        });

      // axios
      //   .post("/changePath", {
      //     path: currentDirectoryPath,
      //     connectionDetails: connectionDetails,
      //   })
      //   .then((res) => {
      //     setLoading(false);
      //     setFileList(res.data);
      //     setSearchTerm("");
      //     refreshScrollBar();
      //   })
      //   .catch((e) => {
      //     setLoading(false);
      //     console.log("error while fetching files list " + e);
      //     setConnectionLiveStatus(false);
      //     setErrorSVG(
      //       <div className="noFilesImage">
      //         <NoConnection svgHeight={500} svgWidth={336} />
      //       </div>
      //     );
      //   });
    }
  }, [currentDirectoryPath]);

  useEffect(() => {
    let results = [];
    if (fileList.length > 0) {
      fileList.map((jsFrameworksSearch) => {
        if (jsFrameworksSearch.name.toLowerCase().includes(searchTerm.trim()))
          results.push(jsFrameworksSearch);
      });
    } else if (connectionDetails.host != null) {
      setErrorSVG(
        <div className="noFilesImage">
          <NoFiles />
        </div>
      );
    }

    // fileList.map((jsFrameworksSearch) => {
    //     if (jsFrameworksSearch.name.toLowerCase().includes(searchTerm.trim()))
    //         results.push(jsFrameworksSearch)
    // });
    setSearchResults(results);
  }, [searchTerm, fileList]);

  const refreshScrollBar = () => {
    ref.current.scrollTo(0, 0);
  };

  //CreateFolder
  const createFolder = (folderName) => {
    setSearchTerm("");
    setTransferItemDetails({
      fileSize: transferItemDetails.fileSize,
      fileType: transferItemDetails.fileType,
      fileName: transferItemDetails.fileName,
      transferType: "Create Folder",
    });

    fetch('http://localhost:8000/createFolder', {
      method: 'POST',
      body: Body.json({
        name: folderName,
        path: currentDirectoryPath,
        connectionDetails: connectionDetails,
      })
    }).then((res) => {
      setFileList(res.data);
      setSnackbarStatus(true);
      setTimeout(() => {
        setSnackbarStatus(false);
      }, 2000);
    })
      .catch((e) => {
        console.log("error while fetching files list " + e);
        setConnectionLiveStatus(false);
        setErrorSVG(
          <div className="noFilesImage">
            <NoConnection svgHeight={500} svgWidth={336} />
          </div>
        );
      });

    // axios
    //   .post("/createFolder", {
    //     name: folderName,
    //     path: currentDirectoryPath,
    //     connectionDetails: connectionDetails,
    //   })
    //   .then((res) => {
    //     setFileList(res.data);
    //     setSnackbarStatus(true);
    //     setTimeout(() => {
    //       setSnackbarStatus(false);
    //     }, 2000);
    //   })
    //   .catch((e) => {
    //     console.log("error while fetching files list " + e);
    //     setConnectionLiveStatus(false);
    //     setErrorSVG(
    //       <div className="noFilesImage">
    //         <NoConnection svgHeight={500} svgWidth={336} />
    //       </div>
    //     );
    //   });
  };

  const renameItem = (newName) => {
    // let oldName = itemData.slice(0, -1);

    setTransferItemDetails({
      fileSize: itemDataa.fileSize,
      fileType: itemDataa.fileType,
      fileName: itemDataa.fileName,
      transferType: "Rename",
    });

    let oldName = itemDataa.fileName;

    if (itemDataa.fileType !== 2) {
      let ext = oldName.split(".").pop();
      newName = newName + "." + ext;
    }

    fetch('http://localhost:8000/renameFile', {
      method: 'POST',
      body: Body.json({
        oldName: oldName,
        path: currentDirectoryPath,
        newName: newName,
        connectionDetails: connectionDetails,
      })
    }).then((res) => {
      setFileList(res.data);
      setSearchTerm("");
      setSnackbarStatus(true);
      setTimeout(() => {
        setSnackbarStatus(false);
      }, 2000);
    })
      .catch((e) => {
        console.log("error while renaming file " + e);
        setConnectionLiveStatus(false);
        setErrorSVG(
          <div className="noFilesImage">
            <NoConnection svgHeight={500} svgWidth={336} />
          </div>
        );
      });

    // axios
    //   .post("/renameFile", {
    //     oldName: oldName,
    //     path: currentDirectoryPath,
    //     newName: newName,
    //     connectionDetails: connectionDetails,
    //   })
    //   .then((res) => {
    //     setFileList(res.data);
    //     setSearchTerm("");
    //     setSnackbarStatus(true);
    //     setTimeout(() => {
    //       setSnackbarStatus(false);
    //     }, 2000);
    //   })
    //   .catch((e) => {
    //     console.log("error while renaming file " + e);
    //     setConnectionLiveStatus(false);
    //     setErrorSVG(
    //       <div className="noFilesImage">
    //         <NoConnection svgHeight={500} svgWidth={336} />
    //       </div>
    //     );
    //   });
  };

  const changePath = (name, type, size) => {
    setTransferItemDetails({
      fileSize: size,
      fileType: type,
      fileName: name,
      transferType: "Download",
    });
    if (type === 2) {
      setLoading(true);
      setCurrentDirectoryPath(currentDirectoryPath + "/" + name); // works for ftp-server app
      // setCurrentDirectoryPath(currentDirectoryPath + name)
    } else {
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

      fetch('http://localhost:8000/downloadFile', {
        method: 'POST',
        responseType: ResponseType.Text,
        body: Body.json({
          path: currentDirectoryPath,
          responseType: ResponseType.Text,
          name: name,
          connectionDetails: connectionDetails,
        })
      }).then((res) => {
        console.log("After download: " + downloaderComponentUI);
        setDownloaderComponentUI(false);
        setTransferModalState(false);
        setSnackbarStatus(true);
        setTimeout(() => {
          setSnackbarStatus(false);
        }, 2000);
        // alert(res.data + ' Implement a download progress bar');
      })
        .catch((e) => {
          setConnectionLiveStatus(false);
          console.log("error while going back " + e);
          setErrorSVG(
            <div className="noFilesImage">
              <NoConnection svgHeight={500} svgWidth={336} />
            </div>
          );
        });

      // axios
      //   .post("/downloadFile", {
      //     path: currentDirectoryPath,
      //     name: name,
      //     connectionDetails: connectionDetails,
      //   })
      //   .then((res) => {
      //     console.log("After download: " + downloaderComponentUI);
      //     setDownloaderComponentUI(false);
      //     setTransferModalState(false);
      //     setSnackbarStatus(true);
      //     setTimeout(() => {
      //       setSnackbarStatus(false);
      //     }, 2000);
      //     // alert(res.data + ' Implement a download progress bar');
      //   })
      //   .catch((e) => {
      //     setConnectionLiveStatus(false);
      //     console.log("error while going back " + e);
      //     setErrorSVG(
      //       <div className="noFilesImage">
      //         <NoConnection svgHeight={500} svgWidth={336} />
      //       </div>
      //     );
      //   });
      // }
    }
  };

  const goBack = () => {
    setLoading(true);
    const p = currentDirectoryPath.slice(
      0,
      currentDirectoryPath.lastIndexOf("/")
    );
    if (p !== "") {

      fetch('http://localhost:8000/changePath', {
        method: 'POST',
        body: Body.json({ path: p, connectionDetails: connectionDetails })
      }).then((res) => {
        setLoading(false);
        setFileList(res.data);
      })
        .catch((e) => {
          setLoading(false);
          console.log("error while going back " + e);
          setConnectionLiveStatus(false);
          setErrorSVG(
            <div className="noFilesImage">
              <NoConnection svgHeight={500} svgWidth={336} />
            </div>
          );
        });

      // axios
      //   .post("/changePath", { path: p, connectionDetails: connectionDetails })
      //   .then((res) => {
      //     setLoading(false);
      //     setFileList(res.data);
      //   })
      //   .catch((e) => {
      //     setLoading(false);
      //     console.log("error while going back " + e);
      //     setConnectionLiveStatus(false);
      //     setErrorSVG(
      //       <div className="noFilesImage">
      //         <NoConnection svgHeight={500} svgWidth={336} />
      //       </div>
      //     );
      //   });
      setCurrentDirectoryPath(
        currentDirectoryPath.slice(0, currentDirectoryPath.lastIndexOf("/"))
      );
    } else {
      alert("cannot go further 🙂");
      setLoading(false);
    }
  };

  const getCodedBuffer = (file) => {
    return new Promise(function (resolve, reject) {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = function (ev) {
        const array = new Uint8Array(ev.target.result);
        // const fileByteArray = [];
        let codedBuffer = "";

        for (let i = 0; i < array.length; i++) {
          // fileByteArray.push(array[i]);
          codedBuffer += String.fromCharCode(array[i]);
        }
        resolve(codedBuffer); // successful
      };
      fileReader.onerror = reject; // call reject if error
    });
  };

  const handleDrop = (files) => {
    // Implement upload function
    console.log('handling drop')
    setTransferModalState(true);

    for (let i = 0; i < files.length; i++) {
      let fileType = "Folder";
      let fileSize = files[i].size;

      if (files[i].isFile) {
        fileType = 1;
        fileSize = files[i].size;
        console.log("file size: " + files[i].size);
      }

      setTransferItemDetails({
        fileName: files[i].name,
        fileType: fileType,
        fileSize: fileSize,
        transferType: "Upload",
      });

      getCodedBuffer(files[i]).then((result) => {
        fetch('http://localhost:8000/handleDrop', {
          method: 'POST',
          body: Body.json({
            value: result,
            fileName: files[i].name,
            path: currentDirectoryPath,
            connectionDetails: connectionDetails,
          })
        }).then((res) => {
          setTransferModalState(false);
          setFileList(res.data);
          setSnackbarStatus(true);
          setTimeout(() => {
            setSnackbarStatus(false);
          }, 2000);
        })
          .catch((err) => {
            alert("error occured while uploading " + err);
            setConnectionLiveStatus(false);
            setErrorSVG(
              <div className="noFilesImage">
                <NoConnection svgHeight={500} svgWidth={336} />
              </div>
            );
          });

        // axios
        //   .post("/handleDrop", {
        //     value: result,
        //     fileName: files[i].name,
        //     path: currentDirectoryPath,
        //     connectionDetails: connectionDetails,
        //   })
        //   .then((res) => {
        //     setTransferModalState(false);
        //     setFileList(res.data);
        //     setSnackbarStatus(true);
        //     setTimeout(() => {
        //       setSnackbarStatus(false);
        //     }, 2000);
        //   })
        //   .catch((err) => {
        //     alert("error occured while uploading " + err);
        //     setConnectionLiveStatus(false);
        //     setErrorSVG(
        //       <div className="noFilesImage">
        //         <NoConnection svgHeight={500} svgWidth={336} />
        //       </div>
        //     );
        //   });
      });
    }
  };

  const closeModal = () => {
    setModalState(false);
  };

  const closeSnackbar = () => {
    setSnackbarStatus(false);
  };

  const closeRenameModal = () => {
    setRenameModalState(false);
  };

  const closeTransferModal = () => {
    setTransferModalState(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalState(false);
  };

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

  const confirmDel = () => {
    let fileName = itemDataa.fileName;
    let fileType = itemDataa.fileType;
    let fileSize = itemDataa.fileSize;

    let deletePath = currentDirectoryPath + "/" + fileName;
    console.log(deletePath);

    setTransferItemDetails({
      fileSize: fileSize,
      fileType: fileType,
      fileName: fileName,
      transferType: "Delete",
    });

    if (fileType === 2) {
      setTransferModalState(true);

      // Delete a directory
      console.log("deleting a folder");

      fetch('http://localhost:8000/deleteDir', {
        method: 'POST',
        body: Body.json({
          path: currentDirectoryPath,
          fileName: fileName,
          connectionDetails: connectionDetails,
        })
      }).then((res) => {
        setTransferModalState(false);

        setFileList(res.data);
        setSnackbarStatus(true);
        setTimeout(() => {
          setSnackbarStatus(false);
        }, 2000);
        setSearchTerm("");
      })
        .catch(() => {
          setConnectionLiveStatus(false);
          setErrorSVG(
            <div className="noFilesImage">
              <NoConnection svgHeight={500} svgWidth={336} />
            </div>
          );
          console.log("error while deleting file");
        });

      // axios
      // .post("/deleteDir", {
      //   path: currentDirectoryPath,
      //   fileName: fileName,
      //   connectionDetails: connectionDetails,
      // })
      //   .then((res) => {
      //     setTransferModalState(false);

      //     setFileList(res.data);
      //     setSnackbarStatus(true);
      //     setTimeout(() => {
      //       setSnackbarStatus(false);
      //     }, 2000);
      //     setSearchTerm("");
      //   })
      //   .catch(() => {
      //     setConnectionLiveStatus(false);
      //     setErrorSVG(
      //       <div className="noFilesImage">
      //         <NoConnection svgHeight={500} svgWidth={336} />
      //       </div>
      //     );
      //     console.log("error while deleting file");
      //   });
    } else {
      setTransferModalState(true);

      // Delete a file
      console.log("deleting a file");

      fetch('http://localhost:8000/deleteFile', {
        method: 'POST',
        body: Body.json({
          path: currentDirectoryPath,
          fileName: fileName,
          connectionDetails: connectionDetails,
        })
      }).then((res) => {
        setTransferModalState(false);
        setFileList(res.data);
        setSnackbarStatus(true);
        setTimeout(() => {
          setSnackbarStatus(false);
        }, 2000);
        setSearchTerm("");
      })
        .catch(() => {
          console.log("error while deleting file");
          setConnectionLiveStatus(false);
          setErrorSVG(
            <div className="noFilesImage">
              <NoConnection svgHeight={500} svgWidth={336} />
            </div>
          );
        });

      // axios
      //   .post("/deleteFile", {
      //     path: currentDirectoryPath,
      //     fileName: fileName,
      //     connectionDetails: connectionDetails,
      //   })
      //   .then((res) => {
      //     setTransferModalState(false);
      //     setFileList(res.data);
      //     setSnackbarStatus(true);
      //     setTimeout(() => {
      //       setSnackbarStatus(false);
      //     }, 2000);
      //     setSearchTerm("");
      //   })
      //   .catch(() => {
      //     console.log("error while deleting file");
      //     setConnectionLiveStatus(false);
      //     setErrorSVG(
      //       <div className="noFilesImage">
      //         <NoConnection svgHeight={500} svgWidth={336} />
      //       </div>
      //     );
      //   });
    }
  };

  const handleItemClick = (e) => {
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

        setDeleteModalState(true);
        // confirmDel(fileName, fileType, fileSize);
        break;

      case "Download":
        console.log(fileType + " download");
        // downloading a file..
        setTransferItemDetails({
          fileSize: fileSize,
          fileType: fileType,
          fileName: fileName,
          transferType: "Download",
        });

        if (fileType === 2) {
          console.log("downloading a folder");

          setTransferModalState(true);
          setDownloaderComponentUI(true);


          fetch('http://localhost:8000/downloadDirectory', {
            method: 'POST',
            body: Body.json({
              path: currentDirectoryPath,
              name: fileName,
              connectionDetails: connectionDetails,
            })
          }).then((res) => {
            setDownloaderComponentUI(false);
            setTransferModalState(false);
            setSnackbarStatus(true);
            setTimeout(() => {
              setSnackbarStatus(false);
            }, 2000);
            // alert(res.data + ' Implement a download progress bar');
          })
            .catch(() => {
              console.log("error while downloading");
              setConnectionLiveStatus(false);
              setErrorSVG(
                <div className="noFilesImage">
                  <NoConnection svgHeight={500} svgWidth={336} />
                </div>
              );
            });

          // axios
          //   .post("/downloadDirectory", {
          //     path: currentDirectoryPath,
          //     name: fileName,
          //     connectionDetails: connectionDetails,
          //   })
          //   .then((res) => {
          //     setDownloaderComponentUI(false);
          //     setTransferModalState(false);
          //     setSnackbarStatus(true);
          //     setTimeout(() => {
          //       setSnackbarStatus(false);
          //     }, 2000);
          //     // alert(res.data + ' Implement a download progress bar');
          //   })
          //   .catch(() => {
          //     console.log("error while downloading");
          //     setConnectionLiveStatus(false);
          //     setErrorSVG(
          //       <div className="noFilesImage">
          //         <NoConnection svgHeight={500} svgWidth={336} />
          //       </div>
          //     );
          //   });
        } else {
          // downloading a file
          setTransferModalState(true);
          setDownloaderComponentUI(true);

          console.log("Before download " + downloaderComponentUI);

          fetch('http://localhost:8000/downloadFile', {
            method: 'POST',
            responseType: ResponseType.Text,
            body: Body.json({
              path: currentDirectoryPath,
              responseType: ResponseType.Text,
              name: fileName,
              connectionDetails: connectionDetails,
            })
          }).then((res) => {
            console.log("After download: " + downloaderComponentUI);
            setDownloaderComponentUI(false);
            setTransferModalState(false);
            setSnackbarStatus(true);
            setTimeout(() => {
              setSnackbarStatus(false);
            }, 2000);
            // alert(res.data + ' Implement a download progress bar');
          })
            .catch((e) => {
              console.log("error while going back " + e);
              setConnectionLiveStatus(false);
              setErrorSVG(
                <div className="noFilesImage">
                  <NoConnection svgHeight={500} svgWidth={336} />
                </div>
              );
            });

          // axios
          //   .post("/downloadFile", {
          //     path: currentDirectoryPath,
          //     name: fileName,
          //     connectionDetails: connectionDetails,
          //   })
          //   .then((res) => {
          //     console.log("After download: " + downloaderComponentUI);
          //     setDownloaderComponentUI(false);
          //     setTransferModalState(false);
          //     setSnackbarStatus(true);
          //     setTimeout(() => {
          //       setSnackbarStatus(false);
          //     }, 2000);
          //     // alert(res.data + ' Implement a download progress bar');
          //   })
          //   .catch((e) => {
          //     console.log("error while going back " + e);
          //     setConnectionLiveStatus(false);
          //     setErrorSVG(
          //       <div className="noFilesImage">
          //         <NoConnection svgHeight={500} svgWidth={336} />
          //       </div>
          //     );
          //   });
        }
        break;
      default:
        break;
    }
  };

  const updateSearchResult = async (input) => {
    // setSearchTerm(event.target.value)
    let results = [];
    if (fileList.length > 0) {
      fileList.map((jsFrameworksSearch) => {
        if (jsFrameworksSearch.name.toLowerCase().includes(input.trim()))
          results.push(jsFrameworksSearch);
      });
    }
    setSearchTerm(input);
    setSearchResults(results);
  };

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
    setItemDataa({
      fileName: fileName,
      fileType: fileType,
      fileSize: fileSize,
    });
  };

  return (
    <div className="explorer-main-menu">
      <div className="explorer-title">
        <h1 className="dashboard-copy poppins-bold-black-27-3px">
          File Explorer
        </h1>
        <div className="overlap-group2">
          {/* <img
                        alt="magnifier"
                        className="oval-9"
                        src="/images/icons/Magnifier.svg"
                    />*/}
          <SearchBar input={searchTerm} onChange={updateSearchResult} />
          {/* <img
                        className="path-6"
                        src="/images/icons/Magnifier.svg"
                    /> */}
        </div>
      </div>
      <div className="directory-path">
        <div className="directory-path-section-1">
          <div className="overlap-group-1">
            <div className="rectangle-9"></div>
            <div className="rectangle-10"></div>
            <div className="rectangle-5-copy"></div>
          </div>
          <p className="explorer-path valign-text-middle poppins-medium-black-14px">
            {currentDirectoryPath === "/"
              ? "Internal Storage >"
              : currentDirectoryPath.slice(2).replaceAll("/", " > ")}
          </p>
          {currentDirectoryPath !== "/" ? (
            <span className="goBack">
              <img
                alt="goBack"
                onClick={() => goBack()}
                className="goBackImg"
                src="/images/icons/goBack.svg"
              ></img>
            </span>
          ) : null}
        </div>

        <div className="frame-1">
          <div className="overlap-group" onClick={() => setModalState(true)}>
            <div className="rectangle-1 bizarre-border-1px"></div>
            <div className="rectangle-1 bizarre-border-1px"></div>
            <div className="create-folder valign-text-middle poppins-light-black-14px">
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

      {/*
                <span className="upload">
                    <input type="file" name="u" />
                </span> */}
      {/* Modal */}
      <Modal show={modalState} modalClosed={closeModal} color="#fff">
        <ModifyContent
          desc="Are you sure to create folder ?"
          placeholder="Enter folder name"
          title="Create Folder"
          action="Create"
          create={(folderName) => createFolder(folderName)}
          closeHandler={closeModal}
          path={currentDirectoryPath}
        />
      </Modal>

      <div className="explorer-snackbar">
        <Snackbar
          // text={transferItemDetails.transferType === "Download" ? "Downloaded Successfully!  Check Desktop/NoWires" : "Uploaded Successfully! "}
          transferType={transferItemDetails.transferType}
          handleSnackbarClose={closeSnackbar}
          show={snackbarStatus}
        />
      </div>

      <div className="explorer-header">
        <div className="place valign-text-middle poppins-light-black-14px">
          Name
        </div>
        <div className="explorer-last-modified valign-text-middle poppins-light-black-14px">
          Last Modified
        </div>
        <div className="size valign-text-middle poppins-light-black-14px">
          Size
        </div>
      </div>

      {/* popup for rename */}
      <Modal
        show={renameModalState}
        modalClosed={closeRenameModal}
        color="#fff"
      >
        <ModifyContent
          desc="Are you sure to rename this content ? This will rename the content
          permanently."
          placeholder="Enter new name"
          title={"Rename " + itemDataa.fileName}
          create={(newName) => renameItem(newName)}
          closeHandler={closeRenameModal}
          action="Rename"
          path={currentDirectoryPath + "/" + itemDataa.fileName}
        />
      </Modal>

      {/* popup for delete */}
      <Modal
        show={deleteModalState}
        modalClosed={closeDeleteModal}
        color="#fff"
      >
        <ConfirmDelete
          title={itemDataa.fileName}
          delete={confirmDel}
          closeHandler={closeDeleteModal}
          path={currentDirectoryPath + "/" + itemDataa.fileName}
        />
      </Modal>

      {/* popup for transfer progress */}
      <Modal
        show={transferModalState}
        // modalClosed={closeTransferModal}
        color="#fff"
      >
        <DownloadPopup
          placeholder={transferItemDetails.transferType}
          name={transferItemDetails.fileName}
          // create={(newName) => renameItem(newName)}
          type={transferItemDetails.fileType}
          closeHandler={closeTransferModal}
          size={transferItemDetails.fileSize}
          path={
            currentDirectoryPath +
            "/" +
            transferItemDetails.fileName.split(".").slice(0, -1).join(".")
          }
        />
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

      <div className="App">{loading && <FileSkeleton />}</div>
      <DragAndDrop handleDrop={handleDrop}>
        <div ref={ref} className="explorer-data" id="explorer-data-files">
          {searchResults.length > 0 && connectionLiveStatus
            ? searchResults.map((item, index) => {
              return (
                <FileComponent
                  key={index}
                  id={item.name + item.type}
                  onContextMenu={(e) =>
                    displayMenu(e, item.name, item.type, item.size)
                  }
                  onClick={() => changePath(item.name, item.type, item.size)}
                  onDoubleClick={() =>
                    changePath(item.name, item.type, item.size)
                  }
                  name={item.name}
                  type={item.type}
                  size={item.size}
                  lastMod={item.modifiedAt}
                />
              );
            })
            : errorSVG}

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

          <ControlledMenu
            anchorPoint={anchorPoint}
            isOpen={isOpen}
            onClose={() => setOpen(false)}
          >
            <MenuItem value="rename" onClick={handleItemClick}>
              Rename
            </MenuItem>
            <MenuItem value="delete" onClick={handleItemClick}>
              Delete
            </MenuItem>
            <MenuItem value="Download" onClick={handleItemClick}>
              Download
            </MenuItem>
          </ControlledMenu>
        </div>
      </DragAndDrop>
    </div>
  );
};

export default ExplorerMenu;
