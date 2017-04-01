import React, {Component} from 'react';
import Game from './core/game';
import './GameUI.css';

export default class GameUI extends Component {

    constructor() {
        super();
        this.game = new Game({
            width: 10,
            height: 10,
            headPosition: [5, 5],
            direction: 'right'
        });
        setInterval(function() {
            this.game.move();
            this.forceUpdate();
        }.bind(this), 300);
    }

    onKeyDown(e){
        const direction = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        }[e.key]
        if (direction) {
            this.game.direction = direction;
        }
    }

    componentWillMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.game.height; i++) {
            var row = [];
            for (var j = 0; j < this.game.width; j++) {
                var hp = this.game.headPosition;
                let isSelected = (i === hp[1] && j === hp[0]) ? 'game-ui__cell--selected' : ''
                row.push(<div
                    key={`${i}-${j}`}
                    className={`game-ui__cell ${isSelected}`}></div>);
            }
            rows.push(row, <div key={`${i}`} className="game-ui__cell--clear"></div>);
        }
        return (<div className='game-ui'>{rows}</div>);
    }

}
