import React from 'react';
import './Phone.css'
import {open} from "@tauri-apps/api/shell"

const Phone = () => {
    return (
        <div className="homeContainer bd-grid phonescreen">
            <img className="phone-homescreen-2" alt="phone-UI"
                height="547px"
                width="268px"
                src="/images/homescreen.png" />
            <div className="phone-frame-1">
                <h1 className="phone-text-1 poppins-semi-bold-black-36px">Transfer files with NoWires app and website.</h1>
                <div className="phone-text-2 poppins-regular-normal-black-18px">
                    Seamlessly transfer files between laptop to phone viceversa just by downloading No Wires app. No Wires provides great
                    UI for accessing phone files directly from your laptop.
                </div>
                <div className="phone-flex-row">
                    <div className="phone-start"><div onClick={async () => await open("https://play.google.com/store/apps/details?id=me.jayanthsaikiran.nowires")} className="phone-label phone-valign-text-middle poppins-semi-bold-white-18px">PlayStore</div></div>
                </div>
            </div>
        </div>

    )
}

export default Phone;