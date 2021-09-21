import React from 'react';
import noConnection from '../../assets/lotties/lf30_editor_b0ep6v8m.json'
import noConnectionSmall from '../../assets/lotties/no_network_without_cloud.json'

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

    console.log('props height: ' + props.svgHeight + " " + props.svgWidth)
    return (
        <div style={{ paddingTop: "30px" }}>
            <Lottie
                options={defaultOptions}
                height={props.svgHeight}
                width={props.svgWidth}
            />
        </div>
    )
}

export default NoConnection
