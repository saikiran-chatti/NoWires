import React, {  useState } from "react";
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
    <div className="modify-parent">
      <div className="modify-overlap-group">
        <div className="modify-content-title">{props.title}</div>
        <p className="modify-content-desc valign-text-middle">{props.desc}</p>
        {/* <div className="modify-rectangle-22"></div> */}
        <input
          className="modify-popup-input"
          value={value}
          type="text"
          placeholder={props.placeholder}
          onChange={handleChange}
        ></input>

        <div className="modify-flex-row">
          <div className="modify-cancel-1" onClick={props.closeHandler}>
            <div className="modify-overlap-group1">
              <div className="modify-cancel-2 valign-text-middle">Cancel</div>
            </div>
          </div>
          <div className="modify-cancel" onClick={action}>
            <div className="modify-operation valign-text-middle">
              {props.action}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyContent;
