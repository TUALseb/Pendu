/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */


import React, { Component } from 'react'

//Importation des fichier js que nous aurons besoin
//import KeyBoard from './KeyBoard.js'
//import PlayerInfo from './PlayerInfo.js'
import Button from './Button.js'
import App from './App.js'
import Header from './Header.js'
import OnePlayer from './OnePlayer.js'

// Importaion des images du pendu que nous allons utiliser
import img_none from './images/none.png'
import img_socle from './images/socle.png'
import img_socle_pied from './images/socle_pied.png'
import img_poteau from './images/socle_pied_poteau.png'
import img_traverse from './images/socle_pied_poteau_traverse.png'
import img_ajout_corde from './images/ajout_corde.png'
import img_ajout_tete from './images/ajout_tete.png'
import img_ajout_corps from './images/ajout_corps.png'
import img_ajout_jambe_droite from './images/ajout_jambe_droite.png'
import img_ajout_jambe_gauche from './images/ajout_jambe_gauche.png'
import img_ajout_bras_droit from './images/ajout_bras_droit.png'
import img_ajout_bras_gauche from './images/ajout_bras_gauche.png'


//Importation des smileys
import smiley_triste from './images/smiley-triste.png'
import smiley_content from './images/smiley-cotent.png'
import smiley_heureux from './images/smiley-heureux.jpg'
import smiley_etonne from './images/smiley-etonne.png'
import smiley_moyen from './images/smiley-moyen.png'
import smiley_surpris from './images/smiley-surpris.png'
import smiley_joyeux from './images/smiley_joyeux.png'

// Importation du fichier de style
import './Game.css'

const LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','à','â','ç','é','è','ï','î','ù','û',' ','\'']
const TAB_IMAGES_PENDU =[
    img_none, img_socle, img_socle_pied, img_poteau, img_traverse, img_ajout_corde, img_ajout_tete,
    img_ajout_corps, img_ajout_jambe_gauche, img_ajout_jambe_droite, img_ajout_bras_gauche, img_ajout_bras_droit]
const usedLetters = new Set()
const VISUAL_PAUSE_MSECS = 750


class Game extends Component {

    state = {
        letters : {},
        statue: '',
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry : 0,
        nbTotalTry : 0,
        playerName: "",
        score : 0,
        image: "",
        alt: "",
        wordToFind: "",
        smiley: "",
        motCache: "",
        error : 0,
        startNewParty: false,
    }


    /**
     * Constructeur
     * Méthode appelé en premier au moment de la création de la classe
     * Permet d'initialiser les valeiurs des propriétés de state et de déclarer les méthodes nécessaires
     * @param props => tableau de propriétés et méthodes passés en paramètres
     */
    constructor(props) {
        console.log ("Game::constructor()")
        super(props)
        //console.log ("props : " +JSON.stringify(props))
        this.state = {
            letters: this.generateTable(),
            statue: props.statue,
            nbTotalTry: props.wordToFind.length*2,
            nbTry: props.nbTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: props.partyInPlay,
            score: props.score,
            playerName: props.playerName,
            image: TAB_IMAGES_PENDU[0],
            alt: props.alt,
            wordToFind: props.wordToFind,
            smiley: smiley_moyen,
            motCache: this.computeDisplay(props.wordToFind, usedLetters),
            error : 0,
            startNewParty: props.startNewParty,
        }

        this.computeDisplay = this.computeDisplay.bind(this)
        //this.handleLetterClick = this.handleLetterClick.bind(this)
        //console.log ("Game::state : " +JSON.stringify(this.state))
    }

    /**
     Appelé en second juste avant le render()
     */
    componontWillMount() {
        console.log("Game::componentDidUpdate")
        console.log ("Game::state : " +JSON.stringify(this.state))
    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        console.log ("Game::componentDidMount()")
        //console.log ("Game::State: " + JSON.stringify(this.state))
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUmount() {

    }

    componentDidUpdate(props, nextSate) {
        console.log("Game::componentDidUpdate")
        console.log ("state : " + JSON.stringify(props))
        console.log ("nextSate : " + JSON.stringify(nextSate))


    }

    componentWillUpdate(state, nextSate) {
        console.log("Game::componentWillUpdate")
        console.log ("state : " + JSON.stringify(state))
        console.log ("nextSate : " + JSON.stringify(nextSate))
        if (this.shouldComponentUpdate(state, nextSate)) {
            console.log ("Game::componentDidUpdate se met à jour : " + JSON.stringify(this.state))
        }
        else {
            console.log ("Game::componentDidUpdate ne se met pas à jour : " + JSON.stringify(this.state))
        }
        //this.setState ({props : nextSate})
    }


    componentWillReceiveProps(props, nextContent){
        console.log("Game::componentWillReceiveProps")
        console.log ("nextProps : " + JSON.stringify(props))
        console.log ("nextContent : " + JSON.stringify(nextContent))
        this.setState({props : nextContent})
    }

    /**
     * Méthode invoqué avant le rendu
     *
     * @param props
     * @param nextProps
     * @returns {boolean} :
     *      true => valeur par défaut, permet la mise à jour du composant
     *      false => permet d'empécher la mise à jour du composant (mais pas celle
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Game::shouldComponentUpdate")
        //console.log ("props : " + JSON.stringify(props))
        console.log ("nextProps : " + JSON.stringify(nextProps))
        console.log ("nextState : " + JSON.stringify(nextState))
        /*if (nextProps.nbTry === nextProps.nbTry) {
            return false
        }
        else {
            return true
        }*/
        return true
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
     * Méthode qui permet de revenir sur la page principale
     * @param index
     */
    onReturn = index => {
        console.log ("Game::onReturn()")
        this.setState({statue: 'BEGIN'})
    }

    /**
     * Méthode qui gère le click sur une des touches du clavier affiché
     * @param index
     * @returns {String}
     */
    handleLetterClick(index) {
        const letter = LETTERS[index]
        let image = this.state.image
        let nbTry = this.state.nbTry
        let score = this.state.score
        let partyInPlay = this.state.partyInPlay
        let smiley = this.state.smiley
        const nbTotalTry =this.state.nbTotalTry
        const wordToFind = this.state.wordToFind
        let motCache = this.state.motCache
        let error = this.state.error
        let startNewParty = this.state.startNewParty


        console.log ("nbTry : " + nbTry)
        if (wordToFind === motCache){
            console.log("mot identiques")
            console.log("state : " + JSON.stringify(this.state))
            if (nbTry < (nbTotalTry/3)){
                smiley = smiley_joyeux
            }
            else if ((nbTotalTry/3) >= nbTry <((nbTotalTry*2)/3)){
                smiley = smiley_heureux
            }
            else if (((nbTotalTry*2)/3) >= nbTry <nbTotalTry){
                smiley = smiley_moyen
            }
            partyInPlay ++

        }
        else if (nbTry < nbTotalTry) {
            if(wordToFind.search(letter) !== -1){
                console.log("lettre trouvé : " + letter)
                usedLetters.add(letter)
                motCache = this.computeDisplay(wordToFind, usedLetters)
                smiley = smiley_content
                score++
            }
            else{
                console.log("lettre non trouvé : " + letter)
                image = TAB_IMAGES_PENDU[error]
                smiley = smiley_surpris
                usedLetters.add(letter)
                error++
            }
            nbTry++
        }
        else {
            // La partie est fini
            partyInPlay ++
            if (wordToFind === motCache) {
                smiley = smiley_moyen
            }
            else {
                smiley = smiley_triste
            }
            console.log (" new state : " + JSON.stringify(this.state))
        }

        setTimeout(()=>this.setState ({
                image: image,
                motCache: motCache,
                score: score,
                nbTry: nbTry,
                smiley: smiley,
                partyInbPlay: partyInPlay,
                error: error,
                startNewParty : startNewParty,
            }), VISUAL_PAUSE_MSECS
        )
        console.log ("state : " + JSON.stringify(this.state))

    }


    /**
     * Méthode qui permet de lancer une nouvelle partie
     * @param index
     */
    onNewParty = index => {
        console.log ("Game::onReturn()")
        this.setState({statue: 'NEW_GAME'})
    }

    /**
     * Méthode qui permet de remplacer les lettres non trouvé par des "_"
     * @param phrase
     * @param usedLetters
     * @returns {string | void | *}
     */
    computeDisplay(phrase, usedLetters) {
        console.log("usedLetters : " + JSON.stringify(usedLetters))
        console.log ("Phrase ou mot à trouver : " + phrase)
        //if (phrase != undefined)
        // /(\W+)(\w+)
        // \w
        let regExp = /(\w)|(\W)/g
        return phrase.replace(regExp,
            (letter) => (usedLetters.has(letter) ? letter : '_')
        )
    }

    /**
     *
     * @returns {*}
     */
    render() {
        //console.log ("Game::render")
        //console.log("Game::render::state" + JSON.stringify(this.state))
        const letters = this.state.letters
        const score = this.state.score
        const nbTotalTry = this.state.nbTotalTry
        const nbTry = this.state.nbTry
        const statue = this.state.statue
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerName  = this.state.playerName
        const partyInPlay = this.state.partyInPlay
        const image =  this.state.image
        const alt = this.state.alt
        const wordToFind = this.state.wordToFind
        const motCache = this.state.motCache//this.computeDisplay(wordToFind, usedLetters)
        const smiley = this.state.smiley
        const startNewParty = this.state.startNewParty
        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'BEGIN')
        {
            return (
                <App />
            )
        }
        else if(statue=== 'NEW_GAME')
        {
            return (
                <OnePlayer
                    playerName = {playerName}
                    nbPartiesToPlay = {nbPartiesToPlay}
                    partyInPlay = {partyInPlay}
                    nbTry = {0}
                    nbTotalTry = {nbTotalTry}
                    score = {score}
                    motCache = {""}
                    startNewParty = {false}
                />
            )
        }
        /**
         * Affichage de la partie en cours aec les diverses informations
         * playerName : Nom du joueur
         * nbPartiesToPlay : Nombre de parties à joueur
         * partyInPlay partie(s) jouée(s)
         * score : score actuelle
         * nbTotalTry : Nombre total d'essais
         * nbTry : Nombre d'essais déjà effectué ou en cours (démarrant à 0)
         * image : image à afficher
         * alt : alternative si image existe pas
          */
        else {
            return (
                <div className="App">
                    <Header />
                    <div className="Body-game">
                        <div className="Top">
                            <div className="ScoreCounter">
                                <div className="Player">
                                    <span>Joueur : </span>{playerName}
                                </div>
                                <div className="Parties">
                                    <span>partie </span>{partyInPlay}/{nbPartiesToPlay}
                                </div>
                                <div className="Counter">
                                    <span>Nombre d'essai : </span>{nbTry}/{nbTotalTry}
                                </div>
                                <div className="Score">
                                    <span>Score : </span>{score}
                                </div>

                            </div>
                        </div>
                        <div className="Play-zone">
                            <div className="Left">
                                <div className="Keyboard">
                                    { letters.map((letter, index) => (
                                        <Button
                                            value={letter}
                                            index={index}
                                            key={index}
                                            onClick={(index)=>this.handleLetterClick(index)}
                                        />
                                    ))}

                                    <div className="Btn-button">
                                    </div>
                                </div>
                            </div>
                            <div className="Play-party">
                                <span>Mot à trouver : </span>
                                <div className="Word-To-Find">
                                    {wordToFind}   {motCache}
                                </div>
                                <div className="Img-To-Show">
                                    <img src={image} alt={alt}/>
                                </div>
                            </div>
                            <div className="Right">
                                <div className="Smiley">
                                    <img src={smiley} alt={smiley}/>
                                </div>
                                <div className="Button" >
                                    <Button value={"Nouvelle partie"} index={0} hidden={!startNewParty} onClick={this.onNewParty }/>
                                </div>
                            </div>
                        </div>
                        <div className="Bottom">
                            <div className="Button">
                                <Button value={"Retour"} index={0} hidden={false} onClick={this.onReturn }/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default Game