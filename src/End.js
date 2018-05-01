/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'

import App from './App.js'
import Header from './Header.js'
import Footer from './Footer.js'
import Button from './Button.js'


import './End.css'

/**
 * Classe qui ve gérer l'affrichage à le fin du jeu
 */
class End extends Component {
    state = {
        statue: '',
        nbPlayer: 0,
        nbPartiesToPlay: 0,
        nbTry: 1,
        nbTotalTry: 0,
        playerOne : {
            playerName : "",
            score: 0,
            TableWordsToFind : [],
            image: "",
            alt: "",
        },
        playerTwo : {
            playerName : "",
            score: 0,
            TableWordsToFind : [],
            image: "",
            alt: "",
        },
    }

    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class End
     * @param props
     */
    constructor(props){
        super(props)

        this.state = {
            statue: props.statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            playerOne : {
                playerName : props.playerOneName,
                score: props.score,
                TableWordsToFind : [],
                image: props.image,
                alt: props.alt,
            },
            playerTwo : {
                playerName: props.playerTwoName,
                score: props.score,
                TableWordsToFind : [],
                image: props.image,
                alt: props.alt,
            },
        }

        // on déclare les méthodes qui doivent être attaché à this
        this.onReturn = this.onReturn.bind(this)

    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("App::componentDidMount()")
        //console.log ("App::State: " + JSON.stringify(this.state))
    }


    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {

    }

    /**
     * Méthode qui permet de revenir sur la page principale
     * @param index
     */
    onReturn(index) {
        this.setState({statue: 'MAIN_PAGE'})
    }

    render() {
        const nbPlayer = this.state.nbPlayer
        const statue = this.state.statue
        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'MAIN_PAGE') {
            return ( <App /> )
        }
        /**
         * Il n'y a qu'un seul joueur de choisi
         */
        else if (nbPlayer === 1) {
            const PlayerOne = this.state.playerOne

            return (
                <div className="App">
                    <Header />
                    <div className="Body">
                        <div className="H3">
                            Bravo {PlayerOne.playerName}!
                        </div>
                        <div className="Text">
                            Vous avez terminé la partie. <br/>
                            Votre score total est de  : {PlayerOne.score}
                        </div>
                        <div className="Btn-Ap">
                            <Button value={"Retour au menu principal"} index={1} hidden={false} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        /**
         * Il y a 2 joueurs
         */
        else {
            const PlayerOne = this.state.playerOne
            const PlayerTwo =this.state.playerTwo

            return (
                <div className="App">
                    <Header />
                    <div className="Body">
                        <div className="H3">
                            Bravo {PlayerOne.playerName}!
                        </div>
                        <div className="Text">
                            Vous avez terminé la partie. <br/>
                            Votre score total est de  : {PlayerOne.score}
                        </div>
                        <div className="Btn-Ap">
                            <Button value={"Retour au menu principal"} index={1} hidden={false} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        } // Fin du else
    }// Fermeture du render
}


export default End