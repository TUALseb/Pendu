import React, { Component } from 'react'

// Importation du fichier de style
import './KeyBoard.css'
//Importation des fichier js que nous aurons besoin
import Button from './Button.js'



// Liste des constante gloabales
const LETTERS = new Set(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','\'']);
//const SIDE = 6;

/**
 * class KeyBoard permet de gérer ce qui se passe sur le "clavier virtuel" affiché à gauche
 */
class KeyBoard extends Component {

    state = {
        letters : this.generateTable()
    };


    /**
     * Méthode permettant de générer un tableau qui va afficher toutes les lettres de l'halphabet,
     * ainsi que de l'espace et de l'apostrophe
     * @returns {Array}
     */
    generateTable() {
        const result = [];
        //const sizeArray = SIDE * SIDE;
        //let index = 0;
        let it = LETTERS.entries()


        for (let letter of it) {
            result.push(letter[0])
            //index++
        }

        return result
    }

    /**
     * Méthode qui gère le click sur une des touches du clavier affiché
     * @param index
     * @returns {boolean}
     */
    handleLetterClick(index) {
        console.log (LETTERS.has(index))
        return LETTERS.has(index)
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
                <div className="Button">
                    { letters.map((letter, index) => (
                        <Button
                            value={letter}
                            index={index}
                            key={index}
                            onClick={this.handleLetterClick}
                        />
                    ))}
                </div>
            </div>

        )
    }

}

export default KeyBoard