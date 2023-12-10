import { Card } from "./card";

export class Player {

    // Fields
    private _hand: Card[];
    private _isDealer: boolean;
    private _isTurnComplete: boolean;

    // Getters/setters
    get hand() { return this._hand;} set hand(newHand: Card[]) { this._hand = newHand;}
    get isDealer() { return this._isDealer;} set isDealer(newIsDealer: boolean) { this._isDealer = newIsDealer;}
    get isTurnComplete() { return this._isTurnComplete; } set isTurnComplete(newIsTurnComplete: boolean) { this._isTurnComplete = newIsTurnComplete; }

    // Constructors
    constructor(hand: Card[], isDealer: boolean, isTurnComplete: boolean) {
        this._hand = hand;
        this._isDealer = isDealer;
        this._isTurnComplete = isTurnComplete;
    }

    // Derived properties
    get score(): number {
        
        const hand = this._hand;

        // Start by calculating the running score as the sum of all non-aces, converting any face cards to 10
        // along the way.
        let runningScore: number = hand
            .filter(card => card.cardValue !== 1)
            .map(card => card.cardValue > 10 ? 10 : card.cardValue)
            .reduce((acc, cardValue) => acc + cardValue, 0);

        // Each ace can be added to the running total as either an 11 or a 1 depending on if it would bust the player
        hand
            .filter(card => card.cardValue === 1)
            .forEach(() => runningScore += (runningScore + 11 <= 21 ? 11 : 1))     
   
        return runningScore;
    }

    // Utility methods
    public clone(): Player {
        return new Player(this._hand.map(c => c.clone()), this._isDealer, this._isTurnComplete);
    }

}