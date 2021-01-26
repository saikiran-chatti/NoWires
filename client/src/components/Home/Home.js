import React from 'react';
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className="l-main">
                <section className="home" id="home">
                    <div className="homeContainer bd-grid">
                        
                    </div>

                    <div className="homeData">
                        <h1 className="homeTitle">Coffee <br /> Drink 3D</h1>
                        <p className="homeDescription">Let's help discover the best coffee drink <br /> of the week.</p>
                        <a href="#" className="homeButton">Get Started</a>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home;