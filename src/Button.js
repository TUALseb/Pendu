/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

/**
 * Nous allons à ce niveau gérer une lettre
 */

const Button = ({value, index, onClick }) => (

    <div className="Btn-Property" onClick={() => onClick(index)}>
        <span>
            {value}
        </span>
    </div>
)


/**
 * Pour gérer les propriétés particiulières d'une lettre
 * @type {{letter: *, index: *, onClick: *}}
 */
Button.propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}




export default Button

