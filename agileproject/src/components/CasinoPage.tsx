import React, { useState } from 'react';
import './CasinoPage.css';
import BettingPage from './BettingPage';

interface CasinoPageProps {
    balance: number;
    onLogout: () => void;
    onPlayBlackjack: () => void;
    onPlayDice: () => void;
    onPlaySlots: () => void;
    onDeposit: () => void;
}

const CasinoPage: React.FC<CasinoPageProps> = ({ balance, onLogout, onPlayBlackjack, onPlayDice, onPlaySlots, onDeposit }) => {
    const [showBetting, setShowBetting] = useState<boolean>(false);

    if (showBetting) {
        return <BettingPage onBack={() => setShowBetting(false)} />;
    }

    return (
        <div className="casino-container">
            <div className="casino-card">
                <h1 className="casino-header">HILAL NINJA</h1>
                <p style={{ color: '#8a949d', fontSize: '0.9rem' }}>SPORTSBOOK & CASINO</p>

                <div className="balance-display">
                    <span className="balance-label">Tillgängligt saldo</span>
                    <div className="balance-amount">{balance.toLocaleString()} kr</div>
                </div>

                <div className="lobby-grid">
                    <button className="lobby-card-btn" onClick={() => setShowBetting(true)}>
                        <span className="lobby-icon">⚽</span>
                        <span>SPORT</span>
                    </button>
                    <button className="lobby-card-btn" onClick={onPlayBlackjack}>
                        <span className="lobby-icon">🃏</span>
                        <span>BLACKJACK</span>
                    </button>
                    <button className="lobby-card-btn" onClick={onPlayDice}>
                        <span className="lobby-icon">🎲</span>
                        <span>DICE</span>
                    </button>
                    <button className="lobby-card-btn lobby-card-soon" onClick={onPlaySlots} disabled>
                        <span className="lobby-icon">🎰</span>
                        <span>SLOTS</span>
                        <span className="soon-tag">Snart</span>
                    </button>
                </div>

                <button className="deposit-btn" onClick={onDeposit}>
                    SÄTT IN PENGAR
                </button>

                <button onClick={onLogout} className="logout-btn">
                    Logga ut från Hilals Ninja
                </button>
            </div>
        </div>
    );
};

export default CasinoPage;
