import React, {Component} from 'react';
import Game from './core/game';
import './GameUI.css';
import classnames from 'classnames';
import {isArraysEqual} from './core/utils';

export default class GameUI extends Component {

    constructor() {
        super();
        this.game = new Game({
            width: 10,
            height: 10,
            headPosition: [5, 5],
            direction: 'right'
        });
        this.intervalId = setInterval(function() {
            this.game.move();
            this.forceUpdate();
        }.bind(this), 300);
    }

    render() {
        if (this.game.isOver) {
            clearInterval(this.intervalId);
            return (
                <div>
                    <h2>Game over</h2>
                </div>
            );
        } else {
            return this.renderGame();
        }
    }

    renderGame() {
        var rows = [];
        for (var i = 0; i < this.game.height; i++) {
            var row = [];
            for (var j = 0; j < this.game.width; j++) {
                let isSelected = ((history) => {
                    for (var c in history) {
                        if (isArraysEqual(history[c], [j, i])) {
                            return true;
                        }
                    }
                })(this.game.history);
                let isBerry = this.game.berryPosition
                    && isArraysEqual(this.game.berryPosition, [j, i]);
                let className = classnames('game-ui__cell', {
                    'game-ui__cell--selected': isSelected,
                    'game-ui__cell--berry': isBerry
                });
                row.push(<div
                    key={`${i}-${j}`}
                    className={className}></div>);
            }
            rows.push(row, <div key={`${i}`} className="game-ui__cell--clear"></div>);
        }
        return (<div className='game-ui'>{rows}</div>);
    }

    onKeyDown(e){
        const direction = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        }[e.key];
        if (direction) {
            this.game.direction = direction;
        }
    }

    componentWillMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

}
