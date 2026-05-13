import React, { useState } from 'react';
import './BlackjackPage.css';

interface BlackjackProps {
    balance: number;
    onUpdateBalance: (amount: number) => void;
    onBack: () => void;
}

const BlackjackPage: React.FC<BlackjackProps> = ({ balance, onUpdateBalance, onBack }) => {
    const [hands, setHands] = useState<number[][]>([]);
    const [activeHandIndex, setActiveHandIndex] = useState(0);
    const [dealerHand, setDealerHand] = useState<number[]>([]);
    const [gameState, setGameState] = useState<'betting' | 'playing' | 'gameOver'>('betting');
    const [message, setMessage] = useState('');
    const [bets, setBets] = useState<number[]>([]);

    const drawCard = () => Math.floor(Math.random() * 10) + 2;
    const calculateScore = (hand: number[]) => hand.reduce((a, b) => a + b, 0);

    const startGame = () => {
        if (balance < 500) return alert("Sätt in mer pengar!");
        onUpdateBalance(-500);
        setHands([[drawCard(), drawCard()]]);
        setDealerHand([drawCard()]);
        setBets([500]);
        setActiveHandIndex(0);
        setGameState('playing');
        setMessage('Spelet har börjat');
    };

    const hit = () => {
        const newHands = [...hands];
        newHands[activeHandIndex].push(drawCard());
        setHands(newHands);

        if (calculateScore(newHands[activeHandIndex]) > 21) {
            moveToNextHand(newHands);
        }
    };

    const doubleDown = () => {
        const currentBet = bets[activeHandIndex];
        if (balance < currentBet) return alert("För lite pengar för att dubbla!");

        onUpdateBalance(-currentBet);
        const newBets = [...bets];
        newBets[activeHandIndex] = currentBet * 2;
        setBets(newBets);

        const newHands = [...hands];
        newHands[activeHandIndex].push(drawCard());
        setHands(newHands);

        console.log("Dubblade! Ny insats:", newBets[activeHandIndex]);
        moveToNextHand(newHands);
    };

    const split = () => {
        const currentBet = bets[activeHandIndex];
        if (balance < currentBet) return alert("För lite pengar för split!");

        onUpdateBalance(-currentBet);
        const currentHand = hands[activeHandIndex];

        // Dela upp de två korten till två nya händer och ge dem ett nytt kort var
        const newHands = [
            [currentHand[0], drawCard()],
            [currentHand[1], drawCard()]
        ];
        const newBets = [currentBet, currentBet];

        setHands(newHands);
        setBets(newBets);
        setActiveHandIndex(0);
        setMessage("Hand 1 av 2");
        console.log("Splittade handen!");
    };

    const stand = () => {
        moveToNextHand(hands);
    };

    const moveToNextHand = (currentHands: number[][]) => {
        if (activeHandIndex < currentHands.length - 1) {
            setActiveHandIndex(activeHandIndex + 1);
            setMessage("Spelar hand 2...");
        } else {
            finishGame(currentHands);
        }
    };

    const finishGame = (finalHands: number[][]) => {
        let currentDealerHand = [...dealerHand];
        while (calculateScore(currentDealerHand) < 17) {
            currentDealerHand.push(drawCard());
        }
        setDealerHand(currentDealerHand);
        const dScore = calculateScore(currentDealerHand);

        let totalWin = 0;
        let resultMessages: string[] = [];

        finalHands.forEach((hand, i) => {
            const pScore = calculateScore(hand);
            if (pScore > 21) {
                resultMessages.push(`Hand ${i+1}: Tjock`);
            } else if (dScore > 21 || pScore > dScore) {
                resultMessages.push(`Hand ${i+1}: Vinst`);
                totalWin += bets[i] * 2;
            } else if (pScore < dScore) {
                resultMessages.push(`Hand ${i+1}: Förlust`);
            } else {
                resultMessages.push(`Hand ${i+1}: Push`);
                totalWin += bets[i];
            }
        });

        onUpdateBalance(totalWin);
        setMessage(resultMessages.join(" | "));
        setGameState('gameOver');
    };

    return (
        <div className="blackjack-container">
            <div className="header-ui">
                <button onClick={onBack} className="action-btn" style={{background: '#444', color: '#fff'}}>← TILLBAKA</button>
                <div className="balance-box">SALDO: {balance.toLocaleString()} kr</div>
            </div>

            <div className="table-area">
                <div className="hand-section">
                    <p className="label">DEALER ({dealerHand.length > 0 ? calculateScore(dealerHand) : 0})</p>
                    <div className="cards-display">
                        {dealerHand.map((c, i) => <div key={i} className="card">{c}</div>)}
                    </div>
                </div>

                <div className="status-msg">{message}</div>

                <div className="player-area-horizontal">
                    {hands.map((hand, i) => (
                        <div key={i} className={`hand-section ${i === activeHandIndex && gameState === 'playing' ? 'active-hand' : ''}`}>
                            <p className="label">HAND {i + 1} ({calculateScore(hand)})</p>
                            <div className="cards-display">
                                {hand.map((card, j) => <div key={j} className="card">{card}</div>)}
                            </div>
                            <p className="bet-tag">{bets[i]} kr</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="controls-desktop">
                {gameState === 'playing' ? (
                    <>
                        <button className="action-btn hit" onClick={hit}>HIT</button>
                        <button className="action-btn stand" onClick={stand}>STAND</button>

                        {hands[activeHandIndex].length === 2 && (
                            <button className="action-btn double" onClick={doubleDown}>DOUBLE</button>
                        )}
                        
                        {hands.length === 1 && hands[0].length === 2 && hands[0][0] === hands[0][1] && (
                            <button className="action-btn split" onClick={split}>SPLIT</button>
                        )}
                    </>
                ) : (
                    <button className="play-button" onClick={startGame}>SPELA (500 kr)</button>
                )}
            </div>
        </div>
    );
};

export default BlackjackPage;