import { HEARTS } from "../constants/constants";
import { Card } from "../models/card";
import { CardService } from "./cardService";
import { IRandomService, RandomService } from "./randomService";

describe('cardService', () => {

  describe("buildDeck", () => {

    test("builds a deck with 52 cards", () => {

        // Arrange
        const randomService = <IRandomService> {
            random: () => {return Math.random()}
        };
        const cardService = new CardService(randomService);

        // Act
        const deck = cardService.buildDeck();

        // Assert
        expect(deck.length).toEqual(52);
    });
    
    test("builds a deck with 4 instances of each value from 1 to 13", () => {

        // Arrange
        const randomService = <IRandomService> {
            random: () => {return Math.random()}
        };

        const cardService = new CardService(randomService);

        // Act
        const deck = cardService.buildDeck();

        // Assert
        const validCardValues = [1,2,3,4,5,6,7,8,9,10,11,12,13];
        validCardValues.map(x => expect(deck.filter(c => c.cardValue == x).length).toEqual(4));
    });
    
  });

  describe("shuffleDeck", () => {

    test("returns a new deck in a random order", () => {

        // Arrange
        const randomService = <IRandomService> {
            random: () => 0
        };
        const randomServiceSpy = jest.spyOn(randomService, "random");

        const cardService = new CardService(randomService);

        const deck : Card[] = [
            new Card(1, HEARTS), 
            new Card(2, HEARTS), 
            new Card(3, HEARTS), 
            new Card(4, HEARTS)
        ];

        // Act
        const shuffledDeck = cardService.shuffleDeck(deck);

        // Assert
        expect(shuffledDeck.length).toEqual(deck.length);
        expect(randomServiceSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe("dealCard", () => {

    test("deals the top card from the deck if it exists", () => {

        // Arrange
        const deck : Card[] = [
            new Card(1, HEARTS),
            new Card(2, HEARTS)
        ];
        
        const cardService = new CardService(new RandomService());

        // Act
        const card = cardService.dealCard(deck);

        // Assert
        expect(card.cardValue).toEqual(1);
        expect(deck.length).toEqual(1);
        expect(deck[0].cardValue).toEqual(2);
    });

    test("throws an error if the deck is empty", () => {

        // Arrange
        const deck : Card[] = [];
        
        const cardService = new CardService(new RandomService());

        // Act
        try
        {
            cardService.dealCard(deck);
            fail("Expected error, but none thrown");
        }
        catch(e)
        {
            // Assert
            expect((e as Error).message).toEqual("Deck is empty, card cannot be dealt");
        }
    });
  });
});
