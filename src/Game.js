/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'

//Importation des fichier js que nous aurons besoin
import Button from './Button.js'
import App from './App.js'
import Header from './Header.js'
import Footer from './Footer.js'
//import OnePlayer from './OnePlayer.js'

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
import Player from "./Player";


// Tableau des lettres à afficher
const LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','à','â','ç','é','è','ï','î','ù','û',' ','\'']
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
const usedLetters = new Set()
const VISUAL_PAUSE_MSECS = 750

/**
 *
 */
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
        letterFind : 0,
        startNewParty: false,
        result: "",
        tableWordsToFind: [],
        playerOne: {},
        playerTwo: {},
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
        console.log ("Game::constructor()::props : " +JSON.stringify(props))
        this.state = {
            // On va créer le tableau avec les lettres de l'alaphabet et de certains caractères (espace, giuillemets, caractères avec accents)
            letters: this.generateTable(),
            statue: props.statue,
            //En fonction de la taille du mot (s'il est < à la valeur par défaut, soit 12) on initialise le nombre total d'essai
            nbTotalTry: (props.wordToFind.length<props.nbTotalTry)? props.nbTotalTry:(props.wordToFind.length*2),
            nbTry: props.nbTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: props.partyInPlay,
            score: props.score,
            playerName: props.playerName,
            // On initialise l'image du pendu à none (soit rien du pendu)
            image: <img src={TAB_IMAGES_PENDU[0]} alt={TAB_IMAGES_PENDU[0]} width="220" height="330" />,
            alt: props.alt,
            wordToFind: props.wordToFind,
            smiley: TAB_SMILEY_BONNE_REPONSE[0],
            // On cache le mot à trouver
            motCache: this.computeDisplay(props.wordToFind, usedLetters),
            error : 0,
            letterFind : 0,
            startNewParty: props.startNewParty,
            tableWordsToFind: props.tableWordsToFind,
            result: "",

            playerOne: props.playerOne,
            playerTwo: props.playerTwo,
        }
        // on déclare les méthodes qui doivent être attaché à this
        this.computeDisplay = this.computeDisplay.bind(this)
        this.onReturn = this.onReturn.bind(this)
        this.onNext = this.onNext.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
        //this.handleLetterClick = this.handleLetterClick.bind(this)
    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        //console.log ("Game::componentDidMount()")
        //console.log ("Game::State: " + JSON.stringify(this.state))
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous libérons manuellement cet évènement
        document.addEventListener("keypress", this.onKeyPress)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUnmount() {
        // Nécessaire pour gérer les évènements liés au clavier
        // Nous déttachons manuellement cet évènement
        document.removeEventListener("keypress", this.onKeyPress)
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
    onReturn(index)  {
        //console.log ("Game::onReturn()")
        usedLetters.clear()
        this.setState({statue: 'BEGIN'})
    }

    /**
     * Méthode qui gère le click sur une des touches du clavier affiché
     * @param index
     * @returns {String}
     */
    handleLetterClick(index) {
        const letter = LETTERS[index]
        this.updateValues(letter)
    }

    /**
     * Méthode qui permet de récupérer la valeur de la touche appuyée
     * @param event
     */
    onKeyPress(event) {
        //console.log(event)
        // Nous créons une expression régulière pour tester certaines touuches et les interdires
        //const regExp = /\d/
        //|/[&§!$*¥€`@£%=+:;,?∞¿.•…÷ë“{¶«¡ø}—Ø»å±•"|\]/g/i

        //const testRegexp = RegExp(regExp)
        //if (testRegexp.test(event.key)) {
        //    alert("Attention ! Lettre interdite")
        //}
        //else
        //if (usedLetters.has(event.key) ) {
            // On est dans le cas ou la lettre à déjà été choisi et trouvé (ou non)
        //    alert("Attention ! Vous avez déjà tenté cette lettre")
        //}
        //else {
            this.updateValues(event.key)
        //}
    }

    /**
     * Méthode qui permet de mettre à jour nos paramètres et  l'état de la partie en cours
     * @param letter
     */
    updateValues(letter) {
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
        usedLetters.add(letter)
        /*
        Le nombre d'essai n'est pas atteint, on continue
         */
        if (nbTry < nbTotalTry) {
            if (wordToFind.search(letter) === -1) {
                // On est dans le cas où la lettre n'a pas été trouvé
                console.log("lettre non trouvé : " + letter)
                error += 1
                // Pour afficher l'image en cours du pendu
                image = <img src={TAB_IMAGES_PENDU[error]} alt={TAB_IMAGES_PENDU[error]}  />
                smiley = TAB_SMILEYS_ERREURS[error]//smiley_surpris
                startNewParty = false
                if (error === TAB_IMAGES_PENDU.length - 1) {
                    // La partie est perdu
                    startNewParty = true
                    smiley = TAB_SMILEYS_ERREURS[TAB_SMILEYS_ERREURS.length-1]//smiley_triste
                }
            }
            else {
                // On est dans le cas où la mettre a été trouvé
                console.log("lettre trouvé : " + letter)
                // On récupère le résultat une foisque nous avons cherché à remplacer les lettre sur le mot (ou la phrase à trouver par des "_"
                motCache = this.computeDisplay(wordToFind, usedLetters)
                score += 1
                letterFind += 1
                smiley = TAB_SMILEY_BONNE_REPONSE[score]
                startNewParty = false

                if (motCache === wordToFind) {
                    // On va afficher le smiley en fonction du nombre de tentatives

                    startNewParty = true
                    if (error === 0) {
                        // Pour afficher l'animation quand la partie est gagné sans erreur
                        smiley = TAB_SMILEY_BONNE_REPONSE[TAB_SMILEY_BONNE_REPONSE.length-1]
                        image = <div className="animation-gagne" ></div>
                    }
                    else {
                        // Pour afficher l'animation quand la partie est gagné avec des erreurs
                        smiley = TAB_SMILEY_BONNE_REPONSE[TAB_SMILEY_BONNE_REPONSE.length-error]
                        image = <div className="animation-sauve" ></div>
                    }
                    result= <div className="Message"> Bravo, vous avez gagné!</div>
                }
            }
            nbTry++
        }
        else {
            error = TAB_IMAGES_PENDU.length
            // Pour afficher l'image en cours du pendu
            image = <img src={TAB_IMAGES_PENDU[error]} alt={TAB_IMAGES_PENDU[error]} width="220" height="330" /> //
            startNewParty = true
            // L.a partie est perdu, on affiche le mot qu'il fallait trouver ainsi qu'un smiley triste
            smiley = TAB_SMILEYS_ERREURS[TAB_SMILEYS_ERREURS.length-1]//
            result = <div className="Message"> Dommage, vous avez perdu.<br /> Le mot à trouver était : <br /> <div className="H4">{wordToFind}</div></div>
        }
        // On met à jour de façon asynchrone notre state ainsi que le lancement de la mise à jour de l'affichage eavec un décalage
        // pour que nos nouvelles valeurs soient prises en compte
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
        //console.log ("state : " + JSON.stringify(this.state))
    }


    /**
     * Méthode qui permet de lancer une nouvelle partie
     * @param index
     */
    onNext(index){
        console.log ("Game::onNext()")
        console.log ("Game::onNext():this.state" + JSON.stringify(this.state))
        //let partyInInPlay = this.state.partyInPlay + 1
        //const motCache = ""
        usedLetters.clear()
        const tableWordsToFind = this.state.tableWordsToFind
        this.setState({
            statue: 'NEXT',
            motCache: "",
            error :0,
            tableWordsToFind: tableWordsToFind,
        })
    }

    /**
     * Méthode qui permet de remplacer les lettres non trouvé par des "_"
     * @param phrase
     * @param usedLetters
     * @returns {string | void | *}
     */
    computeDisplay(phrase, usedLetters) {
        //console.log("usedLetters : " + JSON.stringify(usedLetters))
        console.log ("Phrase ou mot à trouver : " + phrase)
        // /(\W+)(\w+)
        // \w
        let regExp = /(\w)|(\W)/g
        return phrase.replace(regExp,
            (letter) => (usedLetters.has(letter) ? letter : '_')
        )
    }

    /**
     * Gère les différents affichages
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
        const motCache = this.state.motCache//this.computeDisplay(wordToFind, usedLetters)
        const smiley = this.state.smiley
        const startNewParty = this.state.startNewParty
        const result = this.state.result
        const tableWordsToFind = this.state.tableWordsToFind
        const playerOne = this.state.playerOne
        const playerTwo = this.state.playerTwo

        /**
         * On a appuyé sur le bouton "Retour" ==> Nous sommes renvoyé vers la page principale
         */
        if (statue === 'BEGIN') {
            return ( <App /> )
        }
        /**
         * On relance une nouvelle partie.
         * Pour cela nous allons intialiser le component OnePlayer avec les valeurs que nous avons besoin.
         * Certaines de ces valeurs sont récupérées plus haut comme :
         * playerName = {playerName}
         * nbPartiesToPlay = {nbPartiesToPlay}
         * partyInPlay = {partyInPlay+1}
         * nbTotalTry = {nbTotalTry}
         * Les autres sont réinitialisées avec les valeurs de bases
         */
        else if(statue === 'NEXT') {
            return (
                <Player
                    statue = {statue}
                    playerName = {playerName}
                    nbPartiesToPlay = {nbPartiesToPlay}
                    partyInPlay = {partyInPlay}
                    nbTry = {0}
                    nbTotalTry = {nbTotalTry}
                    score = {score}
                    motCache = {""}
                    startNewParty = {false}
                    tableWordsToFind = {tableWordsToFind}
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
         * Le bouton "Nouvelle partie est caché ou affiché en fonction du résultat de la partie
         * Un smiley s'affiche en fonction du résultat
         * Un message s'affiche à la fin
         */
        else {
            return (
                <div className="App" >
                    <Header />
                    <div className="Body-game" >
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
                                <div className="Keyboard" >
                                    { letters.map((letter, index) => (
                                        <Button
                                            value={letter}
                                            index={index}
                                            key={index}
                                            hidden={usedLetters.has(letter)? true:false}
                                            onClick={(index)=>this.handleLetterClick(index)}
                                        />
                                    ))}
                                </div>
                            </div>
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
                                    <img src={smiley} alt={smiley} width="auto" height="auto"/>
                                </div>
                                <div className="Message-To-Show" hidden={!startNewParty}>
                                    {result}
                                </div>
                                <div className="Button" >
                                    <Button value={"Partie suivante"} index={0} hidden={!startNewParty} onClick={this.onNext }/>
                                </div>
                            </div>
                        </div>
                        <div className="Bottom">
                            <div className="Button">
                                <Button value={"Retour"} index={0} hidden={false} onClick={this.onReturn }/>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

            )
        }

    }
}


export default Game