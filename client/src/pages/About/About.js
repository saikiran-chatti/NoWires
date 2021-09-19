import React from "react";
import "./About.css";
import { AiFillLinkedin } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import PlainHeader from "../../components/PlainHeader/PlainHeader";

const About = () => {
  return (
    <div>
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
          </p>

          <div className="social-media-icons-about">
            <FaTwitter
              color="#000"
              cursor="pointer"
              onClick={() =>
                window.open("https://twitter.com/jayanthsaikiran", "_blank")
              }
            />
            <ImInstagram
              color="#000"
              cursor="pointer"
              onClick={() =>
                window.open("https://instagram.com/jayanthsaikiran", "_blank")
              }
            />
            <AiFillLinkedin
              color="#000"
              cursor="pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/jayanthsaikiran/",
                  "_blank"
                )
              }
            />
          </div>

          {/* <ul className="social-list">
            <li>
              <a className="icon icon-mail" href="mailto:jonny@toyfight.co"></a>
            </li>
            <li>
              <a
                target="_blank"
                className="icon icon-twitter"
                href="https://twitter.com/johnnyLander"
              ></a>
            </li>
            <li>
              <a
                target="_blank"
                className="icon icon-behance"
                href="https://www.behance.net/mrjonlander"
              ></a>
            </li>
            <li>
              <a
                target="_blank"
                className="icon icon-dribbble"
                href="https://dribbble.com/jonnyLander"
              ></a>
            </li>
            <li>
              <a
                target="_blank"
                className="icon icon-linkedin"
                href="https://www.linkedin.com/in/jonlander"
              ></a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default About;
