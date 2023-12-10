import { CARD_COUNT, CLUBS, DIAMONDS, HEARTS, SPADES } from "../constants/constants";
import { Card } from "../models/card";
import { IRandomService } from "./randomService";

export interface ICardService { 
    
    /**
     * Builds a deck of cards.
     */
    buildDeck() : Card[];
    
    /**
     * Shuffles a deck of cards.
     * 
     * @param deck the deck to shuffle
     */
    shuffleDeck(deck : Card[]) : Card[];

    /**
     * Deals a card from the top of the deck. If no card is available, throws an error
     */
    dealCard(deck : Card[]) : Card;
}

export class CardService implements ICardService {

    private readonly _randomService : IRandomService;
    
    constructor(randomService : IRandomService) {
        this._randomService = randomService;
    }
    
    buildDeck() : Card[] {
    
        const deck : Card[] = [];
        const suits: string[] = [HEARTS, CLUBS, SPADES, DIAMONDS];

        for(let i = 0; i < suits.length; i++)
        {
            for(let j = 1; j <= CARD_COUNT; j++)
            {
                deck.push(new Card(j, suits[i]));
            }
        }

        return deck;
    }

    shuffleDeck(deck: Card[]): Card[] {
        return deck.sort(() => this._randomService.random() - 0.5);
    }

    dealCard(deck: Card[]): Card {

        const topCard = deck.shift();
        if(!topCard) throw new Error("Deck is empty, card cannot be dealt");

        return topCard;
    }
}
