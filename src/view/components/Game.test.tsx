import { act, render, screen } from '@testing-library/react';
import { Game } from './Game';
import { Game as GameModel } from '../../models/game';
import { Player } from '../../models/player';
import { Dependencies } from '../../services/setupDependencies';
import { CardService } from '../../services/cardService';
import { GameService } from '../../services/gameService';
import { RandomService } from '../../services/randomService';
import userEvent from '@testing-library/user-event';
import { Card } from '../../models/card';
import { CLUBS, DIAMONDS, HEARTS, SPADES } from '../../constants/constants';

describe("<Game />", () => {

  describe("render", () => {

    test('initializes game on load', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const spy = jest.spyOn(gameService, "createGame");

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('renders game container', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      
      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.getByTestId("game")).toBeDefined();
    });

    test('renders Hit button', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      
      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("Hit");
      expect(node.tagName).toEqual("BUTTON");
      expect(node).toBeDefined();
    });

    test('clicking Hit calls game service', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const spy = jest.spyOn(gameService, "hit");

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("Hit");
      
      act(() => {
        userEvent.click(node);
      });
      
      expect(spy).toHaveBeenCalledTimes(1); 
    });

    test('renders Stand button', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      
      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("Stand");
      expect(node.tagName).toEqual("BUTTON");
      expect(node).toBeDefined();
    });

    test('clicking Stand calls game service', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const spy = jest.spyOn(gameService, "stand");

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("Stand");
      
      act(() => {
        userEvent.click(node);
      });
      
      expect(spy).toHaveBeenCalledTimes(1); 
    });

    test('renders Restart button', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      
      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("Restart");
      expect(node.tagName).toEqual("BUTTON");
      expect(node).toBeDefined();
    });

    test('clicking Restart calls game service', () => {

      // Arrange
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const spy = jest.spyOn(gameService, "createGame");

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
      expect(spy).toHaveBeenCalledTimes(1);
    
      // Assert
      const node = screen.getByText("Restart");
      
      act(() => {
        userEvent.click(node);
      });
      
      expect(spy).toHaveBeenCalledTimes(2); 
    });

    test('disables Hit and Stand if game state is not PLAYING', () => {

      // Arrange
      const gameModel: GameModel = new GameModel(
        new Player([new Card(10, SPADES)], true, true),
        new Player([new Card(10, HEARTS), new Card(10, CLUBS), new Card(10, DIAMONDS)], false, true),
        []
      );
      
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const mock = jest.fn().mockReturnValue(gameModel)
      gameService.createGame = mock;

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
      expect(mock).toHaveBeenCalledTimes(1);
    
      // Assert
      const hitButton = screen.getByText("Hit");
      const standButton = screen.getByText("Stand");
      expect(hitButton).toBeDisabled();
      expect(standButton).toBeDisabled();
    });

    test('enables Hit and Stand if game state is PLAYING', () => {

      // Arrange
      const gameModel: GameModel = new GameModel(
        new Player([new Card(10, SPADES)], true, false),
        new Player([new Card(10, HEARTS), new Card(10, CLUBS)], false, false),
        []
      );
      
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const mock = jest.fn().mockReturnValue(gameModel)
      gameService.createGame = mock;

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
      expect(mock).toHaveBeenCalledTimes(1);
    
      // Assert
      const hitButton = screen.getByText("Hit");
      const standButton = screen.getByText("Stand");
      expect(hitButton).toBeEnabled();
      expect(standButton).toBeEnabled();
    });

    test('shows game state if game state is not PLAYING', () => {

      // Arrange
      const gameModel: GameModel = new GameModel(
        new Player([new Card(10, SPADES)], true, true),
        new Player([new Card(10, HEARTS), new Card(10, CLUBS), new Card(10, DIAMONDS)], false, true),
        []
      );
      
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const mock = jest.fn().mockReturnValue(gameModel)
      gameService.createGame = mock;

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
      expect(mock).toHaveBeenCalledTimes(1);
    
      // Assert
      expect(screen.getByTestId("gamestate")).toBeVisible();
    });

    test('hides game state if game state is PLAYING', () => {

      // Arrange
      const gameModel: GameModel = new GameModel(
        new Player([new Card(10, SPADES)], true, false),
        new Player([new Card(10, HEARTS), new Card(10, CLUBS)], false, false),
        []
      );
      
      const randomService = new RandomService();
      const cardService = new CardService(randomService);
      const gameService = new GameService(cardService);
      const mock = jest.fn().mockReturnValue(gameModel)
      gameService.createGame = mock;

      const dependencies: Dependencies = {
        cardService,
        gameService,
        randomService
      };

      const component = <Game dependencies={dependencies}/>;
    
      // Act
      render(component);
      expect(mock).toHaveBeenCalledTimes(1);
    
      // Assert
      expect(screen.getByTestId("gamestate")).not.toBeVisible();
    });
  });
})
