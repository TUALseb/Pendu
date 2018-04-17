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