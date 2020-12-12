import React from 'react';
import { GiPerson } from 'react-icons/gi';

const Player = ({ opponent, result, score }) => {
    let text;
    let resultText;

    if (!opponent) {
        text = 'Ви';
        resultText = result === 'win' ? 'Виграш' : result === 'lose' ? 'Програш' : 'Нічия'
    } else {
        text = 'Опонент';
        resultText = result === 'win' ? 'Програш' : result === 'lose' ? 'Виграш' : 'Нічия';
    }

    return (
        <div className="player">
            {result && <h4>{resultText}</h4>}
            <h3 style={{ textAlign: 'center' }}>{text}</h3>
            <GiPerson size={100} />
            <p style={{ fontSize: '20px' }}>Кількість очок: {score}</p>
        </div>
    );
};

export default Player;
