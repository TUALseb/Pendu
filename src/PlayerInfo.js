/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */

import React from 'react'
import PropTypes from 'prop-types'

import './PlayerInfo.css'

const PlayerInfo = ({playerName, partyInPlay, nbPartiesToPlay, nbTry, nbTotalTry, score}) => (
    <div className="Top">
        <div className="ScoreCounter">
            <div className="Player">
                <span>Joueur : </span> {playerName}
            </div>
            <div className="Parties">
                <span>partie : </span> {partyInPlay}/{nbPartiesToPlay}
            </div>
            <div className="Counter">
                <span>Nombre d'essai : </span> {nbTry}/{nbTotalTry}
            </div>
            <div className="Score">
                <span>Score : </span> {score}
            </div>

        </div>
    </div>
)


/**
 * Pour gérer les propriétés particiulières d'une lettre
 * @type {{letter: *, index: *, onClick: *}}
 */
PlayerInfo.propTypes = {
    playerName: PropTypes.string.isRequired,
    partyInPlay: PropTypes.number.isRequired,
    nbPartiesToPlay: PropTypes.number.isRequired,
    nbTry: PropTypes.number.isRequired,
    nbTotalTry: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
}

export default PlayerInfo