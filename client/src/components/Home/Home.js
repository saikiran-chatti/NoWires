import React from 'react';
import './Home.css'

const Home = () => {
    return (
        <div className="l-main">
            <section className="home" id="home">
                <div className="homeContainer bd-grid">
                    <div className="homeImg">
                        <img alt="mockup"
                            src="/images/mockup@1x.svg" />
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