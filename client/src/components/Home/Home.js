import React, { useEffect } from 'react'
import { TweenMax } from 'gsap'

import './Home.css'

const Home = () => {

    useEffect(() => {
        TweenMax.from('.homeTitle   ', { opacity: 0, duration: 1, delay: 1.6, y: 30 });
        TweenMax.from('.homeDescription', { opacity: 0, duration: 1, delay: 1.8, y: 30 })
        TweenMax.from('.homeButton', { opacity: 0, duration: 1, delay: 2.1, y: 30 })
        TweenMax.from('.homeImg', { opacity: 0, duration: 1, delay: 1.3, y: 30 })

    }, [])

    return (
        <div className="l-main">
            <section className="home" id="home">
                <div className="homeContainer bd-grid">
                    <div className="homeImg">
                        <img className="mockup" alt="mockup"
                            src="/images/mockup@1x.svg" />

                        {/* <img className="qrcode" src="/images/qr-code.png" /> */}
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