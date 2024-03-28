import { useState, useEffect } from "react";
import "./App.css";
import BilliardGame from "./components/BilliardGame/BilliardGame";
import MenuColorBall from "./components/MenuColorBall/MenuColorBall";
import { IMenuDisplay } from "./types/types";

function App() {
  const [menuDisplay, setMenuDisplay] = useState<IMenuDisplay>({
    ballId: null,
    ballColor: null,
    isShowMenu: false,
  });

  useEffect(() => {
    console.log(menuDisplay);
  }, [menuDisplay]);

  return (
    <div className="App">
      <h1 className="App__title">Демо игры «Биллиард»</h1>
      <BilliardGame menuDisplay={menuDisplay} setMenuDisplay={setMenuDisplay} />
      {menuDisplay.isShowMenu && (
        <MenuColorBall
          menuDisplay={menuDisplay}
          setMenuDisplay={setMenuDisplay}
        />
      )}
    </div>
  );
}

export default App;
