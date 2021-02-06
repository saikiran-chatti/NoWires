import React, { useEffect, useState } from 'react'
import { TweenMax } from 'gsap'
import axios from 'axios'
import Header from '../Header/Header'
import './Home.css'

const Home = () => {

    const [qrcodeImg, setqrcodeImg] = useState(null)

    useEffect(() => {
        TweenMax.from('.homeTitle', { autoAlpha: 0, opacity: 0, duration: 1, delay: 1.6, y: 30 });
        TweenMax.from('.homeDescription', { autoAlpha: 0, opacity: 0, duration: 1, delay: 1.8, y: 30 })
        TweenMax.from('.homeButton', { autoAlpha: 0, opacity: 0, duration: 1, delay: 2.1, y: 30 })
        TweenMax.from('.homeImg', { autoAlpha: 0, opacity: 0, duration: 1, delay: 1.3, y: 30 })
        QRCodeComponent();
    }, [])


    // create QRCode
    const QRCodeComponent = () => {
        axios.get('/generateQRImage')
            .then((res) => {
                console.log(res.data);
                setqrcodeImg(res.data)
            })
            .catch(() => {
                console.log('error while fetching image');
            });

    }

    return (
        <div className="l-main">
            <Header />
            <section className="home" id="home">
                <div className="homeContainer bd-grid">
                    <div className="homeImg">
                        <img className="mockup" alt="mockup"
                            src="/images/mockup2@1x.svg" />
                        <img className="qrcode" src={qrcodeImg} />
                    </div>
                    <div className="homeData">
                        <p className="homeTitle">Transfer files seamlessly without hassle, wires</p>
                        <p className="homeDescription">Transfer files without hassle <br /> of the week.</p>
                        <a className="homeButton" href="/home">Get Started</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;