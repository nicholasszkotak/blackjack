import { Card } from "./card";

describe('card', () => {

  describe("id", () => {

    test("creates ID using map", () => {

        // Arrange
        const cards: Card[] = [
            new Card(1, "H"),
            new Card(2, "C"),
            new Card(3, "S"),
            new Card(4, "D"),
            new Card(5, "H"),
            new Card(6, "C"),
            new Card(7, "S"),
            new Card(8, "D"),
            new Card(9, "H"),
            new Card(10, "C"),
            new Card(11, "S"),
            new Card(12, "D"),
            new Card(13, "H")
        ];
        
        // Act
        // Assert
        expect(cards[0].id).toEqual("AH");
        expect(cards[1].id).toEqual("2C");
        expect(cards[2].id).toEqual("3S");
        expect(cards[3].id).toEqual("4D");
        expect(cards[4].id).toEqual("5H");
        expect(cards[5].id).toEqual("6C");
        expect(cards[6].id).toEqual("7S");
        expect(cards[7].id).toEqual("8D");
        expect(cards[8].id).toEqual("9H");
        expect(cards[9].id).toEqual("10C");
        expect(cards[10].id).toEqual("JS");
        expect(cards[11].id).toEqual("QD");
        expect(cards[12].id).toEqual("KH");
    });
  });

  describe("clone", () => {

    test("clones a card", () =>{

        // Arrange
        const originalCard = new Card(1, "H");

        // Act
        const newCard = originalCard.clone();

        // Assert
        expect(newCard).not.toBe(originalCard);
        expect(newCard).toEqual(originalCard);
    });
  });
});