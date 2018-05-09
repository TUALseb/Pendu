/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React from 'react'
import PropTypes from 'prop-types'


import Button from './Button.js'

import './BackToMainPage.css'


const BackToMainPage = ({onClick}) =>(
    <div className="Btn-Ap">
        <Button className={"Btn-Property"} value={"Retour au menu principal"} index={0} onClick={() => onClick(0)} />
    </div>
)


/**
 * Pour gérer les propriétés particiulières d'une lettre
 * @type {{letter: *, index: *, onClick: *}}
 */
BackToMainPage.propTypes = {
    onClick: PropTypes.func.isRequired,
}



export default BackToMainPage
