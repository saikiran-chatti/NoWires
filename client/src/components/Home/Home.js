import React, { useEffect, useState } from 'react'
import { TweenMax } from 'gsap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../store/ftp/ftpTypes'
import Header from '../Header/Header'
import './Home.css'

const Home = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [qrcodeImg, setqrcodeImg] = useState(null)
    const [qrCodeData, setQrCodeData] = useState(null)
    const [loopState, setLoopState] = useState(true)

    useEffect(() => {
        TweenMax.from('.homeTitle', { autoAlpha: 0, opacity: 0, duration: 1, delay: 1.6, y: 30 });
        TweenMax.from('.homeDescription', { autoAlpha: 0, opacity: 0, duration: 1, delay: 1.8, y: 30 })
        TweenMax.from('.homeButton', { autoAlpha: 0, opacity: 0, duration: 1, delay: 2.1, y: 30 })
        TweenMax.from('.homeImg', { autoAlpha: 0, opacity: 0, duration: 1, delay: 1.3, y: 30 })
        QRCodeComponent();
    }, [])

    useEffect(() => {

        let interval = null;
        console.log('triggering');
        if (loopState) {
            // let check = false;
            interval = setInterval(() => {
                axios.post('/deleteDoc', { uniq_id: qrCodeData })
                    .then(res => {
                        if (res.data.data.secure === false) {
                            // check = true;
                            let userData = {
                                host: res.data.data.host,
                                port: res.data.data.port,
                                username: res.data.data.username,
                                password: res.data.password,
                                secure: res.data.data.secure
                            }
                            dispatch({ type: actionTypes.STORE_USER_DATA, value: userData })
                            history.push('/explorer')
                            setLoopState(false)
                        }
                    })
                    .catch(() => {
                        console.log('Error while deleting doc');
                    })
            }, 3000); // check every 3 seconds. Let's make it 2 😁😁 in testing.

            // if (check) {
            //     setLoopState(false)
            // }
        }
        else {
            clearInterval(interval)
        }

        return () => clearInterval(interval);

    });


    // create QRCode
    const QRCodeComponent = () => {
        axios.get('/generateQRImage')
            .then((res) => {
                console.log(res.data.data);
                setQrCodeData(res.data.data);
                setqrcodeImg(res.data.url);
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
                        <div className="qrcodeDiv">
                            <img alt="qrcode" className="qrcode" src={qrcodeImg} />
                        </div>
                    </div>
                    <div className="homeData">
                        <p className="homeTitle">Transfer files seamlessly without hassle, wires</p>
                        <p className="homeDescription">Transfer files without hassle <br /> of the week.</p>
                        <button className="homeButton" href="/home">Get Started</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;