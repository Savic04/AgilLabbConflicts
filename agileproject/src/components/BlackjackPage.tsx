import React, { useState } from 'react';
import './BlackjackPage.css';

interface BlackjackProps {
    balance: number;
    onUpdateBalance: (amount: number) => void;
    onBack: () => void;
}

const BlackjackPage: React.FC<BlackjackProps> = ({ balance, onUpdateBalance, onBack }) => {
    const [playerHand, setPlayerHand] = useState<number[]>([]);
    const [dealerHand, setDealerHand] = useState<number[]>([]);
    const [gameState, setGameState] = useState<'betting' | 'playing' | 'gameOver'>('betting');
    const [message, setMessage] = useState('');

    const betSize = 500;

    const drawCard = () => Math.floor(Math.random() * 10) + 2;
    const calculateScore = (hand: number[]) => hand.reduce((a, b) => a + b, 0);

    const startGame = () => {
        if (balance < betSize) {
            alert("Du har inte råd! Sätt in mer pengar.");
            return;
        }
        onUpdateBalance(-betSize);
        setPlayerHand([drawCard(), drawCard()]);
        setDealerHand([drawCard()]);
        setGameState('playing');
        setMessage('');
    };

    const hit = () => {
        const newHand = [...playerHand, drawCard()];
        setPlayerHand(newHand);
        if (calculateScore(newHand) > 21) {
            setMessage('TJOCK! DU FÖRLORADE');
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
            setMessage('NINJA VINNER! +1000 KR');
            onUpdateBalance(betSize * 2);
        } else if (pScore < dScore) {
            setMessage('HUSET VINNER');
        } else {
            setMessage('PUSH (OAVGJORT)');
            onUpdateBalance(betSize);
        }
        setGameState('gameOver');
    };

    return (
        <div className="blackjack-container">
            <button onClick={onBack} className="logout-btn" style={{ textDecoration: 'none', color: '#adff2f', border: '1px solid #adff2f', padding: '5px 15px', borderRadius: '4px', marginBottom: '20px' }}>
                ← TILLBAKA TILL LOBBYN
            </button>

            <div className="balance-display" style={{ margin: '10px 0' }}>
                <span className="balance-label">Ditt Saldo</span>
                <div className="balance-amount" style={{ fontSize: '1.5rem' }}>{balance.toLocaleString()} kr</div>
            </div>

            <div className="table-area">
                <div className="hand-section">
                    <p className="balance-label">Dealer ({calculateScore(dealerHand)})</p>
                    <div className="cards-display">
                        {dealerHand.map((c, i) => <div key={i} className="card">{c}</div>)}
                    </div>
                </div>

                <div className="status-msg">{message}</div>

                <div className="hand-section">
                    <div className="cards-display">
                        {playerHand.map((c, i) => <div key={i} className="card">{c}</div>)}
                    </div>
                    <p className="balance-label">Du ({calculateScore(playerHand)})</p>
                </div>
            </div>

            <div className="controls">
                {gameState !== 'playing' ? (
                    <button className="play-button" onClick={startGame}>DELA UT (500 kr)</button>
                ) : (
                    <>
                        <button className="action-btn" onClick={hit}>TA KORT</button>
                        <button className="action-btn" style={{ background: '#fff' }} onClick={stand}>STANNA</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlackjackPage;