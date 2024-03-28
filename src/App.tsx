import "./App.css";
import BilliardGame from "./components/BilliardGame/BilliardGame";
import MenuColorBall from "./components/MenuColorBall/MenuColorBall";

function App() {
  return (
    <div className="App">
      <h1 className="App__title">Демо игры «Биллиард»</h1>
      <BilliardGame />
      <MenuColorBall />
    </div>
  );
}

export default App;
