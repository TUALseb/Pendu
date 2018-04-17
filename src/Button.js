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

