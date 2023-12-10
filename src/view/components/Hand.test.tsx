import { render, screen } from '@testing-library/react';
import { Hand } from './Hand';
import { Card as CardModel } from '../../models/card';
import { Player } from '../../models/player';
import { HEARTS } from '../../constants/constants';

describe("<Hand />", () => {

  describe("render", () => {

    test('renders nothing if player is null', () => {

      // Arrange
      const component = <Hand player={undefined} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.queryByText("Dealer Hand");
      expect(node).toBeNull();
    });

    test('sets player label to Dealer Hand if isDealer is true', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = true;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.queryByText("Dealer Hand");
      const unexpectedNode = screen.queryByText("Player Hand");
      expect(node).toBeDefined();
      expect(unexpectedNode).toBeNull();
    });
    
    test('sets player label to Player Hand if isDealer is false', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = false;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.queryByText("Player Hand");
      const unexpectedNode = screen.queryByText("Dealer Hand");
      expect(node).toBeDefined();
      expect(unexpectedNode).toBeNull();
    });

    test('renders a card for each player in the hand', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = false;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      const {container} = render(component);
    
      // Assert
      const nodes = container.getElementsByClassName("card");
      expect(nodes.length).toEqual(2);
      expect(nodes[0].getAttribute("data-testid")).toEqual("card-AH");
      expect(nodes[1].getAttribute("data-testid")).toEqual("card-2H");
      expect(screen.getByText("AH")).toBeDefined();
      expect(screen.getByText("2H")).toBeDefined();
    });

    test('hides the first card value if the player is dealer and their turn is not complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = true;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.getByText("**")).toBeDefined();
      expect(screen.getByText("2H")).toBeDefined();
    });

    test('shows the first card value if the player is dealer and their turn is complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = true;
      const isTurnComplete = true;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.getByText("AH")).toBeDefined();
      expect(screen.getByText("2H")).toBeDefined();
    });

    test('shows the first card value if the player is not dealer and their turn is not complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = false;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.getByText("AH")).toBeDefined();
      expect(screen.getByText("2H")).toBeDefined();
    });

    test('shows the first card value if the player is not dealer and their turn is complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = false;
      const isTurnComplete = true;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.getByText("AH")).toBeDefined();
      expect(screen.getByText("2H")).toBeDefined();
    });

    test('hides score if player is dealer and turn is not complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = true;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.getByText("Score: ??")).toBeDefined();
      expect(screen.queryByText("Score: 13")).toBeNull();
    });

    test('shows score if player is dealer and turn is complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = true;
      const isTurnComplete = true;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.queryByText("Score: ??")).toBeNull();
      expect(screen.queryByText("Score: 13")).toBeDefined();
    });

    test('shows score if player is not dealer and turn is not complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = false;
      const isTurnComplete = false;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.queryByText("Score: ??")).toBeNull();
      expect(screen.queryByText("Score: 13")).toBeDefined();
    });

    test('shows score if player is not dealer and turn is complete', () => {

      // Arrange
      const hand: CardModel[] = [new CardModel(1, HEARTS), new CardModel(2, HEARTS)];
      const isDealer = false;
      const isTurnComplete = true;

      const player: Player = new Player(hand, isDealer, isTurnComplete);

      const component = <Hand player={player} />;
    
      // Act
      render(component);
    
      // Assert
      expect(screen.queryByText("Score: ??")).toBeNull();
      expect(screen.queryByText("Score: 13")).toBeDefined();
    });
  });
})
