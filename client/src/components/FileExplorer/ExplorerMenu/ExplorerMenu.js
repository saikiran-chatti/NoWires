import React from 'react';
import './ExplorerMenu.css'

const ExplorerMenu = () => {
    return (
        <div class="main-menu">
            <div class="title">
                <h1 class="dashboard-copy poppins-bold-black-27-3px">File Explorer</h1>
                <div class="overlap-group2">
                    <img
                        class="oval-9"
                        src="https://anima-uploads.s3.amazonaws.com/projects/60215157549e4b815d2730da/releases/6021516115cbf1db4fd05411/img/oval-9@2x.svg"
                    />
                    <img
                        class="path-6"
                        src="https://anima-uploads.s3.amazonaws.com/projects/60215157549e4b815d2730da/releases/6021516115cbf1db4fd05411/img/path-6@2x.svg"
                    />
                </div>
            </div>
            <div class="directory-path">
                <div class="overlap-group">
                    <div class="rectangle-9"></div>
                    <div class="rectangle-10"></div>
                    <div class="rectangle-5-copy"></div>
                </div>
                <p class="text-1 valign-text-middle poppins-medium-black-14px">All Files&nbsp;&nbsp;&gt; Important</p>
                <div class="frame-1">
                    <div class="overlap-group1">
                        <div class="rectangle-1 bizarre-border-1px"></div>
                        <div class="rectangle-1 bizarre-border-1px"></div>
                        <div class="create-folder valign-text-middle poppins-light-black-14px">Create Folder</div>
                        <img
                            class="icons8-add-older-50-1"
                            src="https://anima-uploads.s3.amazonaws.com/projects/60215157549e4b815d2730da/releases/6021516115cbf1db4fd05411/img/icons8-add-folder-50-1@2x.png"
                        />
                    </div>
                </div>
            </div>
            <div class="header">
                <div class="place valign-text-middle poppins-light-black-14px">Name</div>
                <div class="last-modified valign-text-middle poppins-light-black-14px">Last Modified</div>
                <div class="size valign-text-middle poppins-light-black-14px">Size</div>
            </div>
        </div>
    )
}

export default ExplorerMenu;