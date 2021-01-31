import React from "react";
import "./style.css";

function App() {
  return <FileDashboard {...FileDashboardData} />;
}

export default App;


function FileDashboard(props) {
  const {
    overlapGroup,
    sidebar,
    noWires,
    overlapGroup7,
    oval5,
    dashboard,
    spanText,
    spanText2,
    wallet,
    wallet2,
    message,
    spanText3,
    spanText4,
    trade,
    trade2,
    collapseIcon,
    dashboardCopy,
    recentlyUsed,
    name,
    filesIconPicture,
    photos,
    text3,
    lastModified,
    oval9,
    path6,
    viewAll,
    fileSize,
    filesIconDocx,
    projectReport1,
    date,
    address,
    filesIconPdf,
    assignmentIv,
    date2,
    address2,
    filesIconPdf2,
    assignmentIii,
    date3,
    address3,
    overlapGroup4,
    filesIconMusic,
    telisineyNaNuvve,
    telisineyNaNuvve2,
    date4,
    address4,
    filesIconPicture2,
    weekendTrip,
    date5,
    address5,
    overlapgroup3Props,
    overlapgroup32Props,
  } = props;

  return (
    <div className="file-dashboard">
      <div className="overlap-group" style={{ backgroundImage: `url(${overlapGroup})` }}>
        <div className="sidebar" style={{ backgroundImage: `url(${sidebar})` }}>
          <div className="no-wires poppins-semi-bold-black-16-4px">{noWires}</div>
          <div className="auto-flex12">
            <div className="overlap-group7" style={{ backgroundImage: `url(${overlapGroup7})` }}>
              <img className="oval-5" src={oval5} />
            </div>
            <img className="dashboard" src={dashboard} />
            <div className="dashboard-1 poppins-normal-mine-shaft-12-7px">
              <span className="span1">{spanText}</span>
              <span className="span2">{spanText2}</span>
            </div>
          </div>
          <div className="auto-flex13">
            <img className="wallet" src={wallet} />
            <div className="wallet-1 poppins-normal-black-12-7px">{wallet2}</div>
          </div>
          <div className="auto-flex14">
            <img className="message" src={message} />
            <div className="messages poppins-normal-mine-shaft-12-7px">
              <span className="span1">{spanText3}</span>
              <span className="span2">{spanText4}</span>
            </div>
          </div>
          <div className="auto-flex15">
            <img className="trade" src={trade} />
            <div className="trade-1 poppins-normal-mine-shaft-12-7px-2">{trade2}</div>
          </div>
          <img className="collapse-icon" src={collapseIcon} />
        </div>
        <div className="auto-flex11">
          <div className="auto-flex9">
            <div className="auto-flex5">
              <div className="auto-flex3">
                <div className="auto-flex1">
                  <h1 className="dashboard-copy poppins-bold-black-27-3px">{dashboardCopy}</h1>
                  <Overlapgroup3
                    filesIconDocx={overlapgroup3Props.filesIconDocx}
                    documents={overlapgroup3Props.documents}
                    text1={overlapgroup3Props.text1}
                  />
                  <div className="recently-used poppins-medium-black-18px">{recentlyUsed}</div>
                  <div className="name poppins-normal-black-18px">{name}</div>
                </div>
                <div className="auto-flex2">
                  <div className="overlap-group5">
                    <img className="files-icon-picture" src={filesIconPicture} />
                    <div className="photos poppins-medium-black-18px">{photos}</div>
                    <div className="text- poppins-medium-black-24px">{text3}</div>
                  </div>
                  <div className="last-modified poppins-normal-black-18px">{lastModified}</div>
                </div>
              </div>
              <div className="auto-flex4">
                <div className="overlap-group1">
                  <img className="oval-9" src={oval9} />
                  <img className="path-6" src={path6} />
                </div>
                <Overlapgroup3
                  filesIconDocx={overlapgroup32Props.filesIconDocx}
                  documents={overlapgroup32Props.documents}
                  text1={overlapgroup32Props.text1}
                  className="overlap-group6"
                />
                <div className="view-all poppins-normal-black-18px">{viewAll}</div>
                <div className="file-size poppins-normal-black-18px">{fileSize}</div>
              </div>
            </div>
            <div className="auto-flex">
              <img className="files-icon-docx" src={filesIconDocx} />
              <div className="project-report-1 poppins-medium-black-18px">{projectReport1}</div>
              <div className="date poppins-medium-black-18px">{date}</div>
              <div className="address poppins-medium-black-18px">{address}</div>
            </div>
            <div className="auto-flex6">
              <img className="files-icon--1" src={filesIconPdf} />
              <div className="assignment-iv poppins-medium-black-18px">{assignmentIv}</div>
              <div className="date-1 poppins-medium-black-18px">{date2}</div>
              <div className="address-1 poppins-medium-black-18px">{address2}</div>
            </div>
            <div className="auto-flex7">
              <img className="files-icon--1" src={filesIconPdf2} />
              <div className="assignment-iii poppins-medium-black-18px">{assignmentIii}</div>
              <div className="date-2 poppins-medium-black-18px">{date3}</div>
              <div className="address-2 poppins-medium-black-18px">{address3}</div>
            </div>
            <div className="auto-flex8">
              <div className="overlap-group4" style={{ backgroundImage: `url(${overlapGroup4})` }}>
                <img className="files-icon--1" src={filesIconMusic} />
              </div>
              <div className="overlap-group2">
                <div className="telisiney-na-nuvve poppins-medium-black-18px">{telisineyNaNuvve}</div>
                <div className="telisiney-na-nuvve poppins-medium-black-18px">{telisineyNaNuvve2}</div>
              </div>
              <div className="date-3 poppins-medium-black-18px">{date4}</div>
              <div className="address-3 poppins-medium-black-18px">{address4}</div>
            </div>
          </div>
          <div className="auto-flex10">
            <img className="files-icon-picture-1" src={filesIconPicture2} />
            <div className="weekend-trip poppins-medium-black-18px">{weekendTrip}</div>
            <div className="date-4 poppins-medium-black-18px">{date5}</div>
            <div className="address-4 poppins-medium-black-18px">{address5}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


function Overlapgroup3(props) {
  const { filesIconDocx, documents, text1, className } = props;

  return (
    <div className={`overlap-group3 ${className || ""}`}>
      <img className="files-icon-" src={filesIconDocx} />
      <div className="documents poppins-medium-black-18px">{documents}</div>
      <div className="text- poppins-medium-black-24px">{text1}</div>
    </div>
  );
}
const overlapgroup3Data = {
    filesIconDocx: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-docx-1@3x.png",
    documents: "Documents",
    text1: "10%",
};

const overlapgroup32Data = {
    filesIconDocx: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-video@3x.png",
    documents: "Videos",
    text1: "40%",
};

const FileDashboardData = {
    overlapGroup: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/file-dashboard@1x.jpg",
    sidebar: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/sidebar@1x.svg",
    noWires: "No Wires",
    overlapGroup7: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/oval-5-copy@2x.svg",
    oval5: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/oval-5@2x.svg",
    dashboard: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/dashboard@2x.svg",
    spanText: "Dashboar",
    spanText2: "d",
    wallet: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/wallet@2x.svg",
    wallet2: "Files",
    message: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/message@2x.svg",
    spanText3: "Message",
    spanText4: "s",
    trade: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/trade@2x.svg",
    trade2: "Settings",
    collapseIcon: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/collapse-icon@2x.svg",
    dashboardCopy: "Dashboard",
    recentlyUsed: "Recently Used",
    name: "Name",
    filesIconPicture: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-picture-1@3x.png",
    photos: "Photos",
    text3: "50%",
    lastModified: "Last Modified",
    oval9: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/oval-9@2x.svg",
    path6: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/path-6@2x.svg",
    viewAll: "View all",
    fileSize: "File Size",
    filesIconDocx: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-docx@3x.png",
    projectReport1: "Project Report 1",
    date: "31 Jan 2021",
    address: "10 Mb",
    filesIconPdf: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-pdf-1@3x.png",
    assignmentIv: "Assignment IV",
    date2: "31 Jan 2021",
    address2: "15 Mb",
    filesIconPdf2: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-pdf@3x.png",
    assignmentIii: "Assignment III",
    date3: "31 Jan 2021",
    address3: "12 Mb",
    overlapGroup4: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-music@3x.png",
    filesIconMusic: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-music@3x.png",
    telisineyNaNuvve: "Telisiney Na Nuvve",
    telisineyNaNuvve2: "Telisiney Na Nuvve",
    date4: "30 Jan 2021",
    address4: "10 Mb",
    filesIconPicture2: "https://anima-uploads.s3.amazonaws.com/projects/6010fc66df46edfa419a90f7/releases/60168df1aa00066b9b6a837d/img/files-icon-picture@3x.png",
    weekendTrip: "Weekend Trip",
    date5: "30 Jan 2021",
    address5: "10 Mb",
    overlapgroup3Props: overlapgroup3Data,
    overlapgroup32Props: overlapgroup32Data,
};

