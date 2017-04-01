import React, {Component} from 'react';
import Game from './core/game';
import './GameUI.css';

export default class GameUI extends Component {

    constructor () {
        super();
        this.game = new Game({
            width: 10,
            height: 10,
            headPosition: [5, 5],
            direction: 'right'
        });
    }

    render(){
        return (<div className='game-ui'>{this.props.game}</div>);
    }

}
