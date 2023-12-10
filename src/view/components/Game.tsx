import "./Game.css"
import { useEffect, useState } from "react";
import { Game as GameModel } from "../../models/game";
import { Dependencies } from "../../services/setupDependencies";
import { Hand } from "./Hand";

interface Props {
    dependencies: Dependencies
};

export const Game: React.FC<Props> = ({dependencies}: Props) => {

    const [game, setGame] = useState({});
    const gameModel : GameModel = game as GameModel;
    const gameService = dependencies.gameService;
    
    useEffect(() => {
        if(Object.keys(game).length === 0){
            const initialGame : GameModel = gameService.createGame();
            setGame(initialGame);
        }      
    }, [game, gameService]);

    const handleHit = () => {
       const newGameState = gameService.hit(game as GameModel);
       setGame(newGameState); 
    };

    const handleStand = () => {
        const newGameState = gameService.stand(game as GameModel);
        setGame(newGameState); 
     };

    const handleRestart = () => { 
        setGame(gameService.createGame());
    }

    if(!gameModel || Object.keys(game).length === 0) return null;
    const {dealer, player, gameState} = gameModel;

    return(

        <div id="game" data-testid="game">       
            <Hand player={dealer} />
            <Hand player={player} />

            <button className="button" onClick={handleHit} disabled={gameState !== "PLAYING"}>Hit</button>
            <button className="button" onClick={handleStand} disabled={gameState !== "PLAYING"}>Stand</button>
            <button onClick={handleRestart}>Restart</button>

            <div data-testid="gamestate" className="gameState" hidden={gameState === "PLAYING"}>{gameState}</div>
            
        </div>
    )
}