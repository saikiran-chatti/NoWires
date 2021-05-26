import React, { useEffect, useState, useRef } from "react";
import "./ModifyContent.css";

const ModifyContent = (props) => {
  const [value, setValue] = useState("");


  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const action = () => {
    props.create(value);
    setValue("");
    props.closeHandler();
  };

  return (
    <div class="modify-parent">
      <div class="modify-overlap-group">
        <div class="modify-content-title">{props.title}</div>
        <p class="modify-content-desc valign-text-middle">{props.desc}</p>
        {/* <div class="modify-rectangle-22"></div> */}
        <input
          className="modify-popup-input"
          value={value}
          type="text"
          placeholder={props.placeholder}
          onChange={handleChange}
        ></input>

        <div class="modify-flex-row">
          <div class="modify-cancel-1" onClick={props.closeHandler}>
            <div class="modify-overlap-group1">
              <div class="modify-cancel-2 valign-text-middle">Cancel</div>
            </div>
          </div>
          <div class="modify-cancel" onClick={action}>
            <div class="modify-operation valign-text-middle">
              {props.action}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyContent;
