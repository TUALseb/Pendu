/*
 * Copyright (c) 2018. Sébastien TUAL
 */

import React, { Component } from 'react'

import './PlayerInfo.css'

class ScoreCounter extends Component {
    /**
     *
     */
    state = {
        playerName: "",
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry: 0,
        score: 0,
    }

    constructor(props) {
        super(props)
        //this.state({score: props.score, counter: props.nbTry})
        console.log ("ScoreCounter::constructor()")
        console.log("props : " + JSON.stringify(props))
        this.state = {
            nbTry: props.nbTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay : props.partyInPlay,
            playerName: props.playerName,
            score: props.score,
        }
        console.log ("ScoreCounter::constructor():: state : " + JSON.stringify(this.state))
    }

    /**
     Appelé en second juste avant le render()
     */
    componontWillMount() {

    }

    /**
     Appelé après que le composant a été retranscrit pour la première fois dans le DOM réel
     */
    componentDidMount() {
        console.log ("ScoreCounter::componentDidMount()")
        console.log("ScoreCounter::State: " + JSON.stringify(this.state))
        //this.state({score: props.score, counter: props.nbTry})
        //this.upDateScore(0)
        //this.upDateClounter(0)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUmount() {

    }

    /**
     * Méthode permettant de mettre à jour le score du joueur
     * @param score : Entier
     */
    upDateScore(score= 0){
        this.setState({score : score})
    }

    /**
     * Méthode permettant de mettre à jour le nombre de coup que
     * @param counter : Entier
     */
    upDateClounter(counter= 0) {
        this.setState({counter : counter})
    }


    /**
     * Gère l'affichage du score et du nombre d'essai
     * @returns {*}
     */
    render() {
        console.log ("ScoreCounter::render():: state : " + JSON.stringify(this.state))
        const playerName = this.state.playerName
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const partyInPlay = this.state.partyInPlay
        const score = this.state.score
        const nbTry = this.state.nbTry
        console.log("playerName: " + nbPartiesToPlay)
        return (
            <div className="ScoreCounter">
                <div className="Player">
                    <span>Joueur : </span>{playerName}
                </div>
                <div className="Parties">
                    <span>partie </span>{partyInPlay}/{nbPartiesToPlay}
                </div>
                <div className="Counter">
                    <span>Nombre d'essai : </span>{nbTry}
                </div>
                <div className="Score">
                    <span>Score : </span>{score}
                </div>

            </div>

        )
    }
}


export default ScoreCounter