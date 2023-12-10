import { Card } from "./card";
import { Player } from "./player";

describe('player', () => {

  describe("score", () => {
    test("scores hand if hand does not contain any aces or face cards", () => {

      // Arrange
      const hand : Card[] = [
        new Card(2, "H"),
        new Card(3, "H"),
        new Card(4, "H"),
        new Card(5, "H"),
        new Card(6, "H"),
        new Card(7, "H"),
        new Card(8, "H"),
        new Card(9, "H"),
        new Card(10, "H")
      ];
      const player: Player = new Player(hand, true, true);
      
      // Act
      const score = player.score;

      // Assert
      expect(score).toEqual(54);
  });

  test("scores face cards as 10s", () => {

      // Arrange
      const hand : Card[] = [
          new Card(11, "H"),
          new Card(12, "H"),
          new Card(13, "H")
      ];
      const player: Player = new Player(hand, true, true);
      
      // Act
      const score = player.score;

      // Assert
      expect(score).toEqual(30);
  });

  test("scores ace as 11 if score would not exceed 21", () => {
      
      // Arrange
      const hand : Card[] = [
          new Card(1, "H"),
          new Card(10, "H")
      ];
      const player: Player = new Player(hand, true, true);
      
      // Act
      const score = player.score;

      // Assert
      expect(score).toEqual(21);
  });

  test("scores ace as 1 if current score would exceed 21", () => {
      
      // Arrange
      const hand : Card[] = [
          new Card(1, "H"),
          new Card(2, "H"),
          new Card(10, "S")
      ];
      const player: Player = new Player(hand, true, true);
      
      // Act
      const score = player.score;

      // Assert
      expect(score).toEqual(13);
  });
 
  test("scores multiple aces", () => {
      
      // Arrange
      const hand : Card[] = [
          new Card(1, "H"),
          new Card(1, "C"),
          new Card(9, "H")
      ];
      const player: Player = new Player(hand, true, true);
      
      // Act
      const score = player.score;

      // Assert
      expect(score).toEqual(21);
    });

  });

  describe("clone", () => {

    test("clones the player", () => {

      // Arrange
      const originalPlayer = new Player([new Card(2, "H")], true, true);

      // Act
      const newPlayer = originalPlayer.clone();

      // Assert
      expect(originalPlayer).not.toBe(newPlayer);
      expect(originalPlayer).toEqual(newPlayer);
    });
  });
});