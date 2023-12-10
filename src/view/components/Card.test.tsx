import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { Card as CardModel } from '../../models/card';
import { HEARTS } from '../../constants/constants';

describe("<Card />", () => {

  describe("render", () => {

    test('renders nothing if card is undefined', () => {

      // Arrange
      const component = <Card hideValue={false} card={undefined} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.queryByTestId("card-AH");
      expect(node).toBeNull();
    });

    test('renders card container if card is defined', () => {

      // Arrange
      const card: CardModel = new CardModel(1, HEARTS);

      const component = <Card hideValue={false} card={card} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByTestId("card-AH");
      expect(node).toBeDefined();
    });

    test('renders card value as ** if hideValue is true', () => {

      // Arrange
      const hideValue = true;
      const card: CardModel = new CardModel(1, HEARTS);

      const component = <Card hideValue={hideValue} card={card} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("**");
      expect(node).toBeDefined();
    });

    test('renders card value as card value if hideValue is false', () => {

      // Arrange
      const hideValue = false;
      const card: CardModel = new CardModel(1, HEARTS);

      const component = <Card hideValue={hideValue} card={card} />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("AH");
      expect(node).toBeDefined();
    });
  });
})
