/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React from 'react'
import PropTypes from 'prop-types'


import './SelectWords.css'



const SelectWord = ({index, word, onChange, onBlur, onFocus}) => (


    <div className="Data-Text-Input" key={index}>
        <span className="Title"> Veuillez entrez le mot (ou la phrase) n° : {index+1} </span>
        <input
            className="Input-Value"
            type="text"
            placeholder="Placez votre mot ou phrase ici"
            key={index}
            value={word}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    </div>
)

SelectWord.propTypes = {
    word: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur : PropTypes.func.isRequired,
    onFocus : PropTypes.func.isRequired,
}

export default SelectWord