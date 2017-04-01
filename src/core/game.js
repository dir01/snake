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
            up: ()=>{p[1]--},
            down: ()=>{p[1]++},
            left: ()=>{p[0]--},
            right: ()=>{p[0]++},
        }[this.direction];
        action();
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
