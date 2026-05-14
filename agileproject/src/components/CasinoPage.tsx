import React, { useState } from 'react';
import './CasinoPage.css';
import BettingPage from './BettingPage';

const CasinoPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [showBetting, setShowBetting] = useState<boolean>(false);

    // Om användaren klickat PLACERA SPEL, visa BettingPage
    if (showBetting) {
        return <BettingPage onBack={() => setShowBetting(false)} />;
    }

    return (
        <div className="casino-container">
            <div className="casino-card">
                <h1 className="casino-header">HILALS NINJA</h1>
                <p style={{ color: '#8a949d', fontSize: '0.9rem' }}>SPORTSBOOK & CASINO</p>

                <div className="balance-display">
                    <span className="balance-label">Tillgängligt saldo</span>
                    <div className="balance-amount">1 000 000,00 kr</div>
                </div>

                <button className="play-button" onClick={() => setShowBetting(true)}>
                    PLACERA SPEL
                </button>

                <button onClick={onLogout} className="logout-btn">
                    Logga ut från Hilals Ninja
                </button>
            </div>
        </div>
    );
};

export default CasinoPage;