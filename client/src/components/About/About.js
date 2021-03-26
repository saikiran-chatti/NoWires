import React from 'react';
import './About.css'
const About = () => {

    return (
        // <Progress percent={100} active color="black">
        //     Active
        // </Progress>
        // <div id="page-wrap">
        //     <div class="meter red">
        //         <span style={{width: "100%"}}></span>
        //     </div>
        // </div>

        <div class="Progressui Progressblack Progressactive progress" data-percent="90">
            <div class="Progressbar" style={{ width: "90%" }}></div>
            <div class="label">Active</div>
        </div>

        // <div class="ui container" style={{ margin: "20px" }}>
        //     <div class="bar" style={{ width: "90%" }}>
        //         ::after
        //     </div>
        // </div>

        
    )
}

export default About;