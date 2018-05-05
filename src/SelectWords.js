/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React from 'react'
import PropTypes from 'prop-types'


import './SelectWords.css'
/*
class SelectWords extends Comment{
    state = {
        statue: 'BEGIN',
        nbPartiesToPlay: 0,
        partyInPlay: 1,
        nbTry: 1,
        nbTotalTry: 0,
        playerOne : {
            playerName : "",
            partyInPlay: 1,
            score: 0,
            tableWordsToFind : [],
        },
        playerTwo : {
            playerName : "",
            partyInPlay: 1,
            score: 0,
            tableWordsToFind : [],
        },
        startNewParty: false,
    }

    constructor(props) {
        super(props)

        const statue = props.statue
        let tableWordsToFindPlayerOne = []
        let tableWordsToFindPlayerTwo = []
        const scorePlayerOne = props.playerOne.score
        const scorePlayerTwo = props.playerTwo.score
        const partyInPlay = props.partyInPlay
        const partyInPlayPlayerOne = props.playerOne.partyInPlay
        const partyInPlayPlayerTwo = props.playerTwo.partyInPlay
        const nbPartiesToPlay = props.nbPartiesToPlay

        for (let nbParties=0 ; nbParties<nbPartiesToPlay; nbParties++) {
            tableWordsToFindPlayerOne.push("")
            tableWordsToFindPlayerTwo.push("")
        }

        this.state = {
            statue: statue,
            nbPlayer: props.nbPlayer,
            nbTry: props.nbTry,
            nbTotalTry: props.nbTotalTry,
            nbPartiesToPlay: props.nbPartiesToPlay,
            partyInPlay: partyInPlay,
            playerOne : {
                playerName : props.playerOne.playerName,
                partyInPlay: partyInPlayPlayerOne,
                score: scorePlayerOne,
                tableWordsToFind : tableWordsToFindPlayerOne,
            },
            playerTwo : {
                playerName : props.playerTwo.playerName,
                partyInPlay: partyInPlayPlayerTwo,
                score: scorePlayerTwo,
                tableWordsToFind : tableWordsToFindPlayerTwo,
            },
            startNewParty: props.startNewParty,
        }
        // on déclare les méthodes qui doivent être attaché à this, sinon les données de la classe ne sera pas accessible
        this.onReturn = this.onReturn.bind(this)
        this.onValid = this.onValid.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onValid (tableWordsToFind, word1, word2, word3) {
        tableWordsToFind.push(word1)
        tableWordsToFind.push(word2)
        tableWordsToFind.push(word3)
    }

    onCancel(tableWordsToFind) {
        return tableWordsToFind.clear()
    }

    render() {
        return (
            <div className="Body-Selection">
                <div>

                    {
                        tableWordsToFInPlayerOne.map((wordsToFind, index)  =>(
                            <SelectWords
                                index={index}
                                word={wordsToFind}
                                onchange={(wordsToFind)=>this.OnChangeText(wordsToFind)}
                            />
                        ))
                    }
                    <div className="Btn-Ap">
                        <Button value={"Valider"} index={1} hidden={false} onClick={this.onValid } />
                    </div>
                    <div className="Btn-Ap">
                        <Button value={"Annuler"} index={2} hidden={false} onClick={this.onCancel } />
                    </div>
                </div>
                <div className="Btn-Ap">
                    <Button value={"Retour au menu principal"} index={0} hidden={false} onClick={this.onReturn } />
                </div>
            </div>
        )
    }
}


*/
const SelectWord = ({index, word, onChange, onBlur}) => (


    <div className="Choice">
        <span className="Title"> Veuillez entrez le (ou la phrase) n° : {index} </span>
        <input
            className="Input-Value"
            type="text"
            placeholder="Placez votre mot ou phrase ici"
            value={word}
            onChange={(word)=>onChange(word)}
            onBlur={(word)=>onBlur(word)}/>
    </div>
)

SelectWord.propTypes = {
    word: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur : PropTypes.func.isRequired,
}

export default SelectWord