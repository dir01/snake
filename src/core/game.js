export default class Game {
    constructor (options) {
        this.width = options.width;
        this.height = options.height;
        this.headPosition = options.headPosition;
        this.direction = options.direction;
    }

    move () {
        let p = this.headPosition;
        let action = {
            up: ()=>{p[0]--},
            down: ()=>{p[0]++},
            left: ()=>{p[1]--},
            right: ()=>{p[1]++},
        }[this.direction];
        action();
    }
}
