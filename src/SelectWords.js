/*
 * Copyright (c) 2018. Sebastien TUAL
 * date de création :  $today.day-$today.month-2018.
 * date de modification : $today.day-$today.month-2018.
 */


import React, { Component } from 'react'


class SelectWords extends Component{
    state = {
        nbWordsToFind: 0,
        tableWordsToFind: {},
    }

    constructor(props) {
        super(props)

        this.state = {
            nbWordsToFind : props.nbWordsToFind,
            tableWordsToFind :props.tableWordsToFind
        }
    }

    render() {
        let wordsToFind = this.state.tableWordsToFind
        return (
            <div>
                <h2> Veuillez entrer les mots à trouver : </h2>
                <div className="Words-List">
                    <div className="Choice">
                        {wordsToFind.map(( word,index) =>(
                            <div className="data">
                                Veuillez entrez le (ou la phrase) n° : {index}
                                <input type="text" value={word} onChange={this.onChangeWordToFind}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="Btn-Ap">
                    <Button value={"Valider"} index={0} hidden={false} onClick={this.onReturn } />
                </div>
            </div>
        )
    }
}


export default SelectWords