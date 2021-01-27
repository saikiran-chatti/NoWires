import React from 'react';
import './Home.css'
import Mockup from '../Mockup/Mockup'

const Home = () => {
    return (
        <div>
            <div className="l-main">
                <section className="home" id="home">
                    <div className="homeContainer bd-grid">
                        <div className="homeImg">
                            <Mockup />
                        </div>
                        <div className="homeData">
                            <p className="homeTitle">Transfer files seamlessly without hassle, Wires</p>
                            <p className="homeDescription">Transfer files without hassle <br /> of the week.</p>
                            <a className="homeButton" href="/home">Get Started</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;