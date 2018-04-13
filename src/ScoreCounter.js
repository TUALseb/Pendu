import React, { Component } from 'react'

import './ScoreCounter.css'

class ScoreCounter extends Component {
    /**
     *
     */
    state = {
        counter : 0,
        score : 0,
    }



    /**
     * Constructeur
     * @param props
     */
    constructor(props){
        super(props)
        this.setState ({score:0, counter:0})
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
        this.upDateScore(0)
        this.upDateClounter(0)
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
        const score = this.state.score
        const counter = this.state.counter
        return (
            <div className="ScoreCounter">
                <div className="Counter">
                    Nombre d'essai : {counter}
                </div>
                <div className="Score">
                    Score : {score}
                </div>

            </div>

        )
    }
}


export default ScoreCounter