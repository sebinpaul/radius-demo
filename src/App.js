import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [matrix, setMatrix] = useState(getInitialMatrix());
  const [clickCount, setClickCount] = useState(0);
  const [greenTrack, setGreenTrack] = useState([]);

  useEffect(() => {
    let allGreyBoxesClicked = true;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].isGrey && !matrix[i][j].isClicked) {
          allGreyBoxesClicked = false;
          break;
        }
      }
      if (!allGreyBoxesClicked) {
        break;
      }
    }
    if (allGreyBoxesClicked) {
      handleDecolorize();
    }
  }, [matrix]);

  function getInitialMatrix() {
    const initialMatrix = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push({ isGrey: false, isClicked: false });
      }
      initialMatrix.push(row);
    }

    const greyCellIndices = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ];

    greyCellIndices.forEach(([rowIdx, colIdx]) => {
      initialMatrix[rowIdx][colIdx].isGrey = true;
    });

    return initialMatrix;
  }

  const handleBoxClick = (rowIndex, colIndex) => {
    let updatedMatrix = [...matrix];
    if (
      updatedMatrix[rowIndex][colIndex].isGrey &&
      !updatedMatrix[rowIndex][colIndex].isClicked
    ) {
      updatedMatrix[rowIndex][colIndex].isClicked = true;
      setMatrix(updatedMatrix);
      setClickCount(clickCount + 1);
      const updatedGreenTrack = [...greenTrack];
      updatedGreenTrack.push({ rowIndex, colIndex });
      setGreenTrack(updatedGreenTrack);
    }
  };

  const handleDecolorize = () => {
    if (clickCount > 0) {
      const updatedMatrix = [...matrix];
      let clickedCount = clickCount;
      let delay = 1000;
      console.log(greenTrack);
      while (greenTrack.length !== 0) {
        const { rowIndex, colIndex } = greenTrack.pop();
        setTimeout(() => {
          updatedMatrix[rowIndex][colIndex].isClicked = false;
          clickedCount--;
          setMatrix(updatedMatrix);
          setClickCount(clickedCount);
        }, delay);
        delay = delay + 1000;
      }
    }
  };

  return (
    <div className="App">
      <div className="matrix">
        {matrix.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map(({ isGrey, isClicked }, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={`box ${isGrey ? "grey" : "white"} ${
                      isClicked ? "green" : ""
                    }`}
                    onClick={() => isGrey && handleBoxClick(rowIndex, colIndex)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
