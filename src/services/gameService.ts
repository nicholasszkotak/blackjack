import { DEALER_HIT_MAX, MAX_SCORE } from "../constants/constants";
import { Card } from "../models/card";
import { Game } from "../models/game";
import { Player } from "../models/player";
import { ICardService } from "./cardService";

export interface IGameService {

    createGame(): Game;

    hit(currentGame: Game): Game;

    stand(currentGame: Game): Game;
}

export class GameService implements IGameService {

    private readonly _cardService: ICardService;

    constructor(cardService: ICardService) {
        this._cardService = cardService;
    }

    hit(currentGame: Game): Game {
        
        const newGame: Game = currentGame.clone();
        
        // Deal a new card to the player's hand. If the player busts or gets BlackJack, end the game.
        // Otherwise, the player can take another action.
        const newCard = this._cardService.dealCard(newGame.deck);
        newGame.player.hand.push(newCard);

        // If the player has busted or gotten Blackjack, automatically end the game
        if(newGame.player.score >= MAX_SCORE) {
            newGame.player.isTurnComplete = true;
            newGame.dealer.isTurnComplete = true;
        }

        return newGame;
    }

    stand(currentGame: Game): Game {
        const newGame : Game = currentGame.clone();

        // Complete the player's turn and pass control to the dealer. The dealer will be dealt cards continually until they are above 17,
        // after which the turn ends.
        newGame.player.isTurnComplete = true;

        while(newGame.dealer.score < DEALER_HIT_MAX)
        {
            newGame.dealer.hand.push(this._cardService.dealCard(newGame.deck));
        }

        newGame.dealer.isTurnComplete = true;

        return newGame;
    }

    createGame() : Game {

        // Create and shuffle a deck of cards.
        const deck : Card[] = this._cardService.buildDeck();
        const shuffledDeck : Card[] = this._cardService.shuffleDeck(deck);

        // Create the game of two players, with two cards dealt.
        // NOTE: The way I implemented this has a subtle side effect because dealCard uses "shift()" which modifies shuffledDeck. This isn't ideal
        // because it ties these services together and isn't clear through the usage. I opted to leave it in as an example of how 
        // I think about potential problems in the overall code.
        return new Game(
            new Player([this._cardService.dealCard(shuffledDeck), this._cardService.dealCard(shuffledDeck)], true, false),
            new Player([this._cardService.dealCard(shuffledDeck), this._cardService.dealCard(shuffledDeck)], false, false),
            shuffledDeck
        );
    }
    
}