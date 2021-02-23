import React from 'react'
import './Backdrop.css'

const backdrop = props => (
    props.show ? <div className="Backdrop" style={{ backgroundColor: props.color }} onClick={props.clicked}></div> : null
)

export default backdrop