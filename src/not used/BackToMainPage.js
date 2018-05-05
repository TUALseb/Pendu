/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'


import App from '../App.js'
import Button from '../Button.js'

import './BackToMainPage.css'

class BackToMainPage extends Component{
    state = {
        statue: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            statue: props.statue
        }
        // on déclare les méthodes qui doivent être attaché à this, sinon les données de la classe ne sera pas accessible
        // (this aura changé à l'intérioeur des méthodes)
        this.onReturn = this.onReturn.bind(this)
    }

    /**
     * Méthode qui permet de revenir sur la page principale
     * @param index
     */
    onReturn(index)  {
        //console.log ("Game::onReturn()")
        this.setState({statue: 'BEGIN'})
    }

    render() {
        const statue = this.state.statue
        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'BEGIN') {
            return ( <App /> )
        }
        else {
            return (
                <div className="Btn-Ap">
                    <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onReturn } />
                </div>
            )
        }
    }
}

export default BackToMainPage
