/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import React, { Component } from 'react'

import Game from './Game.js'
import App from './App.js'

const TABLE_WORDS_TO_FIND = ["hello", "jeu du pendu", "react", "apprivoiser", "voici le célèbre jeu du pendu", "ça marche", "association",]

/**
 * Classe qui gère le jeu de façon monojoueur
 * Son but principal est de fournir, en plus des valeurs par défaut, un mot ou une phrase pris de façon aléatoire dans le tabelau
 * ci-dessus
 */
class OnePlayer extends Component {

    state = {
        statue: '',
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry: 1,
        nbTotalTry: 0,
        playerName: "",
        score: 0,
        image: "",
        alt: "",
        wordToFind: "",
        startNewParty: false,
    }

    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class OnePlayer
     * @param props
     */
    constructor(props) {
        super(props)
        //console.log ("OnePlayer::constructor()")
        //console.log ("props: " + JSON.stringify(props))
        // Nous allons créer un index de façon aléatoire, pour ensuite récupérer la valeur correspondante dans notre tableau de mots/phrases
        const index = Math.round(Math.random()*TABLE_WORDS_TO_FIND.length)

        this.state = {
            statue: props.statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            partyInPlay: props.partyInPlay,
            nbPartiesToPlay: props.nbPartiesToPlay,
            score: props.score,
            playerName: props.playerName,
            image: props.image,
            alt: props.alt,
            wordToFind: TABLE_WORDS_TO_FIND[index],
            startNewParty: props.startNewParty,
        }
    }

    /**
     Appelé en second juste avant le render()
     */
    componontWillMount(statue, nbPlayer) {
        //console.log ("OnePlayer::componentWillMount()")
        //console.log ("state : " + this.state)

    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("OnePlayer::componentDidMount()")
        //console.log ("OnePlayer::State: " + JSON.stringify(this.state))
    }


    componentWillReceiveProps({ statue='BEGIN', nbPlayer=0 }) {
        //console.log ("OnePlayer::componentWillReceiveProps()")
        //this.setState({ statue, nbPlayer })
    }

    componentDidUnMount() {

    }


    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUmount() {

    }


    /**
     * Permet l'affichage générale
     * @returns {*}
     */
    render() {
        /**
         * statue : Etat de la page 4 valeurs possible
         *  ONE_PLAYER : mode monojoueur
         *  TWO_PLAYER : mode 2 joueurs
         *  CONFIGURER : pour afficher la page de configuyration
         *  BEGIN : mode par défaut. Affiche la page principale
         * playerName : Nom du joueur
         * nbPartiesToPlay : Nombre de parties à joueur
         * partyInPlay partie(s) jouée(s) ou en cours
         * score : score actuelle
         * nbTotalTry : Nombre total d'essais
         * nbTry : Nombre d'essais déjà effectué ou en cours (démarrant à 0)
         * image : image à afficher
         * alt : alternative si image existe pas
         * wordToFind : mot ou phrase à trouver pris de façon aléatoire dans le tableau
         */
        const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerName = this.state.playerName
        const wordToFind = this.state.wordToFind
        const startNewParty = this.state.startNewParty
        const partyInPlay = this.state.partyInPlay
        const score = this.state.score
        //console.log("this.state : " + JSON.stringify(this.state))
        if (partyInPlay < nbPartiesToPlay) {
            return (
                <Game
                    playerName = {playerName}
                    nbPartiesToPlay = {nbPartiesToPlay}
                    partyInPlay = {partyInPlay}
                    nbTry = {nbTry}
                    nbTotalTry = {nbTotalTry}
                    score = {score}
                    wordToFind = {wordToFind}
                    startNewParty = {startNewParty}
                />
            )
        }
        else{
            return (
                <App/>
            )
        }
    }
}


export default OnePlayer;