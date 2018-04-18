/*
 * Copyright (c) 2018. Sébastien TUAL
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
        nbTotalParties: 0,
        playerOneName: "",
        playerTwoName: "",
        // Pour garder les valeurs initiales
        oldNbTry: 0,
        oldNbTotalParties: 0,
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
            nbTotalParties : props.nbTotalParties,
            playerOneName: props.playerOne,
            playerTwoName: props.playerTwo,
            // Nous sauvegardons les valeurs initiales en cas d'annulation
            oldNbTry: props.nbTry,
            oldNbTotalParties: props.nbTotalParties,
            oldplayerOneName: props.playerOne,
            oldPlayerTwoName: props.playerTwo,
        })
        // Essentielles pour permettre l'utilisation du this dans les méthodes
        // Sinon ce dernier est indéfini
        this.onChangeNbTry = this.onChangeNbTry.bind(this)
        this.onChangeNbTotalParties = this.onChangeNbTotalParties.bind(this)
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
    onChangeNbTotalParties(value) {
        this.setState({ nbTotalParties : value.target.value })
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
     * Méthode appelé lorsdque l'on clic sur le bouton valider
     * Permet de revenir à la page principale en mettant à jour les propriétés avec les nouvelles valeurs
     * @param index
     */
    onValidate = index => {
        console.log ("Configurer::onValidate()")
        console.log ("Configurer::State: " + JSON.stringify(this.state))
        const validateCancel = true
        this.setState({validateCancel : validateCancel})
    }


    onCancel = index => {
        console.log ("Configurer::onCancel()")
        console.log ("Configurer::State: " + JSON.stringify(this.state))
        //Nous allons récupérer les anciennes valeurs
        const nbTry = this.state.oldnbTry
        const nbTotalParties = this.state.oldnbTotalParties
        const playerOneName = this.state.oldplayerOneName
        const playerTwoName = this.state.oldplayerTwoName
        const validateCancel = true
        this.setState({
            nbTry: nbTry,
            nbTotalParties : nbTotalParties,
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
        const nbTotalParties = this.state.nbTotalParties
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
                    nbTotalParties = {nbTotalParties}
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
                                <input type="text" value={nbTotalParties} onChange={this.onChangeNbTotalParties} />
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
                            <Button value={"Valider"} index={1} onClick={this.onValidate } />
                            <Button value={"Annuler"} index={2} onClick={this.onCancel} />
                        </div>
                    </div>
                </div>

            )
        }


    }
}



export default Configurer