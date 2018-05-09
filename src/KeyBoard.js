/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */

import React from 'react'

// Importation du fichier de style
import './KeyBoard.css'
//Importation des fichier js que nous aurons besoin
import Button from './Button.js'
import PropTypes from "prop-types";


// Liste des constante gloabales
//const LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','à','â','ç','é','è','ï','î','ù','û','_','\'']

const KeyBoard = ({letters, usedLetters, onClick}) => (
    <div className="Keyboard">
        <div className="Letters">

            { letters.map((letter, index) => (
                <Button
                    value={letter}
                    index={index}
                    key={index}
                    hidden={!!usedLetters.has(letter)}
                    onClick={() => onClick(index)}
                />
            ))}
        </div>
    </div>
)


/**
 * Pour gérer les propriétés particiulières d'une lettre
 * @type {{letter: *, index: *, onClick: *}}
 */
KeyBoard.propTypes = {
    letters: PropTypes.array.isRequired,
    usedLetters: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}


export default KeyBoard