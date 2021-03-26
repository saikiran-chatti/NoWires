import React, { useState } from 'react';
import { GoVerified } from "react-icons/go";
import { VscClose } from "react-icons/vsc";
import Modal from '../../../Modal/Modal'
import './Snackbar.css'

const Snackbar = (props) => {

    const handleClose = () => {
        props.handleSnackbarClose();
    };

    return (
        <div>
            <div class="snackbar-frame-1" style={{ opacity: props.show ? '1' : '0' }}>
                <div class="snackbar-verified">
                    <GoVerified />
                </div>
                <p class="snackbar-text-1 poppins-medium-black-14px">Downloaded Successfully!&nbsp;&nbsp;Check Desktop/NoWires</p>
                <div class="close" onClick={handleClose}>
                    <VscClose color="#484848" />
                </div>
            </div>
        </div>
    );
}

export default Snackbar;