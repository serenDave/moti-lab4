import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Matrix from './components/Matrix/Matrix';
import Player from './components/Player/Player';

const initialState = {
    gameState: 'not-started',
    strategy: null,
    multiplier: 1,
    opponentMultiplier: 1,
    opponentStrategy: null,
    finalResult: null,
    matrix: null,
}; 

class App extends Component {

    state = initialState;
    previousTableCell = null;

    componentDidMount() {
        this.initiateMatrix();
    }

    initiateMatrix() {
        let matrix = [];

        for (let i = 1; i <= 4; i++) {
            matrix[i - 1] = [];

            for (let j = 1; j <= 4; j++) {
                switch (i) {
                    case 1:
                        switch (j) {
                            case 1:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            case 2:
                                matrix[i - 1][j - 1] = 2;
                                break;
                            case 3:
                                matrix[i - 1][j - 1] = -3;
                                break;
                            case 4:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            default:
                                break;
                        }
                        break;
                    case 2:
                        switch (j) {
                            case 1:
                                matrix[i - 1][j - 1] = -2;
                                break;
                            case 2:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            case 3:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            case 4:
                                matrix[i - 1][j - 1] = 3;
                                break;        
                            default:
                                break;
                        }
                        break;
                    case 3:
                        switch (j) {
                            case 1:
                                matrix[i - 1][j - 1] = 3;
                                break;
                            case 2:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            case 3:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            case 4:
                                matrix[i - 1][j - 1] = -4;
                                break;        
                            default:
                                break;
                        }
                        break;
                    case 4:
                        switch (j) {
                            case 1:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            case 2:
                                matrix[i - 1][j - 1] = -3;
                                break;
                            case 3:
                                matrix[i - 1][j - 1] = 4;
                                break;
                            case 4:
                                matrix[i - 1][j - 1] = 0;
                                break;
                            default:
                                break;
                        }
                        break;            
                    default:
                        break;
                }
            }
        }

        this.setState({ matrix });
    }

    showMatrix() {
        this.state.matrix.forEach((s1, i) => {
            s1.forEach((s2, j) => {
                const situationElem = document.getElementById(`${i + 1}${j + 1}`);
                situationElem.textContent = s2;
                situationElem.style.backgroundColor = s2 > 0 ? 'green' : s2 < 0 ? 'red' : 'grey';
            });
        });
    }

    getOptimalStrategy() {
        const mins = {};

        this.state.matrix.forEach((strategy, i) => {
            let min = Math.min(...strategy);
            mins[i] = min;
        });

        const max = Math.max(...Object.values(mins));

        let optimal;
        for (const strategy in mins) {
            if (mins[strategy] === max) {
                optimal = strategy;
            }
        }

        return +optimal + 1;
    }

    clearPreviousTableCell() {
        if (this.previousTableCell) {
            this.previousTableCell.textContent = ""
            this.previousTableCell.style.backgroundColor = 'white';
            this.previousTableCell.style.color = "black";
        }
    }

    processMove() {
        const opponentStrategy = [Math.ceil(Math.random() * 2), Math.ceil(Math.random() * 2)];

        this.setState({ opponentStrategy }, () => {
            this.getResults();
        });
    }

    getResults() {
        let score = 0;
        let points = 0;
        let opponentsScore = 0;
        let opponentsPoints = 0;

        // First checking our scores
        if (this.state.strategy[1] === 1 && this.state.opponentStrategy[0] === 1) {
            score++;
        } else if (this.state.strategy[1] === 2 && this.state.opponentStrategy[0] === 2) {
            score++;
        }
        
        // Then opponents scores
        if (this.state.opponentStrategy[1] === 1 && this.state.strategy[0] === 1) {
            opponentsScore++;
        } else if (this.state.opponentStrategy[1] === 2 && this.state.strategy[0] === 2) {
            opponentsScore++;
        }

        let result;

        if (score > opponentsScore) {
            result = 'win';
            points += this.state.opponentStrategy[1] * this.state.opponentMultiplier;
        } else if (opponentsScore > score) {
            result = 'lose';
            opponentsPoints += this.state.strategy[1] * this.state.multiplier;
        } else {
            result = 'draw';
        }

        this.clearPreviousTableCell();

        const strategyId = this.getStrategyId(this.state.strategy);
        const opponentStrategyId = this.getStrategyId(this.state.opponentStrategy);

        const tableCell = document.getElementById(`${strategyId}${opponentStrategyId}`);

        tableCell.textContent = result === 'win' ? points : result === 'lose' ? -opponentsPoints : 0;
        tableCell.style.backgroundColor = result === 'win' ? 'green' : result === 'lose' ? 'red' : 'grey';
        tableCell.style.color = '#fff';

        this.previousTableCell = tableCell;

        this.setState({ finalResult: result, gameState: 'finished' });
    }

    startGame() {
        this.clearPreviousTableCell();

        const startState = { ...initialState };
        delete startState.matrix;

        this.setState({ ...startState });
    }

    getStrategyId(strategy) {
        let id;

        switch (true) {
            case strategy[0] === 1 && strategy[1] === 1:
                id = 1;
                break;
            case strategy[0] === 1 && strategy[1] === 2:
                id = 2;
                break;
            case strategy[0] === 2 && strategy[1] === 1:
                id = 3;
                break;
            case strategy[0] === 2 && strategy[1] === 2:
                id = 4;
                break;
            default:
                break;
        }

        return id;
    }

    renderActions() {
        let element = null;

        switch (this.state.gameState) {
            case 'not-started':
                element = (
                    <Fragment>
                        <h2>Готові грати в ігру?</h2>
                        <Button variant="success" onClick={() => this.setState({ gameState: 'started' })}>
                            Почати
                        </Button>
                    </Fragment>
                );
                break;
            case 'started':
                element = (
                    <Fragment>
                        <h2>Оберіть стратегію:</h2>
                        <div className="strategies">
                            <Button
                                variant="outline-success"
                                onClick={() => { 
                                    this.setState({ strategy: [1, 1] }, () => {
                                        this.processMove();
                                    });
                                }}
                            >
                                {'{1, 1}'}
                            </Button>
                            <Button
                                variant="outline-success"
                                onClick={() => { 
                                    this.setState({ strategy: [1, 2] }, () => {
                                        this.processMove();
                                    });
                                }}
                            >
                                {'{1, 2}'}
                            </Button>
                            <Button
                                variant="outline-success"
                                onClick={() => { 
                                    this.setState({ strategy: [2, 1] }, () => {
                                        this.processMove();
                                    });
                                }}
                            >
                                {'{2, 1}'}
                            </Button>
                            <Button
                                variant="outline-success"
                                onClick={() => { 
                                    this.setState({ strategy: [2, 2] }, () => {
                                        this.processMove();
                                    });
                                }}
                            >
                                {'{2, 2}'}
                            </Button>
                        </div>
                    </Fragment>
                );
                break;
            case 'finished':
                const text = this.state.finalResult === 'win' 
                    ? 'Ви виграли!' 
                    : this.state.finalResult === 'lose'
                        ? 'Ви програли!' 
                        : 'Нічия!';

                element = (
                    <Fragment>
                        <h2>{text}</h2>
                        <Button variant="success" onClick={() => this.startGame()}>Грати ще раз?</Button>
                    </Fragment>
                );
                break;
            default:
                break;
        }

        return element;
    }

    render() {
        return (
            <div className="App">
                <header>
                    <p>Гра в пальці</p>
                    <ul>
                        <li style={{ marginRight: '20px' }}>
                            <Button variant="warning" onClick={() => {
                                const strategy = this.getOptimalStrategy();
                                const strategyElem = document.getElementById(`strategy-${strategy}`);
                                strategyElem.style.backgroundColor = '#ffc107';
                            }}>Показати оптимальну стратегію</Button>
                        </li>
                        <li>
                            <Button variant="primary" onClick={() => this.showMatrix()}>Показати матрицю гри</Button>
                        </li>
                    </ul>
                </header>
                <main>
                    <div className="container-custom">
                        <Player result={this.state.finalResult} />
                        <Matrix />
                        <Player result={this.state.finalResult} opponent />
                    </div>
                    <div className="actions">{this.renderActions()}</div>
                </main>
            </div>
        );
    }
}

export default App;
