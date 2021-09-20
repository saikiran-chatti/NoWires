import { React, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./FilesMenu2.css";
import DragAndDrop from "../../../components/DragAndDrop/DragAndDrop";
import FileComponent from "../../../components/FileExplorer/FileComponent/FileComponent";
import NoFiles from "../../../Errors/NoFiles/NoFiles";
import Snackbar from "../../../components/Snackbar/Snackbar";
import Modal from "../../../components/Modal/Modal";
import DownloadPopup from "../../../components/FileExplorer/ExplorerMenu/DownloadPopup/DownloadPopup";
import { useHistory } from "react-router-dom";
import SearchBar from "../../../components/FileExplorer/ExplorerMenu/SearchBar/SearchBar";
import NoConnection from "../../../Errors/NoConnection/NoConnection";
import FileSkeleton from "../../../components/skeleton/FileSkeleton2";
import ConfirmDelete from "../../../components/FileExplorer/ExplorerMenu/ConfirmDelete/ConfirmDelete";
import ModifyContent from "../../../components/FileExplorer/ExplorerMenu/ModifyContent/ModifyContent";

import { MenuItem, ControlledMenu } from "@szhsin/react-menu";

import { fetch, Body, ResponseType } from "@tauri-apps/api/http";


const FilesMenu2 = () => {
  const connectionDetails = useSelector((state) =>
    state != null ? state.connectionDetails : null
  );
  const [connectionLiveStatus, setConnectionLiveStatus] = useState(true);

  const [fileList, setFileList] = useState([]);

  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [itemDataa, setItemDataa] = useState({
    fileName: "fileName",
    fileType: 1,
    fileSize: "230 Mb",
  });

  // current directory and transfer states
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState("/Download");
  const [transferModalState, setTransferModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const [transferItemDetails, setTransferItemDetails] = useState({
    fileName: "filename",
    fileType: 1,
    fileSize: "200 Mb",
    transferType: "Download",
  });

  // rename states
  const [renameModalState, setRenameModalState] = useState(false);

  const [downloaderComponentUI, setDownloaderComponentUI] = useState(true);
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Error SVG
  const [errorSVG, setErrorSVG] = useState(null);

  let storagePercent =
    (connectionDetails.usedSpace / connectionDetails.totalSize) * 100;

  // ref for scroll
  const ref = useRef();

  // lazy loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('http://localhost:8000/changePath', {
      method: 'POST',
      body: Body.json({
        path: currentDirectoryPath,
        connectionDetails: connectionDetails,
      })
    }).then((res) => {
      setFileList(res.data);
      setLoading(false);
      setSearchTerm("");
      refreshScrollBar();
    })
      .catch((e) => {
        setConnectionLiveStatus(false);
        setLoading(false);
        console.log("error while fetching files list " + e);
        setErrorSVG(
          <div className="noFilesImageDashboard">
            <NoConnection svgHeight={290} svgWidth={336} />
          </div>
        );
      });

    // axios
    //   .post("/changePath", {
    //     path: currentDirectoryPath,
    //     connectionDetails: connectionDetails,
    //   })
    //   .then((res) => {
    //     setFileList(res.data);
    //     setLoading(false);
    //     setSearchTerm("");
    //     refreshScrollBar();
    //   })
    //   .catch((e) => {
    //     setConnectionLiveStatus(false);
    //     setLoading(false);
    //     console.log("error while fetching files list " + e);
    //     setErrorSVG(
    //       <div className="noFilesImageDashboard">
    //         <NoConnection svgHeight={290} svgWidth={336} />
    //       </div>
    //     );
    //   });
  }, [currentDirectoryPath, connectionDetails]);

  useEffect(() => {
    let results = [];
    if (fileList.length > 0) {
      fileList.map((jsFrameworksSearch) => {
        if (jsFrameworksSearch.name.toLowerCase().includes(searchTerm.trim()))
          results.push(jsFrameworksSearch);
      });
    } else if (connectionDetails.host != null) {
      setErrorSVG(
        <div className="noFilesImageDashboard">
          <NoFiles />
        </div>
      );
    }

    setSearchResults(results);
  }, [searchTerm, fileList, connectionDetails.host]);

  const refreshScrollBar = () => {
    ref.current.scrollTo(0, 0);
  };

  let history = useHistory();

  const changeRoute = (path) => {
    history.push(path);
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
        setSearchTerm("");
        // alert(res.data + ' Implement a download progress bar');
      })
        .catch((e) => {
          console.log("error while going back " + e);
          setConnectionLiveStatus(false);
          setErrorSVG(
            <div className="noFilesImageDashboard">
              <NoConnection svgHeight={290} svgWidth={336} />
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
      //     setSearchTerm("");
      //     // alert(res.data + ' Implement a download progress bar');
      //   })
      //   .catch((e) => {
      //     console.log("error while going back " + e);
      //     setConnectionLiveStatus(false);
      //     setErrorSVG(
      //       <div className="noFilesImageDashboard">
      //         <NoConnection svgHeight={290} svgWidth={336} />
      //       </div>
      //     );
      //   });
      // }
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

  const getFileName = (fileName) => new URL(fileName).pathname.split("/").pop();


  const isFile = (path) => {
    return !path.includes('.');
  }

  const handleDrop = (files) => {
    // Implement upload function
    console.log(files);
    // setTransferModalState(true);

    for (let i = 0; i < files.length; i++) {
      let fileType = "Folder";
      let fileSize = "123";
      let fileName = getFileName(files[i]);
      console.log(isFile(files[i]));

      if (isFile(files[i])) {
        console.log('file');
        fileType = 1;
        fileSize = fileSize;
      }

      setTransferItemDetails({
        fileName: fileName,
        fileType: fileType,
        fileSize: fileSize,
        transferType: "Upload",
      });

      console.log(Body.json({ fileName: fileName, localPath: files[i], remotePath: currentDirectoryPath }))

      fetch('http://localhost:8000/uploadFile', {
        method: 'POST',
        body: Body.json({
          fileName: fileName,
          localPath: files[i],
          remotePath: currentDirectoryPath,
          connectionDetails: connectionDetails
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
    }
  };

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
      //   .post("/deleteDir", {
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
        setRenameModalState(true);
        break;

      case "delete":
        console.log(" delete " + fileType);

        setDeleteModalState(true);
        // confirmDel(fileName, fileType, fileSize);
        break;
      case "download":
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
              console.log("error while going back");
              setConnectionLiveStatus(false);
              setErrorSVG(
                <div className="noFilesImageDashboard">
                  <NoConnection svgHeight={290} svgWidth={336} />
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
          //     console.log("error while going back");
          //     setConnectionLiveStatus(false);
          //     setErrorSVG(
          //       <div className="noFilesImageDashboard">
          //         <NoConnection svgHeight={290} svgWidth={336} />
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
              fileName: fileName,
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
              setErrorSVG(
                <div className="noFilesImageDashboard">
                  <NoConnection svgHeight={290} svgWidth={336} />
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
          //     setConnectionLiveStatus(false);
          //     setErrorSVG(
          //       <div className="noFilesImageDashboard">
          //         <NoConnection svgHeight={290} svgWidth={336} />
          //       </div>
          //     );
          //   });
        }
        break;
      default:
        break;
    }
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
      setSnackbarStatus(true);
      setTimeout(() => {
        setSnackbarStatus(false);
      }, 2000);
      setSearchTerm("");
    })
      .catch((e) => {
        setSearchTerm("");
        console.log("error while renaming file " + e);
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
    //     setSnackbarStatus(true);
    //     setTimeout(() => {
    //       setSnackbarStatus(false);
    //     }, 2000);
    //     setSearchTerm("");
    //   })
    //   .catch((e) => {
    //     setSearchTerm("");
    //     console.log("error while renaming file " + e);
    //   });
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

  const closeSnackbar = () => {
    setSnackbarStatus(false);
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
      //   });
      setCurrentDirectoryPath(
        currentDirectoryPath.slice(0, currentDirectoryPath.lastIndexOf("/"))
      );
    } else {
      setLoading(false);
      alert("nope nope");
    }
  };

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

  return (
    <div className="dashboard-screen">
      <h1 className="dashboard-copy poppins-bold-black-27-3px">Dashboard</h1>
      <div className="dashboard-storage-details">
        <div
          className="dashboard-overlap-group"
          onClick={() => changeRoute("/explorer")}
        >
          <div className="dashboard-overlap-group-header">
            <img
              alt="macos-folder-icon"
              className="macos-folder-icon"
              src="/images/macos-folder-icon.png"
            />
            <div className="internal-storage poppins-medium-black-14px">
              Internal Storage
            </div>
          </div>
          <div className="storage-progress">
            <progress max="100" value={storagePercent}></progress>
            <div className="storage-progress-count poppins-regular-black-12px">
              {console.log(connectionDetails)}
              <p>{connectionDetails.usedSpace + " GB"}</p>
              <p>{connectionDetails.totalSize + " GB"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="recently-used">
        <div className="dashboard-recently-used-title">
          <div className="downloadsPath">
            {currentDirectoryPath === "/Download" && (
              <div className="recently-used-1 poppins-medium-black-18px">
                Downloads
              </div>
            )}

            {currentDirectoryPath !== "/Download" && (
              <div className="dashboard-file-icon">
                <div className="overlap-group-1">
                  <div className="rectangle-9"></div>
                  <div className="rectangle-10"></div>
                  <div className="rectangle-5-copy"></div>
                </div>
                <div className="recently-used-1 poppins-medium-black-14px">
                  <span style={{ marginLeft: "13px" }}>
                    {currentDirectoryPath.slice(1).replaceAll("/", ">")}
                  </span>
                </div>
              </div>
            )}

            {/* <div className="recently-used-1 poppins-medium-black-18px">
              {currentDirectoryPath === "/Download"
                ? "Downloads "
                : currentDirectoryPath.slice(1).replaceAll("/", " > ")}
            </div> */}

            {currentDirectoryPath !== "/Download" ? (
              <span className="goBack">
                <img
                  alt="goBack"
                  onClick={() => goBack()}
                  className="goBackImg"
                  src="/images/icons/goBack.svg"
                ></img>
              </span>
            ) : null}
            {/* <span className="goBack">
                            <img alt="goBack" onClick={() => goBack()}
                                className="goBackImg" src="/images/icons/goBack.svg"></img>
                        </span> */}
            <SearchBar input={searchTerm} onChange={updateSearchResult} />
          </div>
          <div
            className="view-all poppins-regular-normal-black-14px"
            onClick={() => changeRoute("/explorer")}
          >
            View all
          </div>
        </div>
        <div className="recently-used-data">
          <div className="recently-used-name valign-text-middle poppins-light-black-14px">
            Name
          </div>
          <div className="recently-used-last-m valign-text-middle poppins-light-black-14px">
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

        {/* Snackbar */}
        <div className="explorer-snackbar">
          <Snackbar
            transferType={transferItemDetails.transferType}
            handleSnackbarClose={closeSnackbar}
            show={snackbarStatus}
          />
        </div>

        <div className="App">{loading && <FileSkeleton />}</div>

        <DragAndDrop handleDrop={handleDrop}>
          <div className="recently-used-explorer-data" ref={ref}>
            {searchResults.length > 0 && connectionLiveStatus
              ? searchResults.map((item, index) => {
                return (
                  <FileComponent
                    key={index}
                    id={item.name + item.type}
                    onContextMenu={(e) =>
                      displayMenu(e, item.name, item.type, item.size)
                    }
                    onClick={() =>
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
              <MenuItem value="download" onClick={handleItemClick}>
                Download
              </MenuItem>
            </ControlledMenu>
          </div>
        </DragAndDrop>
      </div>
    </div>
  );
};

export default FilesMenu2;
