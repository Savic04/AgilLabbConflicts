import React from 'react';
import './CasinoPage.css';

interface CasinoPageProps {
    balance: number;
    onLogout: () => void;
    onPlayBlackjack: () => void;
}

const CasinoPage: React.FC<CasinoPageProps> = ({ balance, onLogout, onPlayBlackjack }) => {
    return (
        <div className="casino-container">
            <div className="casino-card">
                <h1 className="casino-header">HILAL NINJA</h1>
                <p style={{ color: '#8a949d', fontSize: '0.9rem' }}>SPORTSBOOK & CASINO</p>

                <div className="balance-display">
                    <span className="balance-label">Tillgängligt saldo</span>
                    <div className="balance-amount">{balance.toLocaleString()} kr</div>
                </div>

                <button className="play-button" onClick={onPlayBlackjack}>
                    SPELA BLACKJACK
                </button>

                <button onClick={onLogout} className="logout-btn">
                    Logga ut från Hilals Ninja
                </button>
            </div>
        </div>
    );
};

export default CasinoPage;