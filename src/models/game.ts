import { Card } from "./card";
import { Player } from "./player";

export class Game {

    // Fields
    private _dealer: Player;
    private _player: Player;
    private _deck: Card[];

    // Getter/setters
    get dealer() { return this._dealer;} set dealer(dealer: Player) { this._dealer = dealer;}  
    get player() { return this._player;} set player(player: Player) { this._player = player;}
    get deck() { return this._deck;} set deck(deck: Card[]) { this._deck = deck;}

    // Constructor    
    constructor(dealer: Player, player: Player, deck: Card[]) {
        this._dealer = dealer;
        this._player = player;
        this._deck = deck;
    }

    // Derived properties

    /**
     * Calculates the state of the game based on the players and their scores.
     */
    get gameState() : string {

        // A game state is only valid if both players have completed their turn.
        if(!this._dealer.isTurnComplete || !this._player.isTurnComplete) 
            return "PLAYING";

        // WIN = the player wins if any are true:
        // - the dealer's score is greater than 21 and the player's score is less than or equal to 21
        // - both scores are under 21 but the player has a higher score
        if((this._player.score <= 21 && this._dealer.score > 21)
           || (this._player.score > this._dealer.score))
            return "WIN";

        // LOSE = the player loses if any are true:
        // - the player's score is greater than 21 (bust)
        // - the player's score is less than the dealer's score score < dealer score
        if(this._player.score > 21
            || this._player.score < this._dealer.score)
            return "LOSE";

        // TIE = if after all checks, the scores are the same, there is a tie 
        if(this._player.score === this._dealer.score) return "TIE";

        // If we make it this far, we're in an unknown state so throw an error
        throw new Error("Unknown game state reached");
    }
 
    // Utility methods
    public clone(): Game {
        const newDeck = this._deck.map(c => c.clone());
        return new Game(this._dealer.clone(), this._player.clone(), newDeck);
    }
}