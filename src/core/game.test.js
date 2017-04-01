import {expect} from 'chai';
import Game from './game';


describe('Game', () => {
    let game = new Game({width: 3, height: 4, headPosition: [1, 0], direction: 'right'});

    it('initialized properly', ()=>{
        expect(game.width).to.equal(3);
        expect(game.height).to.equal(4);
        expect(game.direction).to.equal('right');
        expect(game.headPosition).to.deep.equal([1, 0]);
    });

    it('moves one cell right', () => {
        game.move();
        expect(game.headPosition).to.deep.equal([1, 1]);
    });

    it('moves one cell up', ()=>{
        game.direction = 'up';
        game.move();
        expect(game.headPosition).to.deep.equal([0, 1]);
    });
});

