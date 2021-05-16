import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { VscClose } from "react-icons/vsc";
import "./Snackbar.css";

const homeDir = require("os").homedir();
const desktopDir = `${homeDir}/Desktop`;

const Snackbar = (props) => {
  const handleClose = () => {
    props.handleSnackbarClose();
  };

  const openExplorerLink = () => {};

  return (
    <div>
      <div class="snackbar-frame-1" style={{ opacity: props.show ? "1" : "0" }}>
        <div class="snackbar-verified">
          <GoVerified />
        </div>
        <p class="snackbar-text-1 poppins-medium-black-14px">
          {(() => {
            switch (props.transferType) {
              case "Create Folder":
                return "Created Folder Successfully! 🙂";
              case "Rename":
                return "Renamed Successfully! 🙂";
              case "Download":
                return "Downloaded Successfully! Check Desktop/NoWires";
              case "Upload":
                return "Uploaded Successfully! 🙂";
              case "Delete":
                return "Deleted Successfully! 🙂";
              default:
                return " ";
            }
          })()}
        </p>
        <div class="close" onClick={handleClose}>
          <VscClose color="#484848" />
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
