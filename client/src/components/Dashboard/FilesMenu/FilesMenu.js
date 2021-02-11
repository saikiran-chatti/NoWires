import React from 'react'
import './FilesMenu.css'

const FilesMenu = () => {
    return (
        <div class="files-menu">
            <div class="main-menu">
                <div class="files-menu-auto-flex9">
                    <div class="files-menu-auto-flex5">
                        <div class="files-menu-auto-flex3">
                            <div class="files-menu-auto-flex1">
                                <h1 class="dashboard-copy poppins-bold-black-27-3px">Dashboard</h1>
                                <div class="files-menu-overlap-group4">
                                    <img
                                        class="files-icon-"
                                        src="/images/icons/icon-DOCX.svg"
                                    />
                                    <div class="documents poppins-medium-black-18px">Documents</div>
                                    <div class="text- poppins-medium-black-24px">10%</div>
                                </div>
                                <div class="recently-used poppins-medium-black-18px">Recently Used</div>
                                <div class="name poppins-normal-black-18px">Name</div>
                            </div>
                            <div class="files-menu-auto-flex2">
                                <div class="files-menu-overlap-group">
                                    <img
                                        class="files-icon-picture"
                                        src="/images/icons/icon-picture.svg"
                                    />
                                    <div class="photos poppins-medium-black-18px">Photos</div>
                                    <div class="text- poppins-medium-black-24px">50%</div>
                                </div>
                                <div class="last-modified poppins-normal-black-18px">Last Modified</div>
                            </div>
                        </div>
                        <div class="files-menu-auto-flex4">
                            <div class="files-menu-overlap-group3">
                                <img
                                    class="oval-9"
                                    src="/images/icons/Magnifier.svg"
                                />
                                {/* <img
                                    class="path-6"
                                    src="/images/icons/Magnifier.svg"
                                /> */}
                            </div>
                            <div class="files-menu-overlap-group2">
                                <img
                                    class="files-icon-"
                                    src="/images/icons/icon-video.svg"
                                />
                                <div class="videos poppins-medium-black-18px">Videos</div>
                                <div class="text- poppins-medium-black-24px">40%</div>
                            </div>
                            <div class="view-all poppins-normal-black-18px">View all</div>
                            <div class="file-size poppins-normal-black-18px">File Size</div>
                        </div>
                    </div>
                    <div class="files-menu-auto-flex">
                        <img
                            class="files-icon-docx"
                            src="/images/icons/icon-DOCX.svg"
                        />
                        <div class="project-report-1 poppins-medium-black-18px">Project Report 1</div>
                        <div class="date poppins-medium-black-18px">31 Jan 2021</div>
                        <div class="address poppins-medium-black-18px">10 Mb</div>
                    </div>
                    <div class="files-menu-auto-flex6">
                        <img
                            class="files-icon--1"
                            src="/images/icons/icon-PDF.svg"
                        />
                        <div class="assignment-iv poppins-medium-black-18px">Assignment IV</div>
                        <div class="date-1 poppins-medium-black-18px">31 Jan 2021</div>
                        <div class="address-1 poppins-medium-black-18px">15 Mb</div>
                    </div>
                    <div class="files-menu-auto-flex7">
                        <img
                            class="files-icon--1"
                            src="/images/icons/icon-PDF.svg"
                        />
                        <div class="assignment-iii poppins-medium-black-18px">Assignment III</div>
                        <div class="date-2 poppins-medium-black-18px">31 Jan 2021</div>
                        <div class="address-2 poppins-medium-black-18px">12 Mb</div>
                    </div>
                    <div class="files-menu-auto-flex8">
                        <div class="files-menu-overlap-group5">
                            <img
                                class="files-icon--1"
                                src="/images/icons/icon-music.svg"
                            />
                        </div>
                        <div class="files-menu-overlap-group1">
                            <div class="telisiney-na-nuvve poppins-medium-black-18px">Telisiney Na Nuvve</div>
                            {/* <div class="telisiney-na-nuvve poppins-medium-black-18px">Telisiney Na Nuvve</div> */}
                        </div>
                        <div class="date-3 poppins-medium-black-18px">30 Jan 2021</div>
                        <div class="address-3 poppins-medium-black-18px">10 Mb</div>
                    </div>
                </div>
                <div class="files-menu-auto-flex10">
                    <img
                        class="files-icon-picture-1"
                        src="/images/icons/icon-picture.svg"
                    />
                    <div class="weekend-trip poppins-medium-black-18px">Weekend Trip</div>
                    <div class="date-4 poppins-medium-black-18px">30 Jan 2021</div>
                    <div class="address-4 poppins-medium-black-18px">10 Mb</div>
                </div>
            </div>

        </div>
    )
}

export default FilesMenu;