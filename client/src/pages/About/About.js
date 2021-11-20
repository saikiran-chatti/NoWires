import React from "react";
import "./About.css";

import PlainHeader from "../../components/PlainHeader/PlainHeader";

const About = () => {
  return (
    <div className="aboutContainer">
      <PlainHeader />
      <div className="homeContainer bd-grid">
        <div className="homeImg aboutImg" style={{ visibility: "visible" }}>
          <img
            style={{ objectFit: "cover" }}
            className="mockup"
            alt="mockup"
            src="/images/pixeltrue-support.svg"
          />
        </div>
        <div className="homeData">
          <p
            className="homeTitle"
            style={{ visibility: "visible", fontSize: "50px" }}
          >
            Jayanth Saikiran
          </p>

          <p className="homeDescription aboutDescription" style={{ visibility: "visible" }}>
          I’m a Web Developer with a passion for participate in every stage of digital product,
           from discovery to delivery. Helping to focus the business goals on users.I am currently
           working as a WebDeveloper and I'm looking for new opportunities.

          </p>

          <div className="social-media-icons-about">
            <img src="/images/linkedinBlack.svg" alt="linkedin" onClick={() => window.open("https://www.linkedin.com/in/jayanthsaikiran/", "_blank")}/>
            <img src="/images/githubBlack.svg" alt="github" onClick={() => window.open("https://github.com/jayanthsaikiran", "_blank")}/>
            <img src="/images/twitterBlack.svg" alt="twitter" onClick={() => window.open("https://twitter.com/jayanthsaikiran", "_blank")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
