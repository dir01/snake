import {expect} from 'chai';
import Game from './game';


describe('Game', () => {
    let game = new Game({
        width: 3,
        height: 4,
        headPosition: [0, 0],
        direction: 'right'
    });

    it('initialized properly', () => {
        expect(game.width).to.equal(3);
        expect(game.height).to.equal(4);
        expect(game.direction).to.equal('right');
        expect(game.headPosition).to.deep.equal([0, 0]);
    });

    it('moves one cell right', () => {
        game.move();
        expect(game.headPosition).to.deep.equal([1, 0]);
    });

    it('moves one cell up and gameover', () => {
        game.direction = 'up';
        game.move();
        expect(game.headPosition).to.deep.equal([1, -1]);
        expect(game.isOver).to.be.true;
    });

    it('moves beyond left edge and game over', () => {
      game.headPosition = [0,0];
      game.direction = 'left';
      game.move();
      expect(game.headPosition).to.deep.equal([-1, 0]);
      expect(game.isOver).to.be.true;
    })

    it('moves beyond right edge and game over', () => {
      game.headPosition = [game.width - 1,0];
      game.direction = 'right';
      game.move();
      expect(game.headPosition).to.deep.equal([game.width, 0]);
      expect(game.isOver).to.be.true;
    })

    it('moves beyond bottom edge and game over', () => {
      game.headPosition = [0,game.height - 1];
      game.direction = 'down';
      game.move();
      expect(game.headPosition).to.deep.equal([0, game.height]);
      expect(game.isOver).to.be.true;
    })
});

