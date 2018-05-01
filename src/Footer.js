/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */

import React, { Component } from 'react'

// Importation du fichier de style
import './Footer.css'
//Importation des fichier js que nous aurons besoin

class Footer extends Component {
    render () {
        return (
            <header className="App-footer">
                <h1 className="Copyright">@ Sébastien TUAL - 2018</h1>
                <h2 className="Text">powerd by React v16.3.2</h2>
            </header>
        )
    }
}

export default Footer


