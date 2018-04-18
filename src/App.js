/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import React, { Component } from 'react'

//Importation des fichier js que nous aurons besoin
import Header from './Header.js'
import Button from './Button.js'
import Game from './Game.js'
import Configurer from './Configurer.js'



// Importation du fichier de style
import './App.css'


// Déclaration des valeurs par défault
const DEFAULT_STATUE = 'BEGIN'
const DEFAULT_NB_TRY = 13
const DEFAULT_NB_PARTY = 3
const DEFAULT_PLAYER_ONE = "Player One"
const DEFAULT_PLAYER_TWO = "Player Two"
const DEFAULT_NB_PLAYER = 0

/**
 * class de l'application.
 * Gère de façon globale ce qui se passe
 */
class App extends Component {
    state = {

        statue: '',
        nbPlayer: 0,
        nbTotalParties: 0,
        nbTry: 0,
        playerOne: "",
        playerTwo: "",
    }


    /**
     * Constructeur
     * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class App
     * @param props
     */
    constructor(props) {
        super(props)
        console.log ("App::constructor()")
        console.log ("props: " + JSON.stringify(props))

        this.state = {
            statue: props.statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalParties: props.nbTotalParties,
            playerOne: props.playerOne,
            playerTwo : props.playerTwo,
        }
    }

    /**
     Appelé en second juste avant le render()
     */
    componontWillMount(statue, nbPlayer) {
        console.log ("App::componentWillMount()")
        console.log ("statue: " + statue + " nbPlayer: " + nbPlayer)
        console.log ("state : " + this.state)

    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        console.log ("App::componentDidMount()")
        console.log ("App::State: " + JSON.stringify(this.state))
    }


    componentWillReceiveProps({ statue='BEGIN', nbPlayer=0 }) {
        console.log ("App::componentWillReceiveProps()")
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
     * Méthode qui permet en, fonction de la valeur de index de savoir combien de joueurs participent
     * @param index
     */
    onSelectNbPlayer = index => {
        console.log("App::OnSelectOnePlayer()")
        // On itialise les variables statue et nbPlayer avec les valeurs par défaut
        let statue = this.state.statue
        let nbPlayer = this.state.nbPlayer
        // cas ou c'est une partie à un joueur qui est sélectionné
        if (index === 1){
            statue = 'ONE_PLAYER'
            nbPlayer = 1
        }
        // cas ou c'est une partie à deux joueurs qui est sélectionné
        else if (index === 2){
            statue = 'TWO_PLAYER'
            nbPlayer = 2
        }
        console.log ("index : " + index)
        // On let à jour le state de App
        this.setState ({ statue: statue, nbPlayer: nbPlayer})
    }

    /**
     * Méthode qui permet de modifier les valeurs des propriétés de App
     * qui seront ensuite utilisées tout au long de la partie
     * @param index
     */
    onConfigurer = index => {
        console.log("App::onConfigurer()")
        this.setState({
            statue: 'CONFIGURER',
        })

    }

    /**
     * Méthode qui permet de revenir sur la page principale lors du clic sur le bouton "Retour"
     * @param index
     */
    onReturn = index => {
        console.log("App::onConfigurer()")
        this.setState({statue: 'BEGIN', nbPlayer: 0})
    }






    /**
     * Permet l'affichage générale
     * @returns {*}
     */
  render() {
      const statue = this.state.statue
      const nbTry = this.state.nbTry
      const nbTotalParties = this.state.nbTotalParties
      const playerOne = this.state.playerOne
      const playerTwo = this.state.playerTwo

      if (statue === 'ONE_PLAYER') {
          /**
           * Gère le cas où le jeu sera en mode monojeur
           */
          return (
              <div className="App">
                  <Header />
                  <Game
                      playerName = {playerOne}
                      nbPartiesToPlay = {nbTotalParties}
                      partyInPlay = {1}
                      nbTry = {nbTry}
                      score = {0}
                  />
              </div>
          )
      }
      else if (statue === 'TWO_PLAYER') {
          /**
           * Gère le cas où le jeu sera en mode 2 joueurs
           */
          return (
              <div className="App">
                  <Header />
                  <div className="Body">
                      <div className="H2">
                          <span>Cette fonction n'est pas encore implémenté</span>
                      </div>
                      <div className="Buttons">
                          <Button value={"retour"} index={0} onClick={this.onReturn } />
                      </div>
                  </div>
              </div>
          )
      }
      else if (statue === 'CONFIGURER') {
          /**
           * Permet d'appeler la classe qui s'occupera de la partie configuration du jeu
           */
          return(
                  <Configurer
                      nbTry = {nbTry}
                      nbTotalParties = {nbTotalParties}
                      playerOne = {playerOne}
                      playerTwo = {playerTwo}
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
                      <div className="H2" align="center">
                          Bienvenue dans le jeu du pendu.
                      </div>
                      <div className="H3" align="center">
                          Pour commencer, veuillez sélectionner si vous jouez à 1 ou 2 joueurs.
                      </div>
                      <div className="Btn-App">
                          <Button value={"1 joueur"} index={1} onClick={this.onSelectNbPlayer } />
                          <Button value={"2 joueurs"} index={2} onClick={this.onSelectNbPlayer} />
                          <Button value={"Configurer"} index={9} onClick={this.onConfigurer} />
                      </div>
                  </div>
              </div>
          )
      }

    }
}


// Valeurs transmise par défaut à App
App.defaultProps = {
    statue: DEFAULT_STATUE,
    nbPlayer: DEFAULT_NB_PLAYER,
    nbTry: DEFAULT_NB_TRY,
    nbTotalParties: DEFAULT_NB_PARTY,
    playerOne: DEFAULT_PLAYER_ONE,
    playerTwo : DEFAULT_PLAYER_TWO,
}

export default App
