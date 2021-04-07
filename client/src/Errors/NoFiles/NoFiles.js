import React from 'react';

const NoFiles = (props) => {
    return (
        <div>
            <img src="/images/emptfold1.png"
                alt="No files"
                height={props.height}
                width={props.width}
            />
        </div>
    )
}

export default NoFiles;