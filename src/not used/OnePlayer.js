/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */

import React, { Component } from 'react'

import Game from '../Game.js'
//import App from './App.js'
//import Header from './Header.js'
//import Footer from './Footer.js'
//import Button from './Button.js'


import '../Game.css'


//const TABLE_WORDS_TO_FIND = ["hello", "jeu du pendu", "react", "apprivoiser", "voici le célèbre jeu du pendu", "ça marche", "association"]

/**
 * Classe qui gère le jeu de façon monojoueur
 * Son but principal est de fournir, en plus des valeurs par défaut, un mot ou une phrase pris de façon aléatoire dans le tabelau
 * ci-dessus
 */
class OnePlayer extends Component {

    state = {
        statue: 'BEGIN',
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry: 0,
        nbTotalTry: 0,
        playerName: "",
        score: 0,
        image: "",
        alt: "",
        tableWordsToFind: [],
        startNewParty: false,
        playerOne: {},
        playerTwo: {},
    }

    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class OnePlayer
     * @param props
     */
    constructor(props) {
        super(props)
        console.log ("OnePlayer::constructor()")
        console.log ("OnePlayer::constructor():props: " + JSON.stringify(props))

        this.state = {
            statue: props.statue,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            partyInPlay: props.partyInPlay,
            nbPartiesToPlay: props.nbPartiesToPlay,
            score: props.score,
            playerName: props.playerName,
            image: props.image,
            alt: props.alt,
            tableWordsToFind: props.tableWordsToFind,
            startNewParty: props.startNewParty,
            playerOne: props.playerOne,
            playerTwo: props.playerTwo,
        }

    }



    /**
     * Permet l'affichage générale
     * @returns {*}
     */
    render() {
        /**
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
        const statue = this.state.statue
        const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const startNewParty = this.state.startNewParty
        const partyInPlay = this.state.partyInPlay
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerName = this.state.playerName
        const wordToFind = this.state.tableWordsToFind[partyInPlay-1]
        const score = this.state.score
        const tableWordsToFind = this.state.tableWordsToFind
        console.log("this.state : " + JSON.stringify(this.state))

        return (
            <Game
                statue = {statue}
                playerName = {playerName}
                nbPartiesToPlay = {nbPartiesToPlay}
                partyInPlay = {partyInPlay}
                nbTry = {nbTry}
                nbTotalTry = {nbTotalTry}
                score = {score}
                wordToFind = {wordToFind}
                startNewParty = {startNewParty}
                tableWordsToFind = {tableWordsToFind}
            />
        )

    }
}


export default OnePlayer;