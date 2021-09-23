import React from 'react';
import noConnection from '../../assets/lotties/lf30_editor_b0ep6v8m.json'
import noConnectionSmall from '../../assets/lotties/no_network_without_cloud.json'

import { fetch, Body } from "@tauri-apps/api/http";

import Lottie from 'react-lottie'

const NoConnection = (props) => {

    // Lottie code
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: props.file ? noConnectionSmall : noConnection,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const retry = () => {
        props.refresh(props.path);
        // fetch('http://localhost:8000/changePath', {
        //     method: 'POST',
        //     body: Body.json({
        //         path: props.path,
        //         connectionDetails: props.connectionDetails,
        //     })
        // }).then((res) => {
        //     props.setFileList(res.data);
        // }).catch((e) => {
        //     console.log("error while fetching files list " + e);
        //     props.setErrorSVG(
        //         <div className="noFilesImage">
        //             <NoConnection path={props.path} connectionDetails={props.connectionDetails} svgHeight={500} svgWidth={336} />
        //         </div>
        //     );
        // });
    }

    console.log('props height: ' + props.svgHeight + " " + props.svgWidth)
    return (
        <div style={{ paddingTop: "30px" }}>
            <Lottie
                options={defaultOptions}
                height={props.svgHeight}
                width={props.svgWidth}
            />
            <p>Connection Lost. <div onClick={() => retry()}>Retry</div></p>
        </div>
    );
}

export default NoConnection
