import Game from './game';

describe('Game', () => {

    describe('initialization', () => {
        let game = new Game({
            width: 3,
            height: 4,
            headPosition: [0, 0],
            direction: 'right'
        });
        it('initialized properly', () => {
            expect(game.width).toEqual(3);
            expect(game.height).toEqual(4);
            expect(game._direction).toEqual('right');
            expect(game.headPosition).toEqual([0, 0]);
            expect(game.snakeSize).toEqual(1);
        });
    });

    describe('basic movement', () => {
        let game = new Game({
            width: 3,
            height: 4,
            headPosition: [0, 0],
            direction: 'right'
        });

        it('moves one cell right', () => {
            game.move();
            expect(game.headPosition).toEqual([1, 0]);
        });

    });

    describe('game history', () => {

        it('stores the history with length 1', () => {
            let game = new Game({
                width: 3,
                height: 4,
                headPosition: [0, 0],
                direction: 'right'
            });
            game.move();
            expect(game.history).toEqual([[1, 0]]);
            game.move();
            expect(game.history).toEqual([[2, 0]]);
        });

        it('stores the history with length 2', () => {
            let game = new Game({
                width: 3,
                height: 4,
                headPosition: [0, 0],
                direction: 'right'
            });
            game.move();
            expect(game.history).toEqual([[1, 0]]);
            game.snakeSize = 2;
            game.move();
            expect(game.history).toEqual([[1, 0], [2, 0]]);
            game.move();
            expect(game.history).toEqual([[2, 0], [3, 0]]);
        });

    });

    describe('game over', () => {
        let game = new Game({width: 2, height: 2, headPosition: [0, 0]});

        it('moves beyond upper edge', () => {
            game.headPosition = [1, 0];
            game._direction = 'up';
            game.move();
            expect(game.headPosition).toEqual([1, -1]);
            expect(game.isOver).toBeTruthy();
        });

        it('moves beyond left edge', () => {
            game.headPosition = [0, 0];
            game._direction = 'left';
            game.move();
            expect(game.headPosition).toEqual([-1, 0]);
            expect(game.isOver).toBeTruthy();
        });

        it('moves beyond right edge', () => {
            game.headPosition = [game.width - 1, 0];
            game._direction = 'right';
            game.move();
            expect(game.headPosition).toEqual([game.width, 0]);
            expect(game.isOver).toBeTruthy();
        });

        it('moves beyond bottom edge', () => {
            game.headPosition = [0, game.height - 1];
            game._direction = 'down';
            game.move();
            expect(game.headPosition).toEqual([0, game.height]);
            expect(game.isOver).toBeTruthy();
        });
    });

    describe('berry appearance', () => {
        let game = new Game({
            width: 10,
            height: 10,
            headPosition: [0, 0],
            direction: 'right'
        });

        it('does not contain berry at the beginning', () => {
            expect(game.berryPosition).toBeNull();
        });

        it('generates berry at first move', () => {
            game._generateBerry = jest.fn().mockReturnValue([1, 1]);
            game.move();
            expect(game.berryPosition.length).toEqual(2);
            expect(game._generateBerry).toBeCalledWith(game.width, game.height);
        });

        it('does not generate berry if berry already exists', () => {
            game._generateBerry = jest.fn();
            game.berryPosition = [2, 2];
            game.move();
            expect(game._generateBerry).not.toBeCalled();
        });

        it('cannot generate berry at the head position generates new position', () => {
            game.headPosition = [5, 6];
            game._direction = 'right';
            game.berryPosition = null;
            game._generateBerry = jest.fn().mockReturnValueOnce([6, 6]).mockReturnValue([1, 2]);
            game.move();
            expect(game.berryPosition).toEqual([1, 2]);
        });
    });

    describe('berry consuming', () => {

        let game = new Game({
            width: 10,
            height: 10,
            headPosition: [0, 0],
            direction: 'right',
        });

        it('should eat a berry', () => {
            game.berryPosition = [1, 0];
            game.move();
            expect(game.headPosition).toEqual([1, 0]);
            expect(game.snakeSize).toEqual(2);
            expect(game.history).toEqual([[0, 0], [1, 0]]);
            expect(game.berryPosition.length).toEqual(2);
            expect(game.berryPosition).not.toEqual([1, 0]);

            game.berryPosition = [2, 0];
            game.move();
            expect(game.headPosition).toEqual([2, 0]);
            expect(game.snakeSize).toEqual(3);
            expect(game.history).toEqual([[0, 0], [1, 0], [2, 0]]);
        });

    });

    describe('snake direction change', () => {
        let game = new Game({
            width: 10,
            height: 10,
            headPosition: [4, 4],
            direction: 'right',
        });

        it('saves direction between moves', () => {
          game.move();
          expect(game.oldDirection).toEqual('right');
        });

        it('cant move from left to right', () => {
            game._direction = 'left';
            game.oldDirection = 'left';
            game.direction = 'right';
            expect(game.direction).toEqual('left');
        });

        it('cant move from right to left', () => {
            game._direction = 'right';
            game.oldDirection = 'right';
            game.direction = 'left';
            expect(game.direction).toEqual('right');
        });

        it('cant move from up to down', () => {
            game._direction = 'up';
            game.oldDirection = 'up';
            game.direction = 'down';
            expect(game.direction).toEqual('up');
        });

        it('cant move from down to up', () => {
            game._direction = 'down';
            game.oldDirection = 'down';
            game.direction = 'up';
            expect(game.direction).toEqual('down');
        })

    })

});

