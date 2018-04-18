/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import React, { Component } from 'react'
// Importation du fichier de style
import './Header.css'
//Importation des fichier js que nous aurons besoin

class Header extends Component {
    render () {
        return (
            <header className="App-header">
                <h1 className="App-title">Bienvenue au jeu du pendu</h1>
            </header>
        )
    }
}

export default Header