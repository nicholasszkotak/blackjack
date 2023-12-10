import { HEARTS } from "../constants/constants";
import { Card } from "../models/card";
import { ICardService } from "./cardService";
import { GameService } from "./gameService";

describe('gameService', () => {

    describe("createGame", () => {

        test("creates a game with two players", () => {

            // Arrange
            const cardService = <ICardService>{
                buildDeck: () => [],
                shuffleDeck: jest.fn(),
                dealCard: jest.fn(),
                scoreHand: jest.fn()
            };
        
            const gameService = new GameService(cardService);
        
            // Act
            const game = gameService.createGame();
        
            // Assert
            expect(game.dealer).toBeDefined();
            expect(game.player).toBeDefined();
          });

          
        test("creates the dealer with the expected hand", () => {

            // Arrange
            const dealCardMock = jest.fn()
                .mockReturnValueOnce(new Card(1, HEARTS))
                .mockReturnValueOnce(new Card(2, HEARTS))
                .mockReturnValueOnce(new Card(3, HEARTS))
                .mockReturnValueOnce(new Card(4, HEARTS));

            const cardService = <ICardService>{
                buildDeck: () => [],
                shuffleDeck: jest.fn(),
                dealCard: dealCardMock,
                scoreHand: jest.fn()
            };
        
            const gameService = new GameService(cardService);
        
            // Act
            const game = gameService.createGame();
        
            // Assert
            expect(game.dealer.isDealer).toEqual(true);
            expect(game.dealer.hand.length).toEqual(2);
            expect(game.dealer.hand[0].cardValue).toEqual(1);
            expect(game.dealer.hand[1].cardValue).toEqual(2);
          });

          
        test("creates the player with the expected hand", () => {

            // Arrange
            const dealCardMock = jest.fn()
                .mockReturnValueOnce(new Card(1, HEARTS))
                .mockReturnValueOnce(new Card(2, HEARTS))
                .mockReturnValueOnce(new Card(3, HEARTS))
                .mockReturnValueOnce(new Card(4, HEARTS));

            const cardService = <ICardService>{
                buildDeck: () => [],
                shuffleDeck: jest.fn(),
                dealCard: dealCardMock,
                scoreHand: jest.fn()
            };
        
            const gameService = new GameService(cardService);
        
            // Act
            const game = gameService.createGame();
        
            // Assert
            expect(game.player.isDealer).toEqual(false);
            expect(game.player.hand.length).toEqual(2);
            expect(game.player.hand[0].cardValue).toEqual(3);
            expect(game.player.hand[1].cardValue).toEqual(4);
          });


          test("sets the deck to the shuffled deck", () => {

            // Arrange
            const deck : Card[] = [
                new Card(1, HEARTS),
                new Card(2, HEARTS),
                new Card(3, HEARTS),
                new Card(4, HEARTS),
                new Card(5, HEARTS)
            ];

            const shuffledDeck : Card[] = [
                new Card(5, HEARTS)
            ];

            const cardService = <ICardService>{
                buildDeck: jest.fn().mockReturnValue(deck),
                shuffleDeck: jest.fn().mockReturnValue(shuffledDeck),
                dealCard: jest.fn(),
                scoreHand: jest.fn()
            };
        
            const gameService = new GameService(cardService);
        
            // Act
            const game = gameService.createGame();
        
            // Assert
            expect(game.deck).toEqual(shuffledDeck);
          });

    });
});
