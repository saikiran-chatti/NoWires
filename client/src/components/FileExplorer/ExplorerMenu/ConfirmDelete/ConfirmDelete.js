import React from "react";
import "./ConfirmDelete.css";

const ConfirmDelete = (props) => {
  const confirmDel = () => {
    props.delete();
    props.closeHandler();
  };

  const close = () => {
    props.closeHandler();
  };

  return (
    <div className="delete-popup">
      <div className="delete-content">Delete Content</div>
      <p className="delete-desc valign-text-middle">
        Are you sure to remove this content ? This will remove the content permanently
      </p>
      <div className="delete-flex-row">
        <div className="cancel-1" onClick={close}>
          <div className="cancel-2 valign-text-middle">Cancel</div>
        </div>
        <div className="cancel" onClick={confirmDel}>
          <div className="delete valign-text-middle">Delete</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
