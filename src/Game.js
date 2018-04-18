/*
 * Copyright (c) 2018. Sébastien TUAL
 */


import React, { Component } from 'react'

//Importation des fichier js que nous aurons besoin
import KeyBoard from './KeyBoard.js'
import ScoreCounter from './ScoreCounter.js'
import Button from './Button.js'
import App from './App.js'

// Importation du fichier de style
import './Game.css'

class Game extends Component {

    state = {
        statue: '',
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry : 0,
        playerName: "",
        score : 0,
    }


    constructor(props) {
        console.log ("Game::constructor()")
        super(props)
        console.log ("props : " +JSON.stringify(props))
        this.state = {
            statue: props.statue,
            nbTry: props.nbTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: props.partyInPlay,
            score: props.score,
            playerName: props.playerName,
        }
        console.log ("Game::state : " +JSON.stringify(this.state))
    }

    /**
     Appelé en second juste avant le render()
     */
    componontWillMount() {

    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount(props) {
        console.log ("Game::componentDidMount()")
        console.log ("Game::State: " + JSON.stringify(this.state))
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUmount() {

    }

    /**
     *
     * @param index
     */
    onReturn = index => {
        console.log ("Game::onReturn()")
        this.setState({statue: 'BEGIN'})
    }

    /**
     *
     * @returns {*}
     */
    render() {
        //const nbParties
        console.log ("Game::render")
        console.log("Game::render::state" + JSON.stringify(this.state))
        const score = this.state.score
        const nbTry = this.state.nbTry
        const statue = this.state.statue
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const playerName  = this.state.playerName
        const partyInPlay = this.state.partyInPlay

        if (statue === 'BEGIN')
        {
            return (
                <App />
            )
        }
        else {
            return (
                <div className="Body-game">
                    <div className="Top">
                        <ScoreCounter
                            playerName = {playerName}
                            nbPartiesToPlay = {nbPartiesToPlay}
                            partyInPlay = {partyInPlay}
                            score = {score}
                            nbTry = {nbTry}
                        />
                    </div>
                    <div className="Play-zone">

                        <div className="Left">
                            <KeyBoard />
                        </div>
                        <div className="Play-party">
                            <div className="Word-To-Find">
                                JEU DU PENDU
                            </div>
                            <div className="Img-To-Show">
                                <img src="../images/ajout_bras_droit.png" alt="ajout_tete.png"/>
                            </div>
                        </div>


                    </div>

                    <div className="Bottom">
                        <div className="Right">
                            <Button value={"Retour"} index={0} onClick={this.onReturn }/>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default Game