import React from 'react';
import './BettingPage.css';

const BettingPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="betting-container">
            <div className="betting-card">
                <h1 className="betting-header">PLACERA DITT SPEL</h1>
                <p className="betting-subtitle">Välj match och insats</p>

                <div className="match-list">
                    <div className="match-item">
                        <span className="match-teams">Han vs Hon</span>
                        <button className="odds-button">2.50</button>
                    </div>
                    <div className="match-item">
                        <span className="match-teams">Helder vs Anders</span>
                        <button className="odds-button">1.85</button>
                    </div>
                    <div className="match-item">
                        <span className="match-teams">Skolan City vs Nya lokal fc</span>
                        <button className="odds-button">3.20</button>
                    </div>
                </div>

                <button onClick={onBack} className="back-button">
                    Tillbaka
                </button>
            </div>
        </div>
    );
};

export default BettingPage;