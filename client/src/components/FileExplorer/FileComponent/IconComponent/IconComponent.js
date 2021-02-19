import React from 'react';

export const IconComponent = (props) => {

    const fileType = props.type
    if (fileType == 2)
        return (<div className="overlap-group-1">
            <div className="rectangle-9-1"></div>
            <div className="rectangle-10-1"></div>
            <div className="rectangle-5-copy-1"></div>
        </div>)
    else {
        // console.log('fileType: ' + fileType);
        // console.log('Extension: ' + props.extension);
        switch (props.extension) {
            case null:
                return null

            case 'folder':


            case 'docs':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-DOCX.svg" alt="docs" />
                </div>)

            case 'music':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-music.svg" alt="music" />
                </div>)

            case 'pdf':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-PDF.svg" alt="pdf" />
                </div>)

            case 'picture':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-picture.svg" alt="filepicture" />
                </div>)

            case 'ppt':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-PPT.svg" alt="ppt" />
                </div>)

            case 'video':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-video.svg" alt="video" />
                </div>)

            case 'xls':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-XLS.svg" alt="xls" />
                </div>)

            case 'zip':
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-zip.svg" alt="zip" />
                </div>)
            default:
                return (<div className="overlap-group-1">
                    <img src="/images/icons/icon-other.svg" alt="other" />
                </div>)
        }
    }
};
