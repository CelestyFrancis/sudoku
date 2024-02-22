import React from "react";
import "./Sudoku.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { Cell, SudokuLogic } from "./components";
import { gameServices } from "../../services/gameServices";

class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      sudoku: null,
      sudokuReset: null,
      error: null,
      popoverOpen: "",
      invalidIndices: [],
      timer: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      loading: false,
      intervalId: 0,
      winnerModalOpen: false,
      difficulty: "easy"
    };
  }

  setLoading = value => {
    this.setState({
      ...this.state,
      loading: value
    });
  };

  setGameStarted = value => {
    this.setState({
      ...this.state,
      gameStarted: value
    });
  };

  setDifficulty = value => {
    this.setState({
      difficulty: value.currentTarget.value
    });
  };

  setSudoku = data => {
    this.setState({
      ...this.state,
      sudoku: data
    });
  };

  setSudokuReset = data => {
    this.setState({
      ...this.state,
      sudokuReset: data
    });
  };

  setError = data => {
    this.setState({
      ...this.state,
      error: data
    });
  };

  setWinnerModal = data => {
    this.setState({
      ...this.state,
      winnerModalOpen: data
    });
  };

  setPopoverOpen = data => {
    this.setState({
      ...this.state,
      popoverOpen: data
    });
  };

  setFieldValue = (id, value) => {
    let temp3 = [...this.state.sudoku];
    temp3[parseInt(id[0])][parseInt(id[1])] = value;
    this.setSudoku([...temp3]);
    this.setPopoverOpen("");
  };

  setInvalidIndices = data => {
    this.setState({
      ...this.state,
      invalidIndices: data
    });
    setTimeout(
      () =>
        this.setState({
          ...this.state,
          invalidIndices: []
        }),
      3000
    );
  };

  toggle = id => this.setPopoverOpen(id);

  timer = () => {
    let seconds = this.state.timer.seconds;
    let minutes = this.state.timer.minutes;
    let hours = this.state.timer.hours;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
    this.setState({
      ...this.state,
      timer: {
        seconds: seconds,
        minutes: minutes,
        hours: hours
      }
    });
  };

  resetTimer = () => {
    this.setState({
      ...this.state,
      timer: {
        seconds: 0,
        minutes: 0,
        hours: 0
      }
    });
  };

  clearSudoku = () => {
    let temp = [];
    this.state.sudokuReset.map(item => temp.push([...item]));
    this.setSudoku(temp);
  };

  createNew = () => {
    clearInterval(this.state.intervalId);
    this.setLoading(true);
    gameServices.getSudoku(this.state.difficulty).then(
      data => {
        this.setSudoku(data);
        let temp = [];
        data.map(item => temp.push([...item]));
        this.setSudokuReset(temp);
        this.resetTimer();
        this.setState({
          ...this.state,
          gameStarted: true,
          invalidIndices: [],
          loading: false,
          intervalId: setInterval(() => this.timer(), 1000)
        });
      },
      error => {
        this.setError(error);
        this.setLoading(false);
      }
    );
  };

  checkSudoku = e => {
    e.preventDefault();
    const invalidIndices = SudokuLogic.Check(this.state.sudoku);
    if (invalidIndices.length === 0) {
      clearInterval(this.state.intervalId);
      this.setWinnerModal(true);
      return;
    }
    this.setInvalidIndices(invalidIndices);
  };

  render() {
    if (this.state.error !== null) {
      return <center>Error loading sudoku please refresh</center>;
    } else if (this.state.loading) {
      return <center>Loading game...</center>;
    } else if (!this.state.gameStarted) {
      return (
        <Modal isOpen={true}>
          <ModalHeader>Select Difficulty</ModalHeader>
          <ModalBody>
            <select onChange={this.setDifficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="vhard">Very hard</option>
              <option value="extreme">Pro</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.createNew()}>
              Start game
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
    const sudokuGridGenerator = () => {
      let grid = [];
      let top = [0, 3, 6];
      let bottom = [2, 5, 8];
      let left = [0, 3, 6];
      let right = [2, 5, 8];

      [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((element, j) => {
          grid.push(
            <li
              className={`${top.includes(i) ? "sudoku-top" : ""} ${
                left.includes(j) ? "sudoku-left" : ""
              }  ${right.includes(j) ? "sudoku-right" : ""} ${
                bottom.includes(i) ? "sudoku-bottom" : ""
              }`}
            >
              <Cell
                popoverOpen={this.state.popoverOpen}
                setPopoverOpen={this.setPopoverOpen}
                toggle={this.toggle}
                id={`${i}${j}`}
                invalid={
                  this.state.invalidIndices.includes(i + "" + j) &&
                  this.state.sudokuReset[i][j] === 0
                }
                value={this.state.sudoku[i][j]}
                disabled={this.state.sudokuReset[i][j] !== 0}
                setFieldValue={this.setFieldValue}
              />
            </li>
          );
        });
      });
      return grid;
    };

    return (
      <Container className="sudoku" fluid>
        <Modal
          isOpen={this.state.winnerModalOpen}
          toggle={() => this.setWinnerModal(false)}
        >
          <ModalHeader toggle={() => this.setWinnerModal(false)}>
            Congratulations
          </ModalHeader>
          <ModalBody>
            You won with a time of: {this.state.timer.hours} hours{" "}
            {this.state.timer.minutes} mins {this.state.timer.seconds} secs
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => this.setWinnerModal(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col className="sudoku-main">
            <div className="sudoku-table">{sudokuGridGenerator()}</div>
          </Col>
          <Col className="sudoku-sidebar">
            <Button onClick={this.checkSudoku}>Check</Button>
            <Button onClick={() => this.setGameStarted(false)}>New Game</Button>
            <Button onClick={() => this.clearSudoku()}>Clear</Button>
            <div>
              <div className="sudoku-counter">
                {this.state.timer.hours} : {this.state.timer.minutes} :{" "}
                {this.state.timer.seconds}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sudoku;
