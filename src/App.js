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
//import OnePlayer from './OnePlayer.js'
import Player from './Player.js'
import Configurer from './Configurer.js'



// Importation du fichier de style
import './App.css'


// Déclaration des valeurs par défault
const DEFAULT_STATUE = 'BEGIN'
const DEFAULT_NB_TRY = 0
const DEFAULT_NB_TOTAL_TRY = 12
const DEFAULT_NB_PARTY = 3
const DEFAULT_PLAYER_ONE_NAME = "Player One"
const DEFAULT_PLAYER_TWO_NAME = "Player Two"
const DEFAULT_NB_PLAYER = 0
const DEFAULT_PLAYER_ONE = {
    playerName : "",
    score: 0,
    TableWordsToFind : [],
}

const DEFAULT_PLAYER_TWO = {playerName : "",
    score: 0,
    TableWordsToFind : [],}
/**
 * class de l'application.
 * Gère de façon globale ce qui se passe
 */
class App extends Component {
    state = {
        statue: 'MAIN_PAGE',
        nbPlayer: 0,
        nbPartiesToPlay: 0,
        nbTry: 1,
        nbTotalTry: 0,
        playerOne : {
            playerName : "Player One",
            score: 0,
            TableWordsToFind : [],
        },
        playerTwo : {
            playerName : "Player Two",
            score: 0,
            TableWordsToFind : [],
        },
    }


    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class App
     * @param props
     */
    constructor(props) {
        super(props)
        //console.log ("App::constructor()")
        //console.log ("App::constructor()::props: " + JSON.stringify(props))

        this.state = {
            statue: props.statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            playerOne : {
                playerName : props.playerOneName,
                score: props.playerOne.score,
                TableWordsToFind : [],
            },
            playerTwo : {
                playerName: props.playerTwoName,
                score: props.playerTwo.score,
                TableWordsToFind : [],
            },
        }

        this.onSelectNbPlayer = this.onSelectNbPlayer.bind(this)
        this.onConfigurer = this.onConfigurer.bind(this)
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
     * Méthode qui permet en, fonction de la valeur de index de savoir combien de joueurs participent
     * @param index
     */
    onSelectNbPlayer (index){
        console.log("App::onSelectNbPlayer()")
        // On itialise les variables statue et nbPlayer avec les valeurs par défaut
        let statue = this.state.statue
        let nbPlayer = this.state.nbPlayer
        // cas ou c'est une partie à un joueur qui est sélectionné
        if (index === 1){
            statue = 'NB_PLAYER_SELECTED'
            nbPlayer = 1
        }
        // cas ou c'est une partie à deux joueurs qui est sélectionné
        else if (index === 2){
            statue = 'NB_PLAYER_SELECTED'
            nbPlayer = 2
        }
        // On let à jour le state de App
        this.setState ({ statue: statue, nbPlayer: nbPlayer})
    }

    /**
     * Méthode qui permet de modifier les valeurs des propriétés de App
     * qui seront ensuite utilisées tout au long de la partie
     * @param index
     */
    onConfigurer (index){
        console.log("App::onConfigurer()")
        this.setState({
            statue: 'CONFIGURER',
        })
    }

    /**
     * Méthode qui permet de revenir sur la page principale lors du clic sur le bouton "Retour"
     * @param index
     */
    onReturn(index) {
        console.log("App::onConfigurer()")
        this.setState({statue: 'BEGIN', nbPlayer: 0})
    }

    /**
     * Permet l'affichage générale
     * @returns {*}
     */
    render() {
        console.log("App::render::state : " + JSON.stringify(this.state) )
        /**
         * statue : Etat de la page 3 valeurs possible
         *  NB_PLAYER_SELECTED : le nombre de joueur a été choisi
         *  CONFIGURER : pour afficher la page de configuration
         *  MAIN_PAGE : mode par défaut. Affiche la page principale
         * nbPlayer : nombre de joueurs
         * nbTotalTry : Nombre total d'essais
         * nbTry : Nombre d'essais déjà effectué ou en cours (démarrant à 0)
         * nbPartiesToPlay : Nombre de parties à joueur
         * partyInPlay : partie en cours
         * playerOne : info sur le joueur 1
         * playerTwo : info sur le joueur 2
         */
        const statue = this.state.statue
        const nbPlayer = this.state.nbPlayer
        const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerOne = this.state.playerOne
        const playerTwo = this.state.playerTwo

        if (statue === 'NB_PLAYER_SELECTED') {
            return (
                <Player
                    statue = {"BEGIN"}
                    nbPlayer = {nbPlayer}
                    partyInPlay = {1}
                    nbTry = {nbTry}
                    nbTotalTry = {nbTotalTry}
                    nbPartiesToPlay = {nbPartiesToPlay}
                    playerOne = {playerOne}
                    playerTwo = {playerTwo}
                    startNexParty = {false}
                />
            )
        }
        else if (statue === 'CONFIGURER') {
            /**
             * Permet d'appeler la classe qui s'occupera de la partie configuration du jeu
             */
            return(
                <Configurer
                    nbTotalTry = {nbTotalTry}
                    nbPartiesToPlay = {nbPartiesToPlay}
                    playerOneName = {playerOne.playerName}
                    playerTwoName = {playerTwo.playerName}
                />
            )
        }
        else {
            /**
             * Renvoie la page principale (page par défaut)
             * Elle affiche du texte (H2 et H3), puis 3 boutons
             * Lors de l'appuis sur l'un de ces boutons, une redirection se fera
             */
            return (
                <div className="App">
                    <Header />
                    <div className="Body">
                        <article className="H2" align="center">
                            Bienvenue dans le jeu du pendu.
                        </article>
                        <article className="H3" align="center">
                            Pour commencer, veuillez sélectionner si vous jouez à 1 ou 2 joueurs.
                        </article>
                        <div className="Btn-App">
                            <Button value={"1 joueur"} index={1} hidden={false} onClick={this.onSelectNbPlayer } />
                            <Button value={"2 joueurs"} index={2} hidden={false} onClick={this.onSelectNbPlayer} />
                            <Button value={"Configurer"} index={9} hidden={false} onClick={this.onConfigurer} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }

    }
}


// Valeurs transmise par défaut à App
App.defaultProps = {
    statue: DEFAULT_STATUE,
    nbPlayer: DEFAULT_NB_PLAYER,
    nbTotalTry: DEFAULT_NB_TOTAL_TRY,
    nbTry: DEFAULT_NB_TRY,
    nbPartiesToPlay: DEFAULT_NB_PARTY,
    playerOneName: DEFAULT_PLAYER_ONE_NAME,
    playerTwoName: DEFAULT_PLAYER_TWO_NAME,
    playerOne: DEFAULT_PLAYER_ONE,
    playerTwo: DEFAULT_PLAYER_TWO
}

export default App
