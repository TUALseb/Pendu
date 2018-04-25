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
import App from './App.js'

// Importation du fichier de style
import './Configurer.css'



class Configurer extends Component{
    state = {
        nbTry: 0,
        nbPartiesToPlay: 0,
        playerOneName: "",
        playerTwoName: "",
        // Pour garder les valeurs initiales
        oldNbTry: 0,
        oldNbPartiesToPlay: 0,
        oldplayerOneName: "",
        oldPlayerTwoName: "",
        // Pour savoir si l'appui sur le bouton "Valider" ou "Annuler à été effectué
        validateCancel : false
    }

    /**
     * Constructeur
     * * Permet d'initialiser les propriétéds avec des valeurs par défaut de la class pour les renvoyer ensuite vers App
     * @param props
     */
    constructor(props) {
        super(props)
        console.log (props)

        this.state = ({
            nbTry: props.nbTry,
            nbPartiesToPlay : props.nbPartiesToPlay,
            playerOneName: props.playerOne,
            playerTwoName: props.playerTwo,
            // Nous sauvegardons les valeurs initiales en cas d'annulation
            oldNbTry: props.nbTry,
            oldNbPartiesToPlay: props.nbPartiesToPlay,
            oldplayerOneName: props.playerOne,
            oldPlayerTwoName: props.playerTwo,
        })
        // Essentielles pour permettre l'utilisation du this dans les méthodes
        // Sinon ce dernier est indéfini
        this.onChangeNbTry = this.onChangeNbTry.bind(this)
        this.onChangeNbPartiesToPlay = this.onChangeNbPartiesToPlay.bind(this)
        this.onChangePlayerOneName = this.onChangePlayerOneName.bind(this)
        this.onChangePlayerTwoName = this.onChangePlayerTwoName.bind(this)
        this.onValidate = this.onValidate.bind(this)
        console.log(JSON.stringify(this.state))
    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        console.log ("Configurer::componentDidMount()")
        console.log ("Configurer::State: " + JSON.stringify(this.state))
    }

    /**
     *
     * @param statue
     * @param nbPlayer
     */
    componentWillReceiveProps(props) {
        console.log ("Configurer::componentWillReceiveProps()")
        console.log(props)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUmount() {
        console.log ("App::componentWillUmount()")
    }

    /**
     *
     * @param props
     */
    componentDidUnount(props) {
        console.log ("App::componentDidUnount()")
        console.log(this.state)
    }

    /**
     * Méthode ui gère la modification du nombre d'essais
     * @param value
     */
    onChangeNbTry(value) {
        this.setState({ nbTry : value.target.value })
    }

    /**
     * Méthode qui gère la modification du nom de parties
     * @param value
     */
    onChangeNbPartiesToPlay(value) {
        this.setState({ nbPartiesToPlay : value.target.value })
    }

    /**
     * Méthode qui gère la modification du nom du premier joueur
     * @param value
     */
    onChangePlayerOneName(value) {
        this.setState({ playerOneName : value.target.value })
    }

    /**
     * Méthode qui gère la modification du second joueur
     * @param value
     */
    onChangePlayerTwoName(value) {
        this.setState({ playerTwoName : value.target.value })
    }


    /**
     * Méthode appelé lorsque l'on clic sur le bouton valider
     * Permet de revenir à la page principale en mettant à jour les propriétés avec les nouvelles valeurs
     * @param index
     */
    onValidate = index => {
        console.log ("Configurer::onValidate()")
        console.log ("Configurer::State: " + JSON.stringify(this.state))
        const validateCancel = true
        this.setState({validateCancel : validateCancel})
    }

    /**
     * Méthode appelé lors du clic sur le bouton annuler
     * Permet de ne pas prendre en compte les changements apportés
     * @param index
     */
    onCancel = index => {
        console.log ("Configurer::onCancel()")
        console.log ("Configurer::State: " + JSON.stringify(this.state))
        //Nous allons récupérer les anciennes valeurs
        const nbTry = this.state.oldNbTry
        const nbPartiesToPlay = this.state.oldNbPartiesToPlay
        const playerOneName = this.state.oldplayerOneName
        const playerTwoName = this.state.oldPlayerTwoName
        const validateCancel = true
        this.setState({
            nbTry: nbTry,
            nbPartiesToPlay : nbPartiesToPlay,
            playerOneName: playerOneName,
            playerTwoName: playerTwoName,
            validateCancel : validateCancel
        })
    }

    /**
     * Permet l'affichage générale
     * @returns {*}
     */
    render() {
        const nbTry = this.state.nbTry
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerOneName = this.state.playerOneName
        const playerTwoName = this.state.playerTwoName
        const validateCancel = this.state.validateCancel
        /**
         * L'appuis sur le bouton "Valider" ou "Annuler" a été effectué,
         * nous retournons les valeurs prise en compte sur le component App pour qu'il les prennent en compte
         */
        if (validateCancel === true) {
            return  (
                <App
                    nbTry = {nbTry}
                    nbPartiesToPlay = {nbPartiesToPlay}
                    playerOne = {playerOneName}
                    playerTwo = {playerTwoName}
                />
            )
        }
        /**
         * Il n'a pas été appuyé sur le bouton "Valider ou "Annuler" => Nous affichons donc la page par défaut
         */
        else {
            return (
                <div className="App">
                    <Header />
                    <div className="Configue">
                        <div>
                            <div className="Data">
                                <span className="Text"> Nombre d'essais : </span>
                                <input type="text" value={nbTry} onChange={this.onChangeNbTry} />
                                <br/>
                            </div>
                            <div className="Data">
                                <span className="Text"> Nombre de parties : </span>
                                <input type="text" value={nbPartiesToPlay} onChange={this.onChangeNbPartiesToPlay} />
                                <br/>
                            </div>
                            <div className="Data">
                                <span className="Text"> Nom du prermier joueur : </span>
                                <input type="text" value={playerOneName} onChange={this.onChangePlayerOneName} />
                                <br/>
                            </div>
                            <div className="Data">
                                <span className="Text"> Nom du second joueur : </span>
                                <input type="text" value={playerTwoName} onChange={this.onChangePlayerTwoName} />
                                <br/>
                            </div>

                        </div>
                        <div className="Buttons">
                            <Button value={"Valider"} index={1} hidden={false} onClick={this.onValidate } />
                            <Button value={"Annuler"} index={2} hidden={false} onClick={this.onCancel} />
                        </div>
                    </div>
                </div>

            )
        }


    }
}



export default Configurer