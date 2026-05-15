import React, { useState } from 'react';
import './CasinoPage.css';
import BettingPage from './BettingPage';

interface CasinoPageProps {
    balance: number;
    onLogout: () => void;
    onPlayBlackjack: () => void;
onViewHistory: () => void;
    onDeposit: () => void;
}

const CasinoPage: React.FC<CasinoPageProps> = ({ balance, onLogout, onPlayBlackjack, onViewHistory, onDeposit }) => {
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

                <div className="game-buttons">
                    <button className="play-button" onClick={() => setShowBetting(true)}>
                        PLACERA SPEL
                    </button>

                    <button className="play-button" onClick={onPlayBlackjack} style={{ marginTop: '10px' }}>
                        BLACKJACK
                    </button>

                    <button className="history-btn" onClick={onViewHistory}>
                        SPELHISTORIK
                    </button>
                </div>

                <button className="play-button" onClick={onPlayBlackjack} style={{ marginTop: '10px' }}>
                    BLACKJACK
                </button>

                <button className="deposit-btn" onClick={onDeposit}>
                    SÄTT IN PENGAR
                </button>

                <p className="coming-soon-label">Poker & Slots – kommer snart</p>

                <button onClick={onLogout} className="logout-btn">
                    Logga ut från Hilals Ninja
                </button>
            </div>
        </div>
    );
};

export default CasinoPage;
