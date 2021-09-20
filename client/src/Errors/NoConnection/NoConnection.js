import React from 'react';
import noConnection from '../../assets/lotties/lf30_editor_b0ep6v8m.json'
// import noConnection from '../../assets/lotties/lf20_nTfkVR.json'

import Lottie from 'react-lottie'

const NoConnection = (props) => {

    // Lottie code
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: noConnection,
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
