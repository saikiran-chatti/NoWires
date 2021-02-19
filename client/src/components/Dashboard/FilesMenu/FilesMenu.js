import React from 'react'
import './FilesMenu.css'

const FilesMenu = () => {
    return (
        <div className="files-menu">
            <div className="main-menu">
                <div className="files-menu-auto-flex9">
                    <div classNameName="files-menu-auto-flex5">
                        <div className="files-menu-auto-flex3">
                            <div className="files-menu-auto-flex1">
                                <h1 className="dashboard-copy poppins-bold-black-27-3px">Dashboard</h1>
                                <div className="files-menu-overlap-group4">
                                    <img
                                        alt="docs"
                                        className="files-icon-"
                                        src="/images/icons/icon-DOCX.svg"
                                    />
                                    <div className="documents poppins-medium-black-18px">Documents</div>
                                    <div className="text- poppins-medium-black-24px">10%</div>
                                </div>
                                <div className="recently-used poppins-medium-black-18px">Recently Used</div>
                                <div className="name poppins-normal-black-18px">Name</div>
                            </div>
                            <div className="files-menu-auto-flex2">
                                <div className="files-menu-overlap-group">
                                    <img
                                        alt="files-picture"
                                        className="files-icon-picture"
                                        src="/images/icons/icon-picture.svg"
                                    />
                                    <div className="photos poppins-medium-black-18px">Photos</div>
                                    <div className="text- poppins-medium-black-24px">50%</div>
                                </div>
                                <div className="last-modified poppins-normal-black-18px">Last Modified</div>
                            </div>
                        </div>
                        <div className="files-menu-auto-flex4">
                            <div className="files-menu-overlap-group3">
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
                            <div className="files-menu-overlap-group2">
                                <img
                                    alt="file-video"
                                    className="files-icon-"
                                    src="/images/icons/icon-video.svg"
                                />
                                <div className="videos poppins-medium-black-18px">Videos</div>
                                <div className="text- poppins-medium-black-24px">40%</div>
                            </div>
                            <div className="view-all poppins-normal-black-18px">View all</div>
                            <div className="file-size poppins-normal-black-18px">File Size</div>
                        </div>
                    </div>
                    <div className="files-menu-auto-flex">
                        <img
                            alt="docs"
                            className="files-icon-docx"
                            src="/images/icons/icon-DOCX.svg"
                        />
                        <div className="project-report-1 poppins-medium-black-18px">Project Report 1</div>
                        <div className="date poppins-medium-black-18px">31 Jan 2021</div>
                        <div className="address poppins-medium-black-18px">10 Mb</div>
                    </div>
                    <div className="files-menu-auto-flex6">
                        <img
                            alt="pdf"
                            className="files-icon--1"
                            src="/images/icons/icon-PDF.svg"
                        />
                        <div className="assignment-iv poppins-medium-black-18px">Assignment IV</div>
                        <div className="date-1 poppins-medium-black-18px">31 Jan 2021</div>
                        <div className="address-1 poppins-medium-black-18px">15 Mb</div>
                    </div>
                    <div className="files-menu-auto-flex7">
                        <img
                            alt="pdf"
                            className="files-icon--1"
                            src="/images/icons/icon-PDF.svg"
                        />
                        <div className="assignment-iii poppins-medium-black-18px">Assignment III</div>
                        <div className="date-2 poppins-medium-black-18px">31 Jan 2021</div>
                        <div className="address-2 poppins-medium-black-18px">12 Mb</div>
                    </div>
                    <div className="files-menu-auto-flex8">
                        <div className="files-menu-overlap-group5">
                            <img
                                alt="flilemusic"
                                className="files-icon--1"
                                src="/images/icons/icon-music.svg"
                            />
                        </div>
                        <div className="files-menu-overlap-group1">
                            <div className="telisiney-na-nuvve poppins-medium-black-18px">Telisiney Na Nuvve</div>
                            {/* <div className="telisiney-na-nuvve poppins-medium-black-18px">Telisiney Na Nuvve</div> */}
                        </div>
                        <div className="date-3 poppins-medium-black-18px">30 Jan 2021</div>
                        <div className="address-3 poppins-medium-black-18px">10 Mb</div>
                    </div>
                </div>
                <div className="files-menu-auto-flex10">
                    <img
                        alt="file_picture"
                        className="files-icon-picture-1"
                        src="/images/icons/icon-picture.svg"
                    />
                    <div className="weekend-trip poppins-medium-black-18px">Weekend Trip</div>
                    <div className="date-4 poppins-medium-black-18px">30 Jan 2021</div>
                    <div className="address-4 poppins-medium-black-18px">10 Mb</div>
                </div>
            </div>

        </div>
    )
}

export default FilesMenu;