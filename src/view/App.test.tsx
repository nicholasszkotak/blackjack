import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {

  describe("render", () => {
    test('renders header', () => {

      // Arrange
      const component = <App />;
    
      // Act
      render(component);
    
      // Assert
      const node = screen.getByText("BlackJack for Freestar");
      expect(node).toBeDefined();
      expect(node.tagName).toEqual("H1");
    });

    test('renders game', async () => {

      // Arrange
      const component = <App />;
    
      // Act
      render(component);
    
      // Assert
      const node = await screen.findByTestId("game")
      expect(node).toBeDefined();
    });
  })
  
  
})
