/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'

//Importation des fichier js que nous aurons besoin
import Button from './Button.js'
import BackToMainPage from './BackToMainPage.js'
import PlayerInfo from './PlayerInfo.js'
import KeyBoard from './KeyBoard.js'
import App from './App.js'
import Header from './Header.js'
import Footer from './Footer.js'
import End from './End.js'

// Importaion des images du pendu que nous allons utiliser
import img_none from './images/none.png'
import img_socle from './images/socle.png'
import img_socle_pied from './images/pied.png'
import img_poteau from './images/poteau.png'
import img_traverse from './images/traverse.png'
import img_ajout_corde from './images/ajout_corde.png'
import img_ajout_tete from './images/ajout_tete.png'
import img_ajout_corps from './images/ajout_corps.png'
import img_ajout_jambe_droite from './images/ajout_jambe_droite.png'
import img_ajout_jambe_gauche from './images/ajout_jambe_gauche.png'
import img_ajout_bras_droit from './images/ajout_bras_droit.png'
import img_ajout_bras_gauche from './images/ajout_bras_gauche.png'


//Importation des smileys
// pour les cas des bonnes réponses
import smiley_moyen from './images/smiley-moyen.png'
import smiley_content from './images/smiley-content.png'
import smiley_content2 from './images/smiley-content2.png'
import smiley_happy1 from './images/smiley-happy1.png'
import smiley_happy2 from './images/smiley-happy2.png'
import smiley_happy3 from './images/smiley-happy3.png'
import smiley_heureux from './images/smiley-heureux.jpg'
import smiley_joyeux from './images/smiley_joyeux.png'
import smiley_vert from './images/smiley-vert.jpg'
//pour les cas des erreurs
import smiley_etonne from './images/smiley-etonne.png'
import smiley_etonne2 from './images/smiley-ettone2.png'
import smiley_surpris from './images/smiley-surpris.png'
import smiley_moyen_violet from './images/smiley-moyen-violet.png'
import smiley_moyen2_violet from './images/smiley-moyen2-violet.png'
import smiley_ettone_violet from './images/smiley-ettone-violet.png'
import smiley_etonne2_violet from './images/smiley-etonne2-violet.png'
import smiley_surpris_violet from './images/smiley-surpris-violet.png'
import smiley_triste0_violet from './images/smiley-triste0-violet.png'
import smiley_triste1_violet from './images/smiley-triste1-violet.png'
import smiley_triste2_violet from './images/smiley-triste2-violet.png'
import smiley_triste_rouge from './images/smiley-triste-rouge.png'

import smiley_triste from './images/smiley-triste.png'


// Importation du fichier de style
import './Game.css'
//import Player from "./Player";


// Tableau des lettres à afficher
const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ']
//const EXTEND_LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','à','â','ç','é','è','ï','î','ù','û',' ','\'']
// Tableau des images du pendu
const TAB_IMAGES_PENDU =[
    img_none, img_socle, img_socle_pied, img_poteau, img_traverse, img_ajout_corde, img_ajout_tete,
    img_ajout_corps, img_ajout_jambe_gauche, img_ajout_jambe_droite, img_ajout_bras_gauche, img_ajout_bras_droit]
// Tableaux des smileys
const TAB_SMILEYS_ERREURS = [smiley_surpris, smiley_etonne, smiley_etonne2, smiley_triste, smiley_moyen_violet,
    smiley_moyen2_violet, smiley_ettone_violet, smiley_etonne2_violet, smiley_surpris_violet, smiley_triste0_violet,
    smiley_triste1_violet, smiley_triste2_violet, smiley_triste_rouge]
const TAB_SMILEY_BONNE_REPONSE = [smiley_moyen, smiley_content, smiley_content2, smiley_happy1, smiley_happy2,
    smiley_happy3, smiley_heureux, smiley_joyeux, smiley_vert]
// Pour stocker les lattres qui ont été déjà choisis
//let usedLetters = new Set()
const VISUAL_PAUSE_MSECS = 250

/**
 *
 */
class Game extends Component {

    state = {
        letters : {},
        statue: '',
        nbPlayer: 1,
        playerNumber: 1,
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry : 0,
        nbTotalTry : 0,
        image: "",
        alt: "",
        wordToFind: "",
        smiley: "",
        motCache: "",
        error : 0,
        letterFind : 0,
        startNewParty: false,
        result: "",
        tableWordsToFind: [],
        playerOne: {},
        playerTwo: {},
        playerName: "",
        score : 0,

    }

    usedLetters = new Set()

    /**
     * Constructeur
     * Méthode appelé en premier au moment de la création de la classe
     * Permet d'initialiser les valeiurs des propriétés de state et de déclarer les méthodes nécessaires
     * @param props => tableau de propriétés et méthodes passés en paramètres
     */
    constructor(props) {
        console.log ("Game::constructor()")
        super(props)
        this.usedLetters.clear()
        console.log ("Game::constructor() => props : " +JSON.stringify(props))
        console.log ("Game::constructor() => this.state : " +JSON.stringify(this.state))
        this.state = {
            // On va créer le tableau avec les lettres de l'alaphabet et de certains caractères (espace, giuillemets, caractères avec accents)
            letters: this.generateTable(),
            statue: props.statue,
            nbPlayer: props.nbPlayer,
            playerNumber: props.playerNumber,
            nbTotalTry: props.nbTotalTry,
            nbTry: props.nbTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: props.partyInPlay,
            // On initialise l'image du pendu à none (soit rien du pendu)
            image: this.drawPendu(0, 0,0),//<img src={TAB_IMAGES_PENDU[0]} alt={TAB_IMAGES_PENDU[0]} width="220" height="330" />,
            alt: props.alt,
            smiley: this.drawSmiley(0, 0),//TAB_SMILEY_BONNE_REPONSE[0],
            // On cache le mot à trouver
            motCache: this.computeDisplay(props.playerOne.tableWordsToFind[0], this.usedLetters),
            error : 0,
            letterFind : 0,
            wordToFind: props.playerOne.tableWordsToFind[0],
            startNewParty: props.startNewParty,
            tableWordsToFind: props.playerOne.tableWordsToFind,
            result: "",
            playerOne: props.playerOne,
            playerTwo: props.playerTwo,
            score: 0,
            playerName: props.playerName,

        }
        // on déclare les méthodes qui doivent être attaché à this
        this.computeDisplay = this.computeDisplay.bind(this)
        this.onReturn = this.onReturn.bind(this)
        this.onNext = this.onNext.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
        //this.handleLetterClick = this.handleLetterClick.bind(this)
    }

    /**
     * Méthode servant à capturer les messages d'erreurs
     * @param error
     * @param info
     */
    componentDidCatch(error, info) {
        alert(error + " " + info)
    }


    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        console.log ("Game::componentDidMount()")
        console.log ("Game::componentDidMount() => State:statue : " + this.state.statue)
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous libérons manuellement cet évènement
        document.addEventListener("keypress", this.onKeyPress)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {
        console.log ("Game::componentWillUnmount()")
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous déttachons manuellement cet évènement
        document.removeEventListener("keypress", this.onKeyPress)
    }

/*
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log ("Game::getDerivedStateFromProps() : " + nextProps.statue + " =>" + prevState.statue )
        return null
    }

    componentWillReceiveProps(nextProps) {
        console.log ("Game::shouldComponentUpdate() : " + nextProps.statue )
    }


    shouldComponentUpdate(nextProps, nextState) {
        console.log ("Game::shouldComponentUpdate() : " + nextProps.statue + " =>" + nextState.statue )
        console.log ("Game::shouldComponentUpdate() => nextState : " + JSON.stringify(nextState) )
        //const playerTwo = nextState.playerTwo
        return true
    }
*/

    componentDidUpdate(prevProps, prevState) {
        console.log ("Game::componentDidUpdate() : prevProps => " + prevProps.statue + " ; prevState.statue => " + prevState.statue )
        console.log (this.state)
    }


    /**
     * Méthode permettant de générer un tableau qui va afficher toutes les lettres de l'halphabet,
     * ainsi que de l'espace et de l'apostrophe
     * @returns {Array}
     */
    generateTable() {
        const result = []
        // Nous parcourons notre tableau afin de récupérer chaque lettre qui est sous forme de tableau
        // ex : "A":[A][A]
        for (let letter of LETTERS) {
            result.push(letter)
            //index++
        }
        return result
    }

    /**
     * Méthode qui permet de remplacer les lettres non trouvé par des "_"
     * @param phrase
     * @param usedLetters
     * @returns {string | void | *}
     */
    computeDisplay(phrase, usedLetters) {
        //console.log("Game::computeDisplay : " + JSON.stringify(usedLetters))
        console.log ("Phrase ou mot à trouver : " + phrase)
        //  |(\W)/g
        let regExp = /(\w)|(\s)/g
        return phrase.replace(regExp,
            (letter) => (usedLetters.has(letter) ? letter : '_ ')
        )
    }

    drawSmiley(score, error, trueLetter = true) {
        //console.log ("Game::drawSmiley => error : " + error + " , => score :" + score + " , => trueLetter : "+ trueLetter)
        let smiley = TAB_SMILEY_BONNE_REPONSE[0]
        if (trueLetter === true) {
            console.log ("Game::drawSmiley => TAB_SMILEY_BONNE_REPONSE : ")
            smiley = (score<TAB_SMILEY_BONNE_REPONSE.length)?TAB_SMILEY_BONNE_REPONSE[score-error]:TAB_SMILEY_BONNE_REPONSE[(TAB_SMILEY_BONNE_REPONSE.length-1)-error]
        }
        else {
            console.log ("Game::drawSmiley => TAB_SMILEYS_ERREURS : ")
            smiley =  TAB_SMILEYS_ERREURS[error]
        }

        //console.log ("Game::drawSmiley => smiley : " + smiley)
        const smileyToShow = <img src={smiley} alt={smiley} width="auto" height="auto"/>
        return smileyToShow
    }

    drawPendu(error, nbTry, nbTotalTry, gagne=false) {
        console.log ("Game::drawPendu => error : " + error  + " , => nbTry :" + nbTry)
        let imageToShow = ""//<img src={TAB_IMAGES_PENDU[0]} alt={TAB_IMAGES_PENDU[0]}/>
        if (gagne && error===0) {
            imageToShow = <div className="animation-gagne" />
        }
        else if (gagne && error>0) {
            imageToShow = <div className="animation-sauve" />
        }
        else if (error > 0 && (nbTry <= nbTotalTry)) {
            //console.log("Game::drawPendu => TAB_IMAGES_PENDU[error] : " + TAB_IMAGES_PENDU[error])
            imageToShow = <img src={TAB_IMAGES_PENDU[error]} alt={TAB_IMAGES_PENDU[error]}/>
        }
        else {
            imageToShow = <img src={TAB_IMAGES_PENDU[0]} alt={TAB_IMAGES_PENDU[0]}/>
        }

        console.log("Game::drawPendu => imageToShow : " + JSON.stringify(imageToShow))

        return imageToShow
    }

    showResult(gagne, wordToFind) {
        let result = ""
        if (gagne===true) {
            result = <div className="Message"> Bravo, vous avez gagné!</div>
        }
        else {
            result = <div className="Message"> Dommage, vous avez perdu.<br /> Le mot à trouver était : <br /> <div className="H4">{wordToFind}</div></div>
        }
        return result
    }

    /**
     * Méthode qui permet de mettre à jour nos paramètres et  l'état de la partie en cours
     * @param letter
     */
    updateValues(letter) {
        console.log ("Game::updateValues()" )
        // On récupère les valeurs qui ne bougeront pas dans des constantes (const)
        const nbTotalTry = this.state.nbTotalTry
        const wordToFind = this.state.wordToFind
        const statue = this.state.statue
        // On récupère les valeurs qui vont changer dans des variables (let remplace var : déclaration depuis ES5)
        let image = this.state.image
        let nbTry = this.state.nbTry
        let score = this.state.score
        let partyInPlay = this.state.partyInPlay
        let smiley = this.state.smiley
        let motCache = this.state.motCache
        let error = this.state.error
        let letterFind = this.state.letterFind
        let startNewParty = this.state.startNewParty
        let result = this.state.result

        //console.log ("nbTry : " + nbTry)
        this.usedLetters.add(letter)

        /*
        Le nombre d'essai n'est pas atteint, on continue
         */
        nbTry++
        if (nbTry < nbTotalTry) {
            console.log("Game::UpDateValues => nbtry : " + nbTry + " / " + nbTotalTry)
            if (wordToFind.search(letter) === -1) {
                // On est dans le cas où la lettre n'a pas été trouvé
                console.log("lettre non trouvé : " + letter)
                error += 1
                // Pour afficher l'image en cours du pendu
                image = this.drawPendu(error, nbTry, nbTotalTry)//<img src={TAB_IMAGES_PENDU[error]} alt={TAB_IMAGES_PENDU[error]}  />
                smiley = this.drawSmiley(score, error, false ) //TAB_SMILEYS_ERREURS[error]
                startNewParty = false

            }
            else {
                // On est dans le cas où la lettre a été trouvé
                console.log("lettre trouvé : " + letter)
                // On récupère le résultat une fois que nous avons cherché à remplacer les lettre sur le mot (ou la phrase à trouver par des "_"
                motCache = this.computeDisplay(wordToFind, this.usedLetters)
                score += 1
                letterFind += 1
                smiley = this.drawSmiley(score, error, true)//(score<TAB_SMILEY_BONNE_REPONSE.length)?TAB_SMILEY_BONNE_REPONSE[score]:TAB_SMILEY_BONNE_REPONSE[TAB_SMILEY_BONNE_REPONSE.length-1]
                startNewParty = false

                if (motCache === wordToFind) {
                    // On va afficher le smiley en fonction du nombre de tentatives
                    console.log("Game::UpDateValues => nbtry : " + nbTry + " / " + nbTotalTry + " Mot trouvé")
                    startNewParty = true
                    if (error === 0) {
                        // Pour afficher l'animation quand la partie est gagné sans erreur
                        smiley = this.drawSmiley(score, error)//TAB_SMILEY_BONNE_REPONSE[TAB_SMILEY_BONNE_REPONSE.length-1]
                        image = this.drawPendu(error, nbTry, nbTotalTry, true)//<div className="animation-gagne" ></div>
                    }
                    else {
                        // Pour afficher l'animation quand la partie est gagné avec des erreurs
                        smiley = this.drawSmiley(score, error)//TAB_SMILEY_BONNE_REPONSE[TAB_SMILEY_BONNE_REPONSE.length-error]
                        image = this.drawPendu(error, nbTry, nbTotalTry, true)//<div className="animation-sauve" ></div>
                    }
                    result= this.showResult(true)//<div className="Message"> Bravo, vous avez gagné!</div>
                }
            }

        }
        else {
            console.log("Game::UpDateValues => nbtry : " + nbTry + " / " + nbTotalTry + " Mot non trouvé")
            error = TAB_IMAGES_PENDU.length-1
            // Pour afficher l'image en cours du pendu
            image = this.drawPendu(error, nbTry, nbTotalTry)//<img src={TAB_IMAGES_PENDU[error]} alt={TAB_IMAGES_PENDU[error]} width="220" height="330" /> //
            startNewParty = true
            // L.a partie est perdu, on affiche le mot qu'il fallait trouver ainsi qu'un smiley triste
            smiley = this.drawSmiley(score, error, false)//TAB_SMILEYS_ERREURS[TAB_SMILEYS_ERREURS.length-1]//
            result = this.showResult(false, wordToFind)//<div className="Message"> Dommage, vous avez perdu.<br /> Le mot à trouver était : <br /> <div className="H4">{wordToFind}</div></div>
        }
        // On met à jour de façon asynchrone notre state ainsi que le lancement de la mise à jour de l'affichage eavec un décalage
        // pour que nos nouvelles valeurs soient prises en compte
        //console.log ("Game::updateValues => statue : " + this.state.statue)
        setTimeout(()=>this.setState ({
                statue: statue,
                image: image,
                motCache: motCache,
                score: score,
                nbTry: nbTry,
                smiley: smiley,
                partyInbPlay: partyInPlay,
                error: error,
                letterFind: letterFind,
                startNewParty : startNewParty,
                result: result,
            }), VISUAL_PAUSE_MSECS

        )
        //console.log ("Game::updateValues => statue : " + this.state.statue)
    }

    /**
     * Méthode qui gère le click sur une des touches du clavier affiché
     * @param index
     * @returns {String}
     */
    handleLetterClick(index) {
        //console.log("Game::handleLetterClick : "  + index)
        const letter = LETTERS[index]
        this.updateValues(letter.toUpperCase())
    }

    /**
     * Méthode qui permet de récupérer la valeur de la touche appuyée et de contrôler si la touche à déjà été appuyé ou est interdite
     * @param event
     */
    onKeyPress(event) {
        console.log("Game::onKeyPress : "  + JSON.stringify(event.key) + " usedLetter : "  + JSON.stringify(this.usedLetters).toString())
        // On vérifie que la lettre est déjà utilisé
        // On interdit toutes les autres lettres à part celle de l'alphabet 'a' à 'z' et espace
        const regExp = new RegExp(/[^a-zA-Z\s]/,'uig')//('\(|\)|\\d|\\S','g')
        if (regExp.test(event.key)) {
            alert("lettre ou caractère interdit")
        }
        else {
            if( this.usedLetters.has(event.key)) {
                alert("lettre déjà utilisé")
            }
            else {
                //console.log ("regExp : " + regExp + " =>" )
                this.updateValues(event.key.toUpperCase())
            }
        }
    }



    /**
     * Méthode qui permet de lancer une nouvelle partie
     * @param index
     */
    onNext(index){
        console.log ("Game::onNext()")
        // Ici les constantes (les valeurs qui ne changent pas)
        const nbPlayer = this.state.nbPlayer
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerOne = this.state.playerOne
        const playerTwo = this.state.playerTwo

        // Ici les valeurs qui vont changer
        let partyInPlay = this.state.partyInPlay
        let playerNumber = this.state.playerNumber

        let statue = this.state.statue//(nbPlayer === 2)?'NEXT_PLAYER':'NEXT'
        //console.log("Game::onNext() => statue : " + statue + " , => nbPlayer : " + nbPlayer)
        //playerNumber = (nbPlayer === 2)?2:1
        let score = this.state.score

        let scorePlayerOne = this.state.playerOne.score
        let scorePlayerTwo = this.state.playerTwo.score


        if (partyInPlay < nbPartiesToPlay ) {
            this.usedLetters.clear()
            if (playerNumber === nbPlayer && statue === 'NEXT_PLAYER') {
                scorePlayerTwo = score
                statue = 'NEXT'
                playerNumber = 1
                partyInPlay ++
            }
            else if (statue === 'NEXT_PLAYER' ) {
                scorePlayerOne = score//this.state.playerOne.score
                //tableWordsToFind = playerTwo.tableWordsToFind
                playerNumber = 2
                //score = playerTwo.score
            }
            else {
                //console.log("Game::onNext() => score : " + score + " , => scorePlayerOne : " + scorePlayerOne + " , => statue : " + statue)
                statue = 'NEXT'
                playerNumber = 1
                partyInPlay ++
                scorePlayerOne = score
            }
            //console.log("playerNumber===nbPlayer : " + playerNumber===nbPlayer + " , => playerNumber : " + playerNumber)


            score = (statue === 'NEXT')?scorePlayerOne:scorePlayerTwo
            //console.log("Game::onNext() => statue === 'NEXT' : " + statue + " === " +  statue + " result : " + (statue === 'NEXT'))
            const playerOneName = playerOne.playerName
            const playerTwoName = playerTwo.playerName
            const playerName = (statue === 'NEXT')?playerOneName:playerTwoName
            //console.log("Game::onNext() => playerName : " + playerName + " , => playerNumber : " + playerNumber + " , => nbPlayer : " + nbPlayer)
            const tableWordsToFindForPlayerOne = playerOne.tableWordsToFind
            const tableWordsToFindForPlayerTwo = playerTwo.tableWordsToFind
            const tableWordsToFind = (playerNumber===nbPlayer)?tableWordsToFindForPlayerOne:tableWordsToFindForPlayerTwo
            //console.log("Game::onNext() => tableWordsToFind : " + tableWordsToFind)
            const wordToFind = tableWordsToFind[partyInPlay-1]
            const image = this.drawPendu(0, 0,0)
            const smiley = this.drawSmiley(0, 0)
            const motCache= this.computeDisplay(wordToFind, this.usedLetters)
            const startNewParty = false

            this.setState({
                statue: statue,
                nbPlayer : nbPlayer,
                playerNumber: playerNumber,
                motCache: motCache,
                wordToFind: wordToFind,
                partyInPlay: partyInPlay,
                nbTry: 0,
                error :0,
                result: "",
                letterFind: 0,
                playerName: playerName,
                score: score,
                image: image,
                smiley: smiley,
                startNewParty: startNewParty,
                tableWordsToFind: tableWordsToFind,
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
            const nbPlayer = this.state.nbPlayer
            const playerOne = this.state.playerOne
            const playerTwo = this.state.playerTwo
            this.setState({
                statue: 'END',
                nbPlayer: nbPlayer,
                playerOne: playerOne,
                playerTwo: playerTwo,
            })
        }
    }

    /**
     * Méthode qui permet de revenir sur la page principale
     * @param index
     */
    onReturn(index)  {
        console.log ("Game::onReturn()")
        //usedLetters.clear()
        this.setState({statue: 'BEGIN'})
    }

    /**
     * Gère les différents affichages
     * @returns {*}
     */
    render() {
        //console.log ("Game::render")
        //console.log("Game::render => state : " + JSON.stringify(this.state))
        console.log("Game::render => state:statue : " + this.state.statue)
        const statue = this.state.statue
        const nbPlayer = this.state.nbPlayer
        const letters = this.state.letters
        const score = this.state.score
        const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerName  = this.state.playerName
        const partyInPlay = this.state.partyInPlay
        const image =  this.state.image
        const motCache = this.state.motCache//this.computeDisplay(wordToFind, usedLetters)
        const smiley = this.state.smiley
        const startNewParty = this.state.startNewParty
        const result = this.state.result
        //const tableWordsToFind = this.state.tableWordsToFind

        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'BEGIN') {
            return ( <App /> )
        }
        /**
         * Affichage par défaut (celui qui se produt à la fin de la partie)
         */
        else if(statue === 'END') {
            //console.log("Player::render => end : " + JSON.stringify(this.state))
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

        /**
         * Affichage de la partie en cours avec les diverses informations
         * playerName : Nom du joueur
         * nbPartiesToPlay : Nombre de parties à joueur
         * partyInPlay partie(s) jouée(s)
         * score : score actuelle
         * nbTotalTry : Nombre total d'essais
         * nbTry : Nombre d'essais déjà effectué ou en cours (démarrant à 0)
         * image : image à afficher ou l'animation. son afficha ge est créée dans le méthode updateValues
         * Les lettres qui ont déjà été cliquées sont cachés
         * Un smiley s'affiche en fonction du résultat
         */
        else {
            console.log("Game::render => state::startNewParty : " + this.state.startNewParty + " ; this.state.motCache : " + this.state.motCache + " ; this.state.wordToFind :" + this.state.wordToFind)
            return (
                <div className="App" >
                    <Header />
                    <div className="Body" >
                        <PlayerInfo
                            playerName={playerName}
                            partyInPlay={partyInPlay}
                            nbPartiesToPlay={nbPartiesToPlay}
                            nbTry={nbTry}
                            nbTotalTry={nbTotalTry}
                            score={score}
                        />
                        <div className="Center">
                            <KeyBoard
                                hidden={startNewParty}
                                letters={letters}
                                usedLetters={this.usedLetters}
                                onClick={(index)=>this.handleLetterClick(index)}
                            />
                            <div className="Play-zone">
                                <div className="Play-party">
                                    <span>Mot à trouver : </span>
                                    <div className="Word-To-Find" onChange={this.onKeyPress}>
                                        <span>{motCache}</span>
                                    </div>
                                    <div className="Img-To-Show">
                                        {image}
                                    </div>
                                </div>
                                <div className="Right">
                                    <div className="Smiley">
                                        {smiley}
                                    </div>
                                    <div className="Message-To-Show" hidden={!startNewParty}>
                                        {result}
                                    </div>
                                    <div className="Button" hidden={!startNewParty}>
                                        <Button className={"Btn-Property"} value={"Partie suivante"} index={0} hidden={!startNewParty} onClick={this.onNext }/>
                                    </div>
                                </div>
                            </div>
                            <BackToMainPage onClick = {this.onReturn}/>
                        </div>
                    </div>
                    <Footer />
                </div>

            )
        }

    }
}


export default Game