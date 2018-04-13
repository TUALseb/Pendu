import React, { Component } from 'react'
// Importation du fichier de style
import './ListButtons.css'
//Importation des fichier js que nous aurons besoin
import Button from './Button.js'


// Liste des constante gloabales
const BUTTONS = new Set(["Configurer","Réinitialiser","Jouer","Annuler"])


/**
 * class ListButtons permet de gérer
 */
class ListButtons extends Component {

    state = {
        buttons : this.generateTable()
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
        let it = BUTTONS.entries()
        console.log(BUTTONS)

        for (let button of it) {
            console.log(button)
            result.push(button[0])
            //index++
        }

        return result
    }

    /**
     * Méthode qui permet de gérer l'appui sur l'un des boutons de la zone
     * renvoie vers des mthodes qui s'occuperons
     * @param index
     * @returns {boolean}
     */
    handleButtonClick(index) {
        console.log (BUTTONS.has(index))
        return BUTTONS.has(index)
    }

    /**
     * Gère l'affichage sous forme de bouton les lettres et caractères
     * @returns {*}
     */
    render() {
        const {buttons} = this.state
        //console.log (buttons)
        return (
            <div className="ListButtons">
                <div className="Button">
                    { buttons.map((button, index) => (
                        <Button
                            value={button}
                            index={index}
                            key={index}
                            onClick={this.handleButtonClick}
                        />
                    ))}
                </div>
            </div>

        )
    }

}

export default ListButtons