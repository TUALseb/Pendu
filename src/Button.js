/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */

import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

/**
 * Nous allons à ce niveau gérer le texte à afficher
 */

const Button = ({value, index, hidden, onClick }) => (
    <div className="Btn-Property" hidden={hidden} onClick={() => onClick(index)}>
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

