import React, { useState } from 'react';
import './BlackjackPage.css';

const BlackjackPage: React.FC = () => {
    const [playerHand, setPlayerHand] = useState<number[]>([]);
    const [dealerHand, setDealerHand] = useState<number[]>([]);
    const [gameState, setGameState] = useState<'betting' | 'playing' | 'gameOver'>('betting');
    const [message, setMessage] = useState('');

    const drawCard = () => Math.floor(Math.random() * 10) + 2; // Enkelt: 2-11

    const calculateScore = (hand: number[]) => hand.reduce((a, b) => a + b, 0);

    const startGame = () => {
        setPlayerHand([drawCard(), drawCard()]);
        setDealerHand([drawCard()]);
        setGameState('playing');
        setMessage('');
    };

    const hit = () => {
        const newHand = [...playerHand, drawCard()];
        setPlayerHand(newHand);
        if (calculateScore(newHand) > 21) {
            setMessage('TJOCK! (Bust)');
            setGameState('gameOver');
        }
    };

    const stand = () => {
        let currentDealerHand = [...dealerHand];
        while (calculateScore(currentDealerHand) < 17) {
            currentDealerHand.push(drawCard());
        }
        setDealerHand(currentDealerHand);

        const pScore = calculateScore(playerHand);
        const dScore = calculateScore(currentDealerHand);

        if (dScore > 21 || pScore > dScore) {
            setMessage('NINJA VINNER!');
        } else if (pScore < dScore) {
            setMessage('HUSET VINNER');
        } else {
            setMessage('OAVGJORT (Push)');
        }
        setGameState('gameOver');
    };

    return (
        <div className="blackjack-container">
            <h1 style={{ color: '#adff2f', fontStyle: 'italic' }}>NINJA BLACKJACK</h1>

            <div className="table-area">
                <div className="hand-section">
                    <p className="balance-label">Dealerns Hand ({calculateScore(dealerHand)})</p>
                    <div className="cards-display">
                        {dealerHand.map((c, i) => <div key={i} className="card">{c}</div>)}
                    </div>
                </div>

                <div className="status-msg">{message}</div>

                <div className="hand-section">
                    <div className="cards-display">
                        {playerHand.map((c, i) => <div key={i} className="card">{c}</div>)}
                    </div>
                    <p className="balance-label">Din Hand ({calculateScore(playerHand)})</p>
                </div>
            </div>

            <div className="controls">
                {gameState === 'betting' || gameState === 'gameOver' ? (
                    <button className="action-btn" onClick={startGame}>Dela ut kort</button>
                ) : (
                    <>
                        <button className="action-btn" onClick={hit}>Ta kort (Hit)</button>
                        <button className="action-btn" style={{backgroundColor: '#fff'}} onClick={stand}>Stanna (Stand)</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlackjackPage;