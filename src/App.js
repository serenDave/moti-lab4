import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Matrix from './components/Matrix/Matrix';
import Player from './components/Player/Player';

const initialState = {
    gameState: 'not-started',
    strategy: null,
    strategyId: 0,
    opponentStrategy: null,
    opponentStrategyId: 0,
    finalResult: null,
}; 

class App extends Component {
    state = initialState;

    previousTableCell = null;

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
        let opponentsScore = 0;

        // First checking our scores
        if (this.state.strategy[1] === 1 && this.state.opponentStrategy[0] === 1) {
            score++;
        } else if (this.state.strategy[1] === 2 && this.state.opponentStrategy[0] === 2) {
            score ++
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
        } else if (opponentsScore > score) {
            result = 'lose';
        } else {
            result = 'draw';
        }

        this.clearPreviousTableCell();

        const strategyId = this.getStrategyId(this.state.strategy);
        const opponentStrategyId = this.getStrategyId(this.state.opponentStrategy);

        const tableCell = document.getElementById(`${strategyId}${opponentStrategyId}`);

        tableCell.textContent = result === 'win' ? score : result === 'lose' ? -opponentsScore : 0;
        tableCell.style.backgroundColor = result === 'win' ? 'green' : result === 'lose' ? 'red' : 'grey';
        tableCell.style.color = '#fff';

        this.previousTableCell = tableCell;

        this.setState({ finalResult: result, gameState: 'finished' });
    }

    startGame() {
        this.clearPreviousTableCell();
        this.setState({ ...initialState });
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
                <header>Гра в пальці</header>
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
