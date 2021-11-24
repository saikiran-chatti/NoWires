import React, { useEffect, useState } from "react";
import { TweenMax } from "gsap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../store/ftp/ftpTypes";
import Header from "../../components/Header/Header";
import "./Home.css";
import Phone from "../../components/PhoneSection/Phone";
import Footer from "../../components/Footer/Footer";

import { fetch, Body } from "@tauri-apps/api/http";
import { appWindow, getCurrent } from "@tauri-apps/api/window";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [qrcodeImg, setqrcodeImg] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const selectedWindow = getCurrent().label;
      const windowMap = {
        [selectedWindow]: appWindow
      }
      windowMap[selectedWindow].maximize();
    }
    catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
  
    TweenMax.from(".homeTitle", {
      autoAlpha: 0,
      opacity: 0,
      duration: 1,
      delay: 1.6,
      y: 30,
    });
    TweenMax.from(".homeDescription", {
      autoAlpha: 0,
      opacity: 0,
      duration: 1,
      delay: 1.8,
      y: 30,
    });
    TweenMax.from(".homeButton", {
      autoAlpha: 0,
      opacity: 0,
      duration: 1,
      delay: 2.1,
      y: 30,
    });
    TweenMax.from(".homeImg", {
      autoAlpha: 0,
      opacity: 0,
      duration: 1,
      delay: 1.3,
      y: 30,
    });

    QRCodeComponent();
  }, []);

  useEffect(() => {
    let interval = null;

    if (count < 10) {
      interval = setInterval(() => {

        fetch('http://localhost:8000/deleteDoc', {
          method: 'POST',
          body: Body.json({ uniq_id: qrCodeData })
        }).then((res) => {
          if (res.data.secure === false) {
            // check = true;
            let userData = {
              host: res.data.host,
              port: res.data.port,
              username: res.data.username,
              password: res.data.password,
              secure: res.data.secure,
              megAvailable: res.data.megAvailable,
              usedSpace: res.data.usedSpace,
              totalSize: res.data.totalSize,
            };
            console.log(userData);
            dispatch({ type: actionTypes.STORE_USER_DATA, value: userData });
            history.push("/explorer");
          }
        })
          .catch((e) => {
            console.log("Error while deleting doc " + e);
          });

        setCount(count + 1);
      }, 2000);
    } else {
      setqrcodeImg("/images/reload.png");
    }
    return () => clearInterval(interval);
  }, [count, qrCodeData, dispatch, history]);

  // create QRCode
  const QRCodeComponent = () => {
    setCount(0);

    fetch('http://localhost:8000/generateQRImage', {
      method: 'GET'
    }).then((res) => {
      console.log(res.data.data);
      setQrCodeData(res.data.data);
      setqrcodeImg(res.data.url);
    })
      .catch(() => {
        setqrcodeImg("/images/reload.png");
        console.log("error while fetching image");
      });

  };

  return (
    <div className="l-main">
      <Header />
      <section className="home" id="home">
        <div className="homeContainer bd-grid">
          <div className="homeImg">
            <img className="mockup" alt="mockup" src="/images/mockup2@1x.svg" />
            <div className="qrcodeDiv">
              <img
                alt="qrcode"
                className="qrcode"
                onClick={QRCodeComponent}
                src={qrcodeImg}
              />
            </div>
          </div>
          <div className="homeData">
            <p className="homeTitle">
              Browse files seamlessly without hassle, wires
            </p>
            <p className="homeDescription">
              Download the NoWires app <br /> from playstore.
            </p>
            <button className="homeButton" href="/home">
              Download App
            </button>
          </div>
        </div>
      </section>
      <section className="phonesection" id="phonesection">
        <Phone />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
