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
        statue: 'ONE_PLAYER',
        nbPartieToPlay: 0,
        nbTry : 0,
        playerName: "",
        score : 0,
    }


    constructor(props) {
        console.log ("Game::constructor()")
        super(props)
        console.log ("Game::state : " +JSON.stringify(props))
        //this.setState({score: props.score, counter: props.nbTry, playerName: props.playerOne, nbTotalParties: props.nbTotalParties})
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
        const score = this.state.score
        const nbTry = this.state.nbTry
        const statue = this.state.statue
        const nbPartiesToPlay = this.state.nbPartieToPlay
        const playerName  =this.state.playerName

        if (statue === 'BEGIN')
        {
            return (
                <App />
            )
        }
        else {
            return (
                <div className="Body-game">

                    <div className="Play-zone">
                        <div className="Top">
                            <ScoreCounter
                                playName = {playerName}
                                nbPartiesToplay = {nbPartiesToPlay}
                                score = {score}
                                counter = {nbTry}
                            />
                        </div>

                        <div className="Left">
                            <KeyBoard />
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