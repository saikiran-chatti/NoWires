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
    <div class="delete-popup">
      <div class="delete-content">Delete Content</div>
      <p class="delete-desc valign-text-middle">
        Are you sure to remove this content ? This <br />
        will remove the content permanently
      </p>
      <div class="delete-flex-row">
        <div class="cancel-1" onClick={close}>
          <div class="cancel-2 valign-text-middle">Cancel</div>
        </div>
        <div class="cancel" onClick={confirmDel}>
          <div class="delete valign-text-middle">Delete</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
