import "./App.css";
import {Game} from './components/Game';
import { setupDependencies } from '../services/setupDependencies';

function App() {

  const dependencies = setupDependencies();

  return (
    <div className="App">
      <h1>BlackJack for Freestar</h1>
      <Game dependencies={dependencies} />
    </div>
  );
}

export default App;
