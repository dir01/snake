import {isArraysEqual, randInt} from './utils';

export default class Game {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;
        this.headPosition = options.headPosition;
        this.history = [];
        this.snakeSize = 1;
        this.direction = options.direction;
        this.berryPosition = null;
    }

    move() {
        let p = this.headPosition;
        let action = {
            up: ()=> { p[1]-- },
            down: ()=> { p[1]++ },
            left: ()=> { p[0]-- },
            right: ()=> { p[0]++ },
        }[this.direction];
        action();
        this.history.push(this.headPosition.slice());
        this.history = this.history.slice(-this.snakeSize);
        while (!this.berryPosition || isArraysEqual(this.berryPosition, this.headPosition)) {
            this.berryPosition = this._generateBerry(this.width, this.height);
        }
    }

    _generateBerry(width, height) {
        return [randInt(0, width), randInt(0, height)];
    }

    get isOver() {
        let hp = this.headPosition;
        return (
            hp[1] < 0
            || hp[1] >= this.height
            || hp[0] < 0
            || hp[0] >= this.width
        );
    }

}
