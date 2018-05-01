/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'

//
import Game from './Game.js'
import App from './App.js'
import Header from './Header.js'
//import BackToMainPage from './BackToMainPage.js'
import Footer from './Footer.js'
import Button from './Button.js'
import End from './End.js'


import './Player.css'
import OnePlayer from "./OnePlayer";

const TABLE_WORDS_TO_FIND = ["hello", "jeu du pendu", "react", "apprivoiser", "voici le célèbre jeu du pendu", "ça marche", "association",]


class Player extends Component{
    state = {
        statue: 'BEGIN',
        nbPartiesToPlay: 0,
        partyInPlay: 1,
        nbTry: 1,
        nbTotalTry: 0,
        playerOne : {
            playerName : "",
            score: 0,
            tableWordsToFind : [],
        },
        playerTwo : {
            playerName : "",
            score: 0,
            tableWordsToFind : [],
        },
        startNewParty: false,
    }

    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class OnePlayer
     * @param props
     */
    constructor(props) {
        super(props)
        console.log ("Player::constructor()")
        console.log ("Player::constructor::props: " + JSON.stringify(props))
        console.log ("Player::constructor::state: " + JSON.stringify(this.state))

        let tableWordsToFindPlayerOne = []
        let tableWordsToFindPlayerTwo = []
        let scorePlayerOne = 0
        let scorePlayerTwo = 0
        let partyInPlay = 1
        if (props.statue === 'NEXT') {
            // Nous récupérons le tableau de mot déjà crée
            tableWordsToFindPlayerOne = props.playerOne.tableWordsToFind
            tableWordsToFindPlayerTwo = props.playerTwo.TableWordsToFind
        }
        if (props.playerName === props.playerOne.playerName) {
            scorePlayerOne = props.playerOne.score + props.score
        }
        else {
            scorePlayerTwo = props.playerTwo.score + props.score
        }
        if (props.nbPlayer===1) {
            partyInPlay = props.partyInPlay
        }

        this.state = {
            statue: props.statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: partyInPlay,
            playerOne : {
                playerName : props.playerOne.playerName,
                score: scorePlayerOne,
                tableWordsToFind : tableWordsToFindPlayerOne,
            },
            playerTwo : {
                playerName : props.playerTwo.playerName,
                score: scorePlayerTwo,
                tableWordsToFind : tableWordsToFindPlayerTwo,
            },
            startNewParty: props.startNewParty,
        }
        // on déclare les méthodes qui doivent être attaché à this, sinon les données de la classe ne sera pas accessible
        // (this aura changé à l'intérioeur des méthodes)
        this.onReturn = this.onReturn.bind(this)
        //this.onKeyPress = this.onKeyPress.bind(this)
        this.onChoice = this.onChoice.bind(this)
        //this.onChangeWordToFind = this.onChangeWordToFind.bind(this)
        this.onStart = this.onStart.bind(this)
    }

    /**
     * Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("Player::componentDidMount()")
        //console.log ("Player::componentDidMount()::State: " + JSON.stringify(this.state))

    }

    componentWillMount(props){
        //console.log ("Player::componentWillMount()::State: " + JSON.stringify(this.state))
        //console.log ("Player::componentWillMount()::State: " + JSON.stringify(props))
    }

    /**
     *  Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {

    }

    /**
     * Méthode qui permet de revenir sur la page principale
     * @param index
     */
    onReturn(index)  {
        console.log ("Game::onReturn()")
        this.setState({statue: 'MAIN_PAGE'})
    }


    /**
     *
     * @param index
     */
    onChoice(index) {
        //console.log ("Game::onChoice()")
        if (index === 1){
            console.log ("PlayerTwo::state : " + JSON.stringify(this.state))
            const playerOneName = this.state.playerOne.playerName
            const playerTwoName = this.state.playerTwo.playerName
            const scorePlayerOne = this.state.playerOne.score
            const scorePlayerTwo = this.state.playerTwo.score
            let tableWordsToFindForPlayerOne = []
            let tableWordsToFindForPlayerTwo = []

            // Pour chaque joueur, on va choisir les mots (ou phrases) de façon aléatoire

                for (let pos = 0 ; pos < this.state.nbPartiesToPlay ; pos++) {
                    let posInTableWord = Math.round(Math.random()*TABLE_WORDS_TO_FIND.length)
                    //if (posInTableWord === TABLE_WORDS_TO_FIND.length) { posInTableWord = TABLE_WORDS_TO_FIND.length -1 }
                    tableWordsToFindForPlayerOne.push(this.getRandomWord (tableWordsToFindForPlayerOne, tableWordsToFindForPlayerTwo, posInTableWord))
                    tableWordsToFindForPlayerTwo.push(this.getRandomWord (tableWordsToFindForPlayerOne, tableWordsToFindForPlayerTwo, posInTableWord))

                }
            console.log (tableWordsToFindForPlayerOne)
            console.log (tableWordsToFindForPlayerTwo)
            this.setState({
                statue: 'PLAY',
                playerOne: {
                    playerName : playerOneName,
                    score: scorePlayerOne,
                    tableWordsToFind: tableWordsToFindForPlayerOne,
                },
                playerTwo: {
                    playerName : playerTwoName,
                    score: scorePlayerTwo,
                    tableWordsToFind: tableWordsToFindForPlayerTwo,
                },
            })
        }
        else {
            this.setState({statue: 'ENTER_WORDS'})
        }
    }
    /**
     *
     * @param index
     */
    onStart(index) {
        //console.log("PlayerTwo::onStart()")
        //console.log("PlayerTwo::onStart()::state : " + JSON.stringify(this.state))
        const playerOneName = this.state.playerOne.playerName
        const playerTwoName = this.state.playerTwo.playerName
        const scorePlayerOne = this.state.playerOne.score
        const scorePlayerTwo = this.state.playerTwo.score
        const tableWordsToFindForPlayerOne = this.state.playerOne.tableWordsToFind
        const tableWordsToFindForPlayerTwo = this.state.playerTwo.tableWordsToFind
        this.setState({
            statue: 'START',
            playerOne: {
                playerName : playerOneName,
                score: scorePlayerOne,
                tableWordsToFind: tableWordsToFindForPlayerOne,
            },
            playerTwo: {
                playerName : playerTwoName,
                score: scorePlayerTwo,
                tableWordsToFind: tableWordsToFindForPlayerTwo,
            },

        })
    }




    /**
     * Méthode qui permet d'obtenir un mot différent d'un déjà choisi
     * @param tableWordsToFind
     * @param index
     * @returns {string}
     */
    getRandomWord(tableWordsToFindForPlayerOne, tableWordsToFindForPlayerTwo, index) {
        /*
        console.log("getRandomWord :: " + tableWordsToFindForPlayerOne.indexOf(TABLE_WORDS_TO_FIND[index]) + ", " +
            tableWordsToFindForPlayerTwo.indexOf(TABLE_WORDS_TO_FIND[index]) + " , val : " + TABLE_WORDS_TO_FIND[index] + " , index : " + index
        )
        */
        // Pour éviter de se trouver en dehors du tableau
        if (index === TABLE_WORDS_TO_FIND.length) {
            index = TABLE_WORDS_TO_FIND.length-1
        }

        let wordToAdd = TABLE_WORDS_TO_FIND[index]
        let indexInTableWordsToFindPlayerOne = tableWordsToFindForPlayerOne.indexOf(wordToAdd)
        let indexInTableWordsToFindPlayerTwo = tableWordsToFindForPlayerTwo.indexOf(wordToAdd)
        // On vérifie que le mot n'est pas présent dans les deux tableaux
        if ((indexInTableWordsToFindPlayerOne === -1) && (indexInTableWordsToFindPlayerTwo === -1)){
            //console.log ( "tableWordsToFindForPlayerOne : " + tableWordsToFindForPlayerOne + " , tableWordsToFindForPlayerTwo : " + tableWordsToFindForPlayerTwo)
            // Il n'est pas présent dans les deux tableaux : on le retourne
            return wordToAdd
        }
        else {
            //console.log ("Le mot est déjà dans l'un des tableaux : On en cherche un autre")
            //console.log ( "tableWordsToFind : " + tableWordsToFindForPlayerOne + " , tableWordsToFindForPlayerTwo : " + tableWordsToFindForPlayerTwo)
            while ((indexInTableWordsToFindPlayerOne !== -1) || (indexInTableWordsToFindPlayerTwo !== -1)) {
                let newIndex = Math.round(Math.random()*TABLE_WORDS_TO_FIND.length)
                if (newIndex === TABLE_WORDS_TO_FIND.length) { newIndex = TABLE_WORDS_TO_FIND.length-1}
                wordToAdd = TABLE_WORDS_TO_FIND[newIndex]
                indexInTableWordsToFindPlayerOne = tableWordsToFindForPlayerOne.indexOf(wordToAdd)
                indexInTableWordsToFindPlayerTwo = tableWordsToFindForPlayerTwo.indexOf(wordToAdd)
                //console.log ( "tableWordsToFind : " + indexInTableWordsToFindPlayerOne + " , tableWordsToFindForPlayerTwo : " + indexInTableWordsToFindPlayerTwo)
            }

        }
        return wordToAdd
    }

    /**
     *
     * @returns {*}
     */
    render() {
        console.log("Player::render()::state :" + JSON.stringify(this.state) )
        /**
         * 3 cas possibles :
         *  statue === 'BEGIN' : retour à la page principale
         *  partyInPlay <= nbPartiesToPlay : Les parties sont en cours de jeu ou pas fini
         *  à la fin du jeu => affiche les résultat du jeu avec le score du joueur et un bouton pour revenir à la page principale
         * nbPartiesToPlay : Nombre de parties à joueur
         * partyInPlay partie(s) jouée(s) ou en cours
         * score : score actuelle
         * nbTotalTry : Nombre total d'essais
         * nbTry : Nombre d'essais déjà effectué ou en cours (démarrant à 0)
         */
        const statue = this.state.statue
        const nbPlayer = this.state.nbPlayer
        const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const startNewParty = this.state.startNewParty
        let partyInPlay = this.state.partyInPlay
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerOne = this.state.playerOne
        const playerTwo =this.state.playerTwo
        console.log(JSON.stringify(playerOne))
        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'MAIN_PAGE') {
            return ( <App /> )
        }
        /**
         * Affichage de dépard
         */
        else if (statue === 'BEGIN'){
            return (
                <div className="App">
                    <Header/>
                    <div className="Body-Selection">
                        <h2> Vous avez deux choix : </h2>
                        <div className="Selection">
                            <div className="Choice">
                                <h3> Les mots (ou phrase) à trouver sont pris au hasard</h3>
                                <Button value={"Sélectionner"} index={1} hidden={false} onClick={this.onChoice } />
                            </div>
                            <div className="Choice">
                                <h3> Vous décidez et entrez les mot (ou phrase) à trouver</h3>
                                <Button value={"Sélectionner"} index={2} hidden={false} onClick={this.onChoice } />
                            </div>
                        </div>
                        <div className="Btn-Ap">
                            <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        /**
         * Les mots ont été choisis au hasard pour les deux joueurs, nous affichons le boutons qui permet de lancer la partie
         */
        else if (statue === 'PLAY')  {
            console.log (JSON.stringify(this.state))
            return (
                <div className="App">
                    <Header/>
                    <div className="Body-Selection">
                        <h2> Les mot ont été choisis </h2>
                        <div className="Start">
                            <div className="H3">
                                <h3> Lancer le jeu</h3>
                                <Button value={"Démarrer"} index={2} hidden={false} onClick={this.onStart } />
                            </div>
                        </div>
                        <div className="Btn-Ap">
                            <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        /**
         * Nous affichons les champs qui vont permettre d'entrer les mot à choisir
         */
        else if (statue === 'ENTER_WORDS') {
            const wordsToFind = this.state.playerOne.wordsToFind
            return (
                <div className="App">
                    <Header/>
                    <div className="Body-Selection">

                        <div className="Btn-Ap">
                            <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onReturn } />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        /**
         * On lance l'affichage du jeu
         *
         */
        else //if (statue === 'START'){
            if(partyInPlay <= nbPartiesToPlay){
                console.log ("Player::render:: affiche Game")
                console.log (JSON.stringify(this.state))
                let playerName = this.state.playerOne.playerName
                let wordToFind = this.state.playerOne.tableWordsToFind[partyInPlay-1]
                let tableWordsToFind = this.state.playerOne.TableWordsToFind
                let score = this.state.playerOne.score
                /**
                 * Le jeu est pas fini on continue jusqu'au nombre de partie
                 */
                /**
                 * Selon on change de joueur ou
                 */
                if (statue === 'START') {
                    playerName = this.state.playerOne.playerName
                    wordToFind = this.state.playerOne.tableWordsToFind[partyInPlay-1]
                    tableWordsToFind = this.state.playerOne.tableWordsToFind
                    score = this.state.playerOne.score
                    partyInPlay = this.state.partyInPlay

                }
                else if (nbPlayer === 2){
                    playerName = this.state.playerTwo.playerName
                    wordToFind = this.state.playerTwo.TableWordsToFind[partyInPlay-1]
                    tableWordsToFind = this.state.playerTwo.tableWordsToFind
                    score = this.state.playerTwo.score
                    partyInPlay = this.state.partyInPlay
                }
                else {
                    playerName = this.state.playerOne.playerName
                    wordToFind = this.state.playerOne.tableWordsToFind[partyInPlay-1]
                    tableWordsToFind = this.state.playerOne.tableWordsToFind
                    score = this.state.playerOne.score
                    partyInPlay = this.state.partyInPlay
                }
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
                        tableWordsToFind = {tableWordsToFind}
                        playerOne = {playerOne}
                        playerTwo = {playerTwo}
                    />
                )
            //}
        }

        /**
         * Affichage par défaut (celui qui se produt à la fin de la partie)
         */
        else {
            return (
                <End
                    statue = {statue}
                    nbPlayer = {nbPlayer}
                    playerOne = {playerOne}
                    playerTwo = {playerTwo}
                />
            )
        }

    }

}



export default Player