import "./Hand.css";
import { Player } from "../../models/player";
import { Card } from "./Card";

interface Props {
    player: Player | undefined
};

/**
 * Renders a set of cards representing a player's hand. 
 */
export const Hand: React.FC<Props> = ({player}: Props) => {

    if(!player) return null;

    const {isDealer, hand, score, isTurnComplete} = player;
    const playerLabel = isDealer ? "Dealer Hand" : "Player Hand";
    const scoreLabel = `Score: ${isDealer && !isTurnComplete ? "??" : score}`;

    return(
        <div className="playerContainer">
            <strong>{playerLabel}</strong>
            <div className="handContainer">
                {hand.map((card, index) => <Card key={card.id} card={card} hideValue={isDealer && !isTurnComplete && index === 0} /> )}
            </div>
            <strong>{scoreLabel}</strong>
        </div>
    )
}