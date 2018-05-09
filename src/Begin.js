/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React from 'react';
import PropTypes from 'prop-types'


import Button from './Button.js';
import BackToMainPage from './BackToMainPage.js'

import './Begin.css';


const Begin = ({onClick}) => (
    <div className="Body">
        <h2> Vous avez deux choix : </h2>
        <div className="Selection">
            <div className="Choice">
                <h3> Les mots (ou phrase) à trouver sont pris au hasard</h3>
                <Button className={"Btn-Property"} value={"Sélectionner"} index={1} onClick={() => onClick(1) } />
            </div>
            <div className="Choice">
                <h3> Vous décidez et entrez les mot (ou phrase) à trouver</h3>
                <Button className={"Btn-Property"} value={"Sélectionner"} index={2} onClick={() => onClick(2)  } />
            </div>
        </div>
        <BackToMainPage onClick={()=>onClick(0)}/>
    </div>
)

Begin.propTypes = {
    onClick: PropTypes.func.isRequired,
}


export default Begin;