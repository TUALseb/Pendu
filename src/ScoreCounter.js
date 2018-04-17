import React, { Component } from 'react'

import './PlayerInfo.css'

class ScoreCounter extends Component {
    /**
     *
     */
    state = {
        playerName: "",
        nbPartiesToplay: 0,
        partyInPlay: 0,
        counter: 0,
        score: 0,
    }

    constructor(props) {
        super(props)
        //this.state({score: props.score, counter: props.nbTry})
        console.log ("ScoreCounter::constructor()")
        console.log(props)
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
        console.log ("ScoreCounter::componentDidMount()")
        console.log(this.state)
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
        const playerName = this.playerName
        const nbPartiesToplay = this.nbPartiesToplay
        const partyInPlay = this.partyInPlay
        const score = this.state.score
        const counter = this.state.counter
        return (
            <div className="ScoreCounter">
                <div className="Player">
                    <span>Joueur : </span>{playerName}
                </div>
                <div className="Parties">
                    <span>partie</span> {partyInPlay}/{nbPartiesToplay}
                </div>
                <div className="Counter">
                    <span>Nombre d'essai : </span>{counter}
                </div>
                <div className="Score">
                    <span>Score : </span>{score}
                </div>

            </div>

        )
    }
}


export default ScoreCounter