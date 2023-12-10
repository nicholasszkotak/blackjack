import { Card } from "./card";
import { Game } from "./game";
import { Player } from "./player";

describe('game', () => {

  describe("gameState", () => {

    test("returns PLAYING if player and dealer have not completed turns", () => {

        // Arrange
        const game = new Game(
            new Player([], true, false),
            new Player([], false, false),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("PLAYING");
    });
    
    test("returns PLAYING if player has completed but not dealer", () => {

        // Arrange
        const game = new Game(
            new Player([], true, false),
            new Player([], false, true),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("PLAYING");
    });

    test("returns PLAYING if dealer has completed but not player", () => {

        // Arrange
        const game = new Game(
            new Player([], true, true),
            new Player([], false, false),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("PLAYING");
    });
    
    test("returns WIN if dealer has busted and player has not", () => {

        // Arrange
        const game = new Game(
            new Player([new Card(10, "H"), new Card(10, "C"), new Card(10, "D")], true, true),
            new Player([new Card(10, "H"), new Card(10, "C"), new Card(1, "C")], false, true),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("WIN");
    });

    test("returns WIN if player has higher score than dealer", () => {

        // Arrange
        const game = new Game(
            new Player([new Card(10, "H"), new Card(10, "C")], true, true),
            new Player([new Card(10, "H"), new Card(10, "C"), new Card(1, "C")], false, true),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("WIN");
    });

    test("returns LOSE if player has busted", () => {

        // Arrange
        const game = new Game(
            new Player([new Card(10, "H"), new Card(10, "C"), new Card(10, "D")], true, true),
            new Player([new Card(11, "H"), new Card(11, "C"), new Card(11, "C")], false, true),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("LOSE");
    });

    test("returns LOSE if player has lower score than dealer", () => {

        // Arrange
        const game = new Game(
            new Player([new Card(10, "H"), new Card(10, "C"), new Card(1, "D")], true, true),
            new Player([new Card(11, "H"), new Card(11, "C")], false, true),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("LOSE");
    });

    test("returns TIE if player and dealer have same score", () => {

        // Arrange
        const game = new Game(
            new Player([new Card(10, "H"), new Card(10, "C")], true, true),
            new Player([new Card(11, "H"), new Card(11, "C")], false, true),
            []
        );
        
        // Act
        const state = game.gameState;

        // Assert
        expect(state).toEqual("TIE");
    });
  });

  describe("clone", () => {

    test("clones a game", () =>{

        // Arrange
        const originalGame = new Game(
            new Player([new Card(1, "H")], true, true),
            new Player([new Card(2, "C")], false, false),
            [new Card(3, "H")]
        );

        // Act
        const newGame = originalGame.clone();

        // Assert
        expect(newGame).not.toBe(originalGame);
        expect(newGame).toEqual(originalGame);
    });
  });
});