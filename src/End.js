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
 * Classe qui ve gérer l'affichage à le fin du jeu
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
        },
        playerTwo : {
            playerName : "",
            score: 0,
            TableWordsToFind : [],
        },
    }

    /**
     * Constructeur
     * Permet d'initialiser les propriétés avec des valeurs par défaut de la class End
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
                playerName : props.playerOne.playerName,
                score: props.playerOne.score,
                TableWordsToFind : [],
            },
            playerTwo : {
                playerName: props.playerTwo.playerName,
                score: props.playerTwo.score,
                TableWordsToFind : [],
            },
        }

        // on déclare les méthodes qui doivent être attaché à this
        this.onReturn = this.onReturn.bind(this)

    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("End::componentDidMount()")
        //console.log ("App::State: " + JSON.stringify(this.state))
    }


    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {
        console.log ("End::componentDidMount()")
        document.removeEventListener("keypress", this.onKeyPress)
    }

    /**
     * Méthode qui permet de revenir sur la page principale
     * @param index
     */
    onReturn(index) {
        this.setState({statue: 'MAIN_PAGE'})
    }

    render() {
        console.log ("End::render()")
        //console.log("End::render:state :" + JSON.stringify(this.state))
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
            const playerOne = this.state.playerOne

            return (
                <div className="App">
                    <Header />
                    <div className="Body">
                        <div className="H3">
                            Bravo {playerOne.playerName}!
                        </div>
                        <div className="Text">
                            Vous avez terminé la partie. <br/>
                            Votre score total est de  : {playerOne.score}
                        </div>
                        <div className="Btn-Ap">
                            <Button className={"Btn-Property"} value={"Retour au menu principal"} index={0} onClick={this.onReturn } />
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
            const playerOne = this.state.playerOne
            const playerTwo =this.state.playerTwo
            return (
                <div className="App">
                    <Header />
                    <div className="Body">
                        <div className="Selection">
                            <div className="Choice">
                                <div className="H3">
                                    Bravo {playerOne.playerName}!
                                </div>
                                <div className="Text">
                                    Vous avez terminé la partie. <br/>
                                    Votre score total est de  : {playerOne.score}
                                </div>
                            </div>
                            <div className="Choice">
                                <div className="H3">
                                    Bravo {playerTwo.playerName}!
                                </div>
                                <div className="Text">
                                    Vous avez terminé la partie. <br/>
                                    Votre score total est de  : {playerTwo.score}
                                </div>
                            </div>
                        </div>
                        <div  className="Selection">
                            <div className="H3">
                                Le gagant est : {(playerOne.score>playerTwo.score)? playerOne.playerName:playerTwo.playerName}
                            </div>
                        </div>
                        <div className="Btn-Ap">
                            <Button className={"Btn-Property"} value={"Retour au menu principal"} index={0} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        } // Fin du else
    }// Fermeture du render
}


export default End