/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */

import React, { Component } from 'react'

import './PlayerInfo.css'

class PlayerInfo extends Component {
    /**
     *
     */
    state = {
        playerName: "",
        nbPartiesToPlay: 0,
        partyInPlay: 0,
        nbTry: 0,
        nbTotalTry: 0,
        score: 0,
    }

    constructor(props) {
        super(props)
        //this.state({score: props.score, counter: props.nbTry})
        console.log ("PlayerInfo::constructor()")
        //console.log("props : " + JSON.stringify(props))
        this.state = {
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay : props.partyInPlay,
            playerName: props.playerName,
            score: props.score,
        }
        //console.log ("PlayerInfo::constructor():: state : " + JSON.stringify(this.state))
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
        console.log ("PlayerInfo::componentDidMount()")
        //console.log("PlayerInfo::State: " + JSON.stringify(this.state))
        //this.state({score: props.score, counter: props.nbTry})
        //this.upDateScore(0)
        //this.upDateClounter(0)
    }

    /**
     Appelé avant que le composant ne quitte complètement le DOM
     */
    componentWillUmount() {

    }

    componentWi

    /**
     * Méthode permettant de mettre à jour le score du joueur
     * @param score : Entier
     */
    upDateScore(score){
        this.setState({score : score})
    }

    /**
     * Méthode permettant de mettre à jour les informations en haut de page
     * @param counter : Entier
     */
    upDateClounter(counter) {
        this.setState({counter : counter})
    }


    /**
     * Gère l'affichage du score et du nombre d'essai
     * @returns {*}
     */
    render() {
        //console.log ("PlayerInfo::render():: state : " + JSON.stringify(this.state))
        const playerName = this.state.playerName
        const nbPartiesToPlay = this.state.nbPartiesToPlay
        const partyInPlay = this.state.partyInPlay
        const score = this.state.score
        const nbTry = this.state.nbTry
        const nbTotalTry = this.state.nbTotalTry

        return (
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

        )
    }
}


export default PlayerInfo