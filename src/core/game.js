import {isArraysEqual, randInt} from './utils';

export default class Game {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;
        this.headPosition = options.headPosition;
        this.history = [this.headPosition.slice()];
        this.snakeSize = 1;
        this._direction = options.direction;
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

        if(this.berryPosition && isArraysEqual(this.headPosition, this.berryPosition)){
          this.snakeSize++;
        }
        this.history = this.history.slice(-this.snakeSize);

        while (!this.berryPosition || this._isInHistory(this.berryPosition)) {
            this.berryPosition = this._generateBerry(this.width, this.height);
        }

        this.oldDirection = this.direction;
    }

    get isOver() {
        let hp = this.headPosition;
        let isInHistory = this.history.slice(0, -1).some((p) => isArraysEqual(p, hp));
        return isInHistory || (
                hp[1] < 0
                || hp[1] >= this.height
                || hp[0] < 0
                || hp[0] >= this.width
            );
    }

    get direction() {return this._direction}

    set direction(newDirection) {
        if (newDirection === {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        }[this.oldDirection]) return;
        this._direction = newDirection;
    }

    _isInHistory(position) {
        return position && this.history.some((p) => isArraysEqual(p, position));
    }

    _generateBerry(width, height) {
        return [randInt(0, width - 1), randInt(0, height - 1)];
    }

}
