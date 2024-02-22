import React from "react";
import "./GameView.css";
import { Sudoku } from "../../components";
function GameView(props) {
  return (
    <React.Fragment>
      <div className="game-view">
        <Sudoku />
      </div>
    </React.Fragment>
  );
}

export default GameView;
