import { ICardService, CardService } from "./cardService";
import { IGameService, GameService } from "./gameService";
import { IRandomService, RandomService } from "./randomService";

export interface Dependencies {
    cardService: ICardService;
    gameService: IGameService;
    randomService: IRandomService;
}

/**
 * Sets up the dependency tree for the services
 * 
 * @returns an object with instances of all dependencies needed for the application 
 */
export const setupDependencies = () => {
      
  const randomService: IRandomService = new RandomService();
  const cardService: ICardService = new CardService(randomService);
  const gameService: IGameService = new GameService(cardService);

  return {
    cardService,
    gameService,
    randomService
  } as Dependencies;

} 