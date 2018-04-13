import React, { Component } from 'react'
// Importation du fichier de style
import './App.css'
//Importation des fichier js que nous aurons besoin
import KeyBoard from './KeyBoard.js'
import ScoreCounter from './ScoreCounter.js'
import ListButtons from './Button.js'

/**
 * class de l'application.
 * Gère de façon globale ce qui se passe
 */
class App extends Component {
    /**
     * Permet l'affichage générale
     * @returns {*}
     */
  render() {
    return (
      <div>
          <div className="App">
              <header className="App-header">
                  <h1 className="App-title">Bienvenue au jeu du pendu</h1>
              </header>
          </div>
          <div className="Body">
              <div className="Game">
                  <KeyBoard />
                  <ScoreCounter />
              </div>
              <div className="DashBoard">
                  <ListButtons />
              </div>
          </div>

      </div>

    )
  }
}

export default App
