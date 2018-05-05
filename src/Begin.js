/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React from 'react'
//import PropTypes from 'prop-types'


import Button from './Button.js'

import './Begin.css'


const Begin = ({text, index, onClick}) => {
    <div className="Body-Selection">
        <h2> Vous avez deux choix : </h2>
        <div className="Selection">
            <div className="Choice">
                <h3> Les mots (ou phrase) à trouver sont pris au hasard</h3>
                <Button value={"Sélectionner"} index={1} hidden={false} onClick={() => onClick(index) } />
            </div>
            <div className="Choice">
                <h3> Vous décidez et entrez les mot (ou phrase) à trouver</h3>
                <Button value={"Sélectionner"} index={2} hidden={false} onClick={() => onClick(index) } />
            </div>
        </div>
        <div className="Btn-Ap">
            <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={() => onClick(index) } />
        </div>
    </div>
}

export default Begin