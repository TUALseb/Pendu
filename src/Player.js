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
import Begin from './Begin.js'
import BackToMainPage from './BackToMainPage.js'
import End from './End.js'


import './Player.css'

const TABLE_WORDS_TO_FIND = ["hello", "pendu", "react", "apprivoiser", "jeu du pendu", "jouer au pendu", "association", "apprivoiser react", "exercices", "consignes"]


//const VISUAL_PAUSE_MSECS = 250

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
        tableWordsToFind : ["","",""],
        player: 1,
    }

    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class OnePlayer
     * @param props
     */
    constructor(props) {
        super(props)
        //console.log ("Player::constructor()")

        //console.log ("Player::constructor::state: " + JSON.stringify(this.state))
        let statue = props.statue
        let tableWordsToFindPlayerOne = []
        let tableWordsToFindPlayerTwo = []
        let tableWordsToFind = ["","",""]
        let scorePlayerOne = props.playerOne.score
        let scorePlayerTwo = props.playerTwo.score
        let partyInPlay = props.partyInPlay
        let partyInPlayPlayerOne = props.playerOne.partyInPlay
        let partyInPlayPlayerTwo = props.playerTwo.partyInPlay
        let player = props.player
        if (statue === 'NEXT') {
            // Nous récupérons les tableaux de mot déjà créés
            tableWordsToFindPlayerOne = props.playerOne.tableWordsToFind
            tableWordsToFindPlayerTwo = props.playerTwo.tableWordsToFind
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
            tableWordsToFind: tableWordsToFind,
            player: player,
        }
        // on déclare les méthodes qui doivent être attaché à this, sinon les données de la classe ne sera pas accessible
        //this.onReturn = this.onReturn.bind(this)
        this.onChoice = this.onChoice.bind(this)
        //this.onStart = this.onStart.bind(this)
        //this.onChangeText = this.onChangeText.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onValid = this.onValid.bind(this)
    }


    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("Player::componentDidMount()")
        //console.log ("Game::State: " + JSON.stringify(this.state))
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous libérons manuellement cet évènement
        //document.addEventListener("keypress", this.onChangeText)
        //document.addEventListener("change", this.onChangeText)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {
        console.log ("Player::componentWillUnmount()")
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous déttachons manuellement cet évènement
        document.removeEventListener("keypress", this.onChangeText)
    }


    componentDidCatch(error, info) {
        alert(error + " " + info)
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

        const scorePlayerOne = this.state.playerOne.score
        const scorePlayerTwo = this.state.playerTwo.score
        let tableWordsToFindForPlayerOne = this.state.playerOne.tableWordsToFind
        let tableWordsToFindForPlayerTwo = this.state.playerTwo.tableWordsToFind

        switch (index) {
            case 1:
                /**
                 * Nous sommes dans les cas où les mots sont pris de façon aléatoire.
                 * les tableau de mots sont alors construits quelque soit le niombre de joueurs choisis afin d'éviter la répétitions de code inutile
                 * C'est la méthode getRandomWord() qui gère de renvoyer un mot différent dans les deux tableaux qui seront ensuites
                 * utilisés lors des parties
                 */
                for (let pos = 0 ; pos < nbPartiesToPlay ; pos++) {
                    let posInTableWord = Math.round(Math.random()*TABLE_WORDS_TO_FIND.length)
                    tableWordsToFindForPlayerOne.push(this.getRandomWord (tableWordsToFindForPlayerOne, tableWordsToFindForPlayerTwo, posInTableWord))
                    tableWordsToFindForPlayerTwo.push(this.getRandomWord (tableWordsToFindForPlayerOne, tableWordsToFindForPlayerTwo, posInTableWord))

                }
                //console.log (tableWordsToFindForPlayerOne)
                //console.log (tableWordsToFindForPlayerTwo)
                // Mises à jour du state avec les valeurs utiles
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
                /**
                 * Nous sommes dans le cas où c'est les joueurs qui entrent les mots à trouver.
                 * Un mini formulaire va alors s'afficher
                 * Par défaut les tableaux sont vides
                 */
                //console.log(nbPartiesToPlay)
                console.log (tableWordsToFindForPlayerOne)
                console.log (tableWordsToFindForPlayerTwo)
                // Mises à jour du state avec les valeurs utiles
                this.setState({
                    statue: 'ENTER_WORDS',
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
            case 3:
                /**
                 * Nous sommes dans le cas où nous lançons le jeu par lui même
                 * Ne peut être appelé qui si les mots ont été entrés par le(s) joueur(s)
                 */
                //console.log("statue: START, state : " + this.state)
                // Mises à jour du state avec les valeurs utiles
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
                /**
                 * Valeur par défaut :
                 * Permet de renvoyer à la page principale
                 */
                this.setState({statue: 'MAIN_PAGE'})

        }

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
            return wordToAdd.toUpperCase()
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
        return wordToAdd.toUpperCase()
    }

    /**
     * Méthode qui permet de gérer la saise des mots (ou phrases)
     * Appelé quand nousd sommes sur un champ de saisie
     * @param event : variable du DOM
     * @param index : index du champ Input en cours. L'index esgt passé en paramètre
     */
    onChangeText(event, index) {
        let tableWordsToFind = this.state.tableWordsToFind
        //console.log ("wordToFind : " + event.target.value + " , index : " + index + " , tableWordsToFind : " + tableWordsToFind)

        const regExp = new RegExp(/[^a-z\s]/,'g')
        if (regExp.test(event.target.value)) {
            alert("lettre ou caractère interdit")
        }
        else {
            //console.log ("newWordToFind : " + newWordToFind + " , index : " + index)
            // Nous vérifions que les nombre de caractères différent est infférieur ou égal à 12 (nombre d'essais total possibles)
            const nbPossibleLetters = this.state.nbTotalTry
            let wordInUse = tableWordsToFind[index]
            //console.log ("Mot à contrôler : " + wordInUse)
            let letter = event.target.value.substr(event.target.value.length-1, 1)
            let nbUsedLetters = 0
            for (let pos=0 ;  pos <=wordInUse.length; pos++) {
                if (wordInUse.indexOf(letter) === -1 && nbUsedLetters<=nbPossibleLetters){
                    //console.log("lettre non présente : " + letter + " à la position " + wordInUse.lastIndexOf(letter) + " dans " + wordInUse)
                    nbUsedLetters++
                    //if (nbUsedLetters === nbPossibleLetters) {
                    //    alert("il ne peut y avoir que " + nbPossibleLetters + " lettres différentes. Merci de modifier votre mot (ou phrase)")
                    //}
                }
                else {
                    //console.log("lettre présente : " + letter + " à la position " + wordInUse.lastIndexOf(letter) + " dans " + wordInUse)
                    nbUsedLetters = wordInUse.length
                }
            }
            //console.log ("nombre de lettres : " + nbUsedLetters)
            if (nbUsedLetters === nbPossibleLetters) {
                alert("il ne peut y avoir que " + nbPossibleLetters + " lettres différentes. Merci de modifier votre mot (ou phrase)")
            }
            else {
                tableWordsToFind[index] = event.target.value.toUpperCase()
            }

            this.setState({ tableWordsToFind: tableWordsToFind })
        }

    }

    /**
     * Méthode appelé lorsque l'on quitte un Input
     * @param event : variable du DOM
     * @param index : index du champ Input en cours. L'index esgt passé en paramètre
     */
    onBlur(event, index) {
        //console.log ("onBLur:: event : " + event)//JSON.stringify(event))
    }

    /**
     * Méthode appelé lorsque l'on entre dans un Input
     * @param event : variable du DOM
     * @param index : index du champ Input en cours. L'index esgt passé en paramètre
     */
    onFocus(event, index) {
        //let tableWordsToFind = this.state.tableWordsToFind
        //console.log ("onFocus:: event : " + event.target.value + ", index : " + index + ", tableWordsToFind : " + tableWordsToFind)//JSON.stringify(event))
    }

    /**
     * Méthode appelé quand on annule la saise des mots (ou phrases).
     * Renvoie à la page précédente (celle où on choisi si on entre les mots ou s'ils sont pris de façon aléatoire)
     */
    onCancel() {
        // On réinitialise les valeurs
        const playerOneName = this.state.playerOne.playerName
        const playerTwoName = this.state.playerTwo.playerName
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const scorePlayerOne = this.state.playerOne.score
        const scorePlayerTwo = this.state.playerTwo.score
        const tableWordsToFindForPlayerOne = []
        const tableWordsToFindForPlayerTwo = []
        const tableWordsToFind = ["","",""]
        this.setState({
            statue: 'BEGIN',
            nbPartiesToPlay: nbPartiesToPlay,
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
            tableWordsToFind:tableWordsToFind,
            player: 1,
        })
    }

    /**
     * Méthode appelé quand on valide la saises de tous les mots (ou phrases).
     * @param player : numéro du joueur qui saisie les mots (ou phrases)
     */
    onValid(player) {
        console.log ("onValid:: player : " + player + " nbplayer : " + this.state.nbPlayer + " state : " + JSON.stringify(this.state))
        const playerOneName = this.state.playerOne.playerName
        const playerTwoName = this.state.playerTwo.playerName
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const scorePlayerOne = this.state.playerOne.score
        const scorePlayerTwo = this.state.playerTwo.score
        const tableWordsToFindForPlayerOne = this.state.playerOne.tableWordsToFind
        const tableWordsToFindForPlayerTwo = this.state.playerTwo.tableWordsToFind
        const nbPlayer = this.state.nbPlayer
        const tableWordsToFind = this.state.tableWordsToFind
        if (player === 1 &&  nbPlayer === 2) {
            this.setState({
                statue : 'ENTER_WORDS',
                nbPartiesToPlay: nbPartiesToPlay,
                playerOne: {
                    playerName : playerOneName,
                    score: scorePlayerOne,
                    tableWordsToFind: tableWordsToFind,
                },
                playerTwo: {
                    playerName : playerTwoName,
                    score: scorePlayerTwo,
                    tableWordsToFind: tableWordsToFindForPlayerTwo,
                },
                player: 2,
            })
        }
        else if (player === 2 &&  nbPlayer === 2){
            this.setState({
                statue : 'PLAY',
                nbPartiesToPlay: nbPartiesToPlay,
                playerOne: {
                    playerName : playerOneName,
                    score: scorePlayerOne,
                    tableWordsToFind: tableWordsToFindForPlayerOne,
                },
                playerTwo: {
                    playerName : playerTwoName,
                    score: scorePlayerTwo,
                    tableWordsToFind: tableWordsToFind,
                },
                player: 2,
            })
        }
        else {
            //console.log ("player : " + player + " nbplayer : " + this.state.nbPlayer + " state : " + JSON.stringify(this.state))
            //console.log ("mots à trouver : " + tableWordsToFind + " placés dans : " + tableWordsToFindForPlayerOne)
            this.setState({
                statue: 'PLAY',
                playerOne: {
                    playerName : playerOneName,
                    score: scorePlayerOne,
                    tableWordsToFind: tableWordsToFind,
                },
                playerTwo: {
                    playerName : playerTwoName,
                    score: scorePlayerTwo,
                    tableWordsToFind: tableWordsToFindForPlayerTwo,
                },
                player: 1,
            })
        }
    }


    /**
     * Méthode qui gère l'affichage
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
        const nbTotalTry = this.state.nbTotalTry
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
                    <Begin
                        onClick = {this.onChoice}
                    />
                    <Footer />
                </div>
            )
        }
        /**
         * Les mots ont été choisis au hasard pour les deux joueurs, nous affichons le boutons qui permet de lancer la partie
         */
        else if (statue === 'PLAY')  {
            //console.log ("Player::render:: play game: "+ statue + " state : " + JSON.stringify(this.state))
            return (
                <div className="App">
                    <Header/>
                    <div className="Body">
                        <h2> Les mot ont été choisis </h2>
                        <div className="Start">
                            <div className="H3">
                                <h3> Lancer le jeu</h3>
                                <Button className={"Btn-Property"} value={"Démarrer"} index={3} onClick={this.onChoice } />
                            </div>
                        </div>
                        <BackToMainPage onClick = {this.onChoice}/>
                    </div>
                    <Footer />
                </div>
            )
        }
        /**
         * Nous affichons les champs qui vont permettre d'entrer les mot à choisir
         */
        else if (statue === 'ENTER_WORDS') {

            const nbPlayer = this.state.nbPlayer
            let tableWordsToFind = this.state.tableWordsToFind
            let player = this.state.player
            //for (let player = 1 ; player <= nbPlayer ; player ++) {
            if (player<= nbPlayer) {
                //console.log("tableWordsToFind : " + tableWordsToFind)
                //let index = 0
                return (
                    <div className="App">
                        <Header/>
                        <div className="Body">
                            <div className="Data">
                                <div className="Choice">
                                    {
                                        tableWordsToFind.map((wordToFind, index) => (
                                            <SelectWord
                                                index={index}
                                                key={index}
                                                word={wordToFind}
                                                onChange={(event)=>this.onChangeText(event, index)}
                                                onBlur={()=>this.onBlur(index)}
                                                onFocus={(event)=>this.onFocus(event, index)}
                                            />
                                        ))
                                    }
                                </div>
                                <div className="Btn-Cancel-Valid">
                                    <div className="Btn-Ap">
                                        <Button className={"Btn-Property"} value={"Annuler"} index={99} onClick={this.onCancel } />
                                    </div>
                                    <div className="Btn-Ap">
                                        <Button className={"Btn-Property"} value={"Valider"} index={player} onClick={this.onValid } />
                                    </div>
                                </div>
                            </div>
                            <BackToMainPage onClick = {this.onChoice}/>
                        </div>
                        <Footer />
                    </div>
                )
            }

        }
        /**
         * On lance l'affichage du jeu
         */
        else if(partyInPlay <= nbPartiesToPlay){
            //console.log ("Player::render:: play game " + partyInPlay + " state : " + JSON.stringify(this.state))
            const playerOne = this.state.playerOne
            const playerTwo = this.state.playerTwo
            let playerName = this.state.playerOne.playerName
            let wordToFind = this.state.playerOne.tableWordsToFind[partyInPlay-1]
            let tableWordsToFind = this.state.playerOne.TableWordsToFind
            let score = this.state.playerOne.score
            /**
             * Le jeu est pas fini on continue jusqu'au nombre de partie
             */
            if (statue === 'START') {
                // On commence la première partie avec le premier joueur
                playerName = this.state.playerOne.playerName
                wordToFind = this.state.playerOne.tableWordsToFind[partyInPlay-1]
                tableWordsToFind = this.state.playerOne.tableWordsToFind
                score = this.state.playerOne.score
                partyInPlay = this.state.partyInPlay

            }
            else if (statue === 'NEXT_PLAYER'){
                // On change de joueur
                playerName = this.state.playerTwo.playerName
                wordToFind = this.state.playerTwo.tableWordsToFind[partyInPlay-1]
                tableWordsToFind = this.state.playerTwo.tableWordsToFind
                score = this.state.playerTwo.score
                partyInPlay = this.state.partyInPlay

            }
            else {
                // On passe à la partie suivante
                playerName = this.state.playerOne.playerName
                wordToFind = this.state.playerOne.tableWordsToFind[partyInPlay-1]
                tableWordsToFind = this.state.playerOne.tableWordsToFind
                score = this.state.playerOne.score
                partyInPlay = this.state.partyInPlay
            }

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
            //console.log("Player::render::end =>" + JSON.stringify(this.state))
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