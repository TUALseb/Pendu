/*
 * Copyright (c) 2018. Sébastien TUAL
 */

import React, { Component } from 'react'

// Importation du fichier de style
import './KeyBoard.css'
//Importation des fichier js que nous aurons besoin
import Button from './Button.js'





// Liste des constante gloabales
const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','\'']

/**
 * class KeyBoard permet de gérer ce qui se passe sur le "clavier virtuel" affiché à gauche
 * Son rôle est sipmplement d'afficher les lettre de l'alkphapbet afin d'y choisir une lettre
 * Elle retournera aussi cette lettre cliquée
 */
class KeyBoard extends Component {

    state = {
        letters : this.generateTable()
    }

    /**
     * Méthode permettant de générer un tableau qui va afficher toutes les lettres de l'halphabet,
     * ainsi que de l'espace et de l'apostrophe
     * @returns {Array}
     */
    generateTable() {
        const result = []


        // Nous parcourons notre tableau afin de récupérer chaque lettre qui est sous forme de tableau
        // ex : "A":[A][A]
        for (let letter of LETTERS) {
            result.push(letter)
            //index++
        }

        return result
    }

    /**
     * Méthode qui gère le click sur une des touches du clavier affiché
     * @param index
     * @returns {String}
     */
    handleLetterClick(index) {
        console.log (LETTERS[index])
        return LETTERS[index]
    }

    /**
     * Gère l'affichage sous forme de bouton les lettres et caractères
     * @returns {*}
     */
    render() {
        const {letters} = this.state
        //console.log (letters)
        return (
            <div className="Keyboard">
                { letters.map((letter, index) => (
                    <Button
                        value={letter}
                        index={index}
                        key={index}
                        onClick={this.handleLetterClick}
                    />
                ))}

                <div className="Btn-button">
                </div>
            </div>

        )
    }

}

export default KeyBoard