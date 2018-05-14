/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'

//Importation des fichier js que nous aurons besoin
import Header from './Header.js'
import Footer from './Footer.js'
import Button from './Button.js'
import App from './App.js'

// Importation du fichier de style
import './App.css'


class About extends Component {
    state = {
        statue: 'VERSION',
        version: 0.2,
    }

    constructor(props) {
        super(props)
        this.onReturn = this.onReturn.bind(this)
    }

    onReturn() {
        this.setState({statue: "MAIN_PAGE"})
    }

    render() {
        const statue = this.state.statue
        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'MAIN_PAGE') {
            return ( <App /> )
        }
        else {
            const version = this.state.version
            return (
                <div className="App">
                    <Header />
                    <div className="About">
                        <div>
                            Jeu du pendu version : {version}
                        </div>
                        <div className="Buttons">
                            <Button className={"Btn-Property"} value={"Retour"} index={1} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }

}
}

export default About

