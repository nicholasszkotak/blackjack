import "./Card.css";
import { Card as CardModel } from "../../models/card";

interface Props {
    card: CardModel | undefined,
    hideValue: boolean
};

/**
 * Renders a card from a deck. 
 */
export const Card: React.FC<Props> = ({card, hideValue}: Props) => {

    if(!card) return null;

    return(
        <div data-testid={`card-${card.id}`} className="card">
            {hideValue ? "**" : card.id}
        </div>
    )
}