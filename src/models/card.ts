export class Card {

    // Fields
    private _cardValue: number; 
    private _suit: string;

    // Getters/setters
    get cardValue() { return this._cardValue; } set cardValue(newCardValue : number) { this._cardValue = newCardValue };
    get suit() { return this._suit; } set suit(newSuit: string) { this._suit = newSuit; }

    // Constructors
    constructor(cardValue: number, suit: string) {
        this._cardValue = cardValue;
        this._suit = suit;
    }

    // Derived properties
    get id() { 
        const cardValueMap : {[key: number]: string} = {
            1: "A",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            10: "10",
            11: "J",
            12: "Q",
            13: "K"
        };

        return cardValueMap[this._cardValue] + this._suit;
    }

    // Utility methods
    public clone(): Card {
        return new Card(this.cardValue, this.suit);
    }
}