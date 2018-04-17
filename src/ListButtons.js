import React, { Component } from 'react';

// Importation du fichier de style
import './ListButtons.css';
//Importation des fichier js que nous aurons besoin
import Button from './Button.js';

// Liste des constante gloabales
const BUTTONS = ["Configurer","Réinitialiser","Jouer","Arrêter","Annuler"];  //

/**
 * class ListButtons permet de gérer
 */
class ListButtons extends Component {

    state = {
        buttons : this.generateTable()
    }

    /**
     * Méthode permettant de générer un tableau qui va afficher les différents boutons de la zone de contrôle
     * soit : La configuration, réinitialisation des informations, lancement du jeu/ stopper jeu ...
     * @returns {Array}
     */
    generateTable() {
        const result = [];

        console.log(BUTTONS)

        for (let button of BUTTONS) {
            result.push(button)
            //index++
        }

        return result
    }

    /**
     * Méthode qui permet de gérer l'appui sur l'un des boutons de la zone
     * renvoie vers des mtéhodes qui s'occuperons
     * @param index
     * @returns {boolean}
     */
    handleButtonClick(index) {
        console.log (BUTTONS[index])
        return BUTTONS[index]
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