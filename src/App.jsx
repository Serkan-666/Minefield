import { useState } from "react";
import { combineBoxes } from "./js/creates";
import { flag, openBox } from "./js/playing";


function App() {
  const [boxes, setBoxes] = useState([])
  const [start, setStart] = useState(false)
  const [flags, setFlags] = useState(0);
  const [bombCount, setBombCount] = useState(0);
  let safeOpen = 0;
  function safeOpenFunction(box) {
    if (box.id > boxes.length / 3 && box.value == 0 && safeOpen == 0) {
      safeOpen++
      return true;
    }
    return false;
  }
  function handleStart(e) {
    setBombCount(Number(e.target.value))
    setBoxes(combineBoxes(Number(e.target.value)))
    setStart(true)
  }
  return (
    <div className="App">
      {start ? (
        <>
          <div className="grid">
            {boxes && boxes.map((box) => (
              <div
                onClick={(e) => openBox(e, boxes, bombCount)}
                onContextMenu={(e) => flag(e, setFlags, flags)}
                className={safeOpenFunction(box) ? "box safe-open" : "box"}
                id={box.id}
                key={box.id}
              ></div>
            ))}

          </div>
          <div className="flags-count">
            Mayın: {bombCount - flags}/{bombCount}
          </div>
        </>
      ) : (
        <>
          <div className="baslik">
            <h1>Mayın Tarlasına Adımını Attın, Heyecana Hazır Olun!</h1>
            <h2>Gelin bir zorluk seçin ve başlayalım!</h2>
          </div>
          <div className="buttons">
            <input type="button" value="25" onClick={(e) => handleStart(e)} className="start-buttons" />
            <input type="button" value="50" onClick={(e) => handleStart(e)} className="start-buttons" />
            <input type="button" value="75" onClick={(e) => handleStart(e)} className="start-buttons" />
            <input type="button" value="100" onClick={(e) => handleStart(e)} className="start-buttons s" />
          </div>

        </>
      )}
    </div >
  );
}






export default App;
