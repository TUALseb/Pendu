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
import Footer from './Footer.js'
import Button from './Button.js'
import SelectWord from './SelectWords.js'
import End from './End.js'


import './Player.css'

const TABLE_WORDS_TO_FIND = ["hello", "pendu", "react", "apprivoiser", "jeu du pendu", "jouer au pendu", "association", "apprivoiser react", "exercices", "consignes"]


class Player extends Component{
    state = {
        statue: 'BEGIN',
        nbPartiesToPlay: 0,
        partyInPlay: 1,
        nbTry: 1,
        nbTotalTry: 0,
        playerOne : {
            playerName : "",
            partyInPlay: 1,
            score: 0,
            tableWordsToFind : [],
        },
        playerTwo : {
            playerName : "",
            partyInPlay: 1,
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

        //console.log ("Player::constructor::state: " + JSON.stringify(this.state))
        let statue = props.statue
        let tableWordsToFindPlayerOne = []
        let tableWordsToFindPlayerTwo = []
        let scorePlayerOne = props.playerOne.score
        let scorePlayerTwo = props.playerTwo.score
        let partyInPlay = props.partyInPlay
        let partyInPlayPlayerOne = props.playerOne.partyInPlay
        let partyInPlayPlayerTwo = props.playerTwo.partyInPlay
        if (statue === 'NEXT') {
            // Nous récupérons le tableau de mot déjà crée
            tableWordsToFindPlayerOne = props.playerOne.tableWordsToFind
            tableWordsToFindPlayerTwo = props.playerTwo.tableWordsToFind
            //partyInPlay = props.partyInPlay + 1

        }

        if (props.nbPlayer === 1) {
            //console.log ("Player::Constructor => " + JSON.stringify(props))
            partyInPlay = statue === 'NEXT'?  props.partyInPlay + 1 : props.partyInPlay
            partyInPlayPlayerOne = props.partyInPlay + 1
        }
        else if (props.playerOne.playerName === props.playerName) {
            //console.log("nbPlayer : " + props.nbPlayer + "Partie en cours : " + props.partyInPlay + "statue = NEXT_PLAYER")
            partyInPlayPlayerOne = props.partyInPlay + 1
            statue = 'NEXT_PLAYER'
        }
        else if (props.playerTwo.playerName === props.playerName) {
            //console.log("nbPlayer : " + props.nbPlayer + "Partie en cours : " + props.partyInPlay + "statue = NEXT")
            partyInPlayPlayerTwo = props.partyInPlay + 1
            partyInPlay = props.partyInPlay + 1
            statue = 'NEXT'
        }

        // Gérons ici les scores
        if (props.playerOne.playerName === props.playerName) {
            scorePlayerOne =  props.score //scorePlayerOne +
        }
        else if (props.playerTwo.playerName === props.playerName) {

            scorePlayerTwo =  props.score //scorePlayerTwo +
        }


        if (partyInPlay === props.nbPartiesToPlay) {
            //console.log ("Player::constructor::props: " + JSON.stringify(props))
            scorePlayerOne = props.playerOne.score
            scorePlayerTwo = props.playerTwo.score
        }

        this.state = {
            statue: statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: partyInPlay,
            playerOne : {
                playerName : props.playerOne.playerName,
                partyInPlay: partyInPlayPlayerOne,
                score: scorePlayerOne,
                tableWordsToFind : tableWordsToFindPlayerOne,
            },
            playerTwo : {
                playerName : props.playerTwo.playerName,
                partyInPlay: partyInPlayPlayerTwo,
                score: scorePlayerTwo,
                tableWordsToFind : tableWordsToFindPlayerTwo,
            },
            startNewParty: props.startNewParty,
        }
        // on déclare les méthodes qui doivent être attaché à this, sinon les données de la classe ne sera pas accessible
        this.onReturn = this.onReturn.bind(this)
        this.onChoice = this.onChoice.bind(this)
        this.onStart = this.onStart.bind(this)
        this.onChangeText =this.onChangeText.bind(this)
    }


    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("Game::componentDidMount()")
        //console.log ("Game::State: " + JSON.stringify(this.state))
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous libérons manuellement cet évènement
        //document.addEventListener("keypress", this.onChangeText)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous déttachons manuellement cet évènement
        //document.removeEventListener("keypress", this.onChangeText)
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
     * Méthode qui permet de choisir des mots (ou phrase) de façon aléatoire et unique pour les joueurs
     * @param index
     */
    onChoice(index) {
        //console.log ("Player::onChoice()")
        const playerOneName = this.state.playerOne.playerName
        const playerTwoName = this.state.playerTwo.playerName
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        //const scorePlayerOne = 0//this.state.playerOne.score
        //const scorePlayerTwo = 0//this.state.playerTwo.score
        //let tableWordsToFindForPlayerOne = []
        //let tableWordsToFindForPlayerTwo = []
        const scorePlayerOne = this.state.playerOne.score
        const scorePlayerTwo = this.state.playerTwo.score
        let tableWordsToFindForPlayerOne = this.state.playerOne.tableWordsToFind
        let tableWordsToFindForPlayerTwo = this.state.playerTwo.tableWordsToFind

        switch (index) {
            case 1:
                for (let pos = 0 ; pos < nbPartiesToPlay ; pos++) {
                    let posInTableWord = Math.round(Math.random()*TABLE_WORDS_TO_FIND.length)
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
                break
            case 2:
                for (let nbParties=0 ; nbParties<nbPartiesToPlay; nbParties++) {
                    tableWordsToFindForPlayerOne.push(" ")
                    tableWordsToFindForPlayerTwo.push(" ")
                }
                console.log(nbPartiesToPlay)
                console.log (tableWordsToFindForPlayerOne)
                console.log (tableWordsToFindForPlayerTwo)
                this.setState({
                    statue: 'ENTER_WORDS',
                    playerOne: {
                        playerName : playerOneName,
                        tableWordsToFind: tableWordsToFindForPlayerOne,
                    },
                    playerTwo: {
                        playerName : playerTwoName,
                        tableWordsToFind: tableWordsToFindForPlayerTwo,
                    },
                })
                break
            case 3:
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
                break
            default:
                this.setState({statue: 'MAIN_PAGE'})

        }
 /*
        if (index === 1){
            //console.log ("Player::onChoice::state : " + JSON.stringify(this.state))
            const playerOneName = this.state.playerOne.playerName
            const playerTwoName = this.state.playerTwo.playerName
            const scorePlayerOne = 0//this.state.playerOne.score
            const scorePlayerTwo = 0//this.state.playerTwo.score
            let tableWordsToFindForPlayerOne = []
            let tableWordsToFindForPlayerTwo = []

            // Pour chaque joueur, on va choisir les mots (ou phrases) de façon aléatoire

            for (let pos = 0 ; pos < this.state.nbPartiesToPlay ; pos++) {
                let posInTableWord = Math.round(Math.random()*TABLE_WORDS_TO_FIND.length)
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
            console.log ("Player::onChoice::state : " + JSON.stringify(this.state))
            const playerOneName = this.state.playerOne.playerName
            const playerTwoName = this.state.playerTwo.playerName
            const nbPartiesToPlay = this.state.nbPartiesToPlay
            let tableWordsToFindForPlayerOne = []
            let tableWordsToFindForPlayerTwo = []

            for (let nbParties=0 ; nbParties<nbPartiesToPlay; nbParties++) {
                tableWordsToFindForPlayerOne.push(" ")
                tableWordsToFindForPlayerTwo.push(" ")
            }
            console.log(nbPartiesToPlay)
            console.log (tableWordsToFindForPlayerOne)
            console.log (tableWordsToFindForPlayerTwo)
            this.setState({
                statue: 'ENTER_WORDS',
                playerOne: {
                    playerName : playerOneName,
                    tableWordsToFind: tableWordsToFindForPlayerOne,
                },
                playerTwo: {
                    playerName : playerTwoName,
                    tableWordsToFind: tableWordsToFindForPlayerTwo,
                },
            })
        }
*/
    }
    /**
     *
     * @param index
     */
    onStart(index) {
        //console.log("Player::onStart()")
        //console.log("Player::onStart()::state : " + JSON.stringify(this.state))
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
            // On boucle tant que le mot est présent dans l'un des 2 tableaux afin que sa présence soit unique
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


    onChangeText(value) {
        console.log ("value.target.value : " + JSON.stringify(value))
        this.setState({wordToFind : value.target.value})
    }


    onBlur(event) {
        console.log ("onBLur:: event : " + event)//JSON.stringify(event))
    }

    /**
     *
     * @returns {*}
     */
    render() {
        //console.log("Player::render()::state :" + JSON.stringify(this.state) )
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
        //const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const startNewParty = this.state.startNewParty
        let partyInPlay = this.state.partyInPlay
        const nbPartiesToPlay = this.state.nbPartiesToPlay

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
                            <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onChoice } />
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
            //console.log (JSON.stringify(this.state))
            return (
                <div className="App">
                    <Header/>
                    <div className="Body-Selection">
                        <h2> Les mot ont été choisis </h2>
                        <div className="Start">
                            <div className="H3">
                                <h3> Lancer le jeu</h3>
                                <Button value={"Démarrer"} index={3} hidden={false} onClick={this.onChoice } />
                            </div>
                        </div>
                        <div className="Btn-Ap">
                            <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onChoice } />
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

            //let wordToFind = this.state.playerOne.wordToFind
            const nbPlayer = this.state.nbPlayer
            let tableWordsToFinPlayerOne = this.state.playerOne.tableWordsToFind
            let tableWordsToFinPlayerTwo = this.state.playerTwo.tableWordsToFind
            let player = 1
            //console.log(wordToFind)
            for (let player = 1 ; player <= nbPlayer ; player ++) {
            //if (player<= nbPlayer) {
                return (
                    <div className="App">
                        <Header/>
                        <div className="Body-Selection">
                            <div>
                                {
                                    tableWordsToFinPlayerOne.map((wordToFind, index)  =>(
                                        <SelectWord
                                            index={index}
                                            word={wordToFind}
                                            onChange={this.onChangeText}
                                            onBlur={this.onBlur}
                                        />
                                    ))
                                }
                            </div>
                            <div>
                                <div className="Btn-Ap">
                                    <Button value={"Valider"} index={player} hidden={false}  onClick={this.onReturn } />
                                </div>
                                <div className="Btn-Ap">
                                    <Button value={"Annuler"} index={99} hidden={false} onClick={this.onReturn } />
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

        }
        /**
         * On lance l'affichage du jeu
         *
         */
        else if(partyInPlay <= nbPartiesToPlay){
            //console.log ("Player::render:: affiche Game")
            //console.log (JSON.stringify(this.state))
            const playerOne = this.state.playerOne
            const playerTwo = this.state.playerTwo
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
            else if (statue === 'NEXT_PLAYER'){
                playerName = this.state.playerTwo.playerName
                wordToFind = this.state.playerTwo.tableWordsToFind[partyInPlay-1]
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
            const nbTotalTry = wordToFind.length
            return (
                <Game
                    nbPlayer = {nbPlayer}
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
        }

        /**
         * Affichage par défaut (celui qui se produt à la fin de la partie)
         */
        else {
            console.log("Player::render::end =>" + JSON.stringify(this.state))
            let playerOne = this.state.playerOne
            let playerTwo =this.state.playerTwo
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