import React from 'react';
import './BettingPage.css';

const BettingPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="betting-container">
            <div className="betting-card">
                <h1 className="betting-header">PLACERA DITT SPEL här idag nu förfan</h1>
                <p className="betting-subtitle">Välj match och insats, betta mycket</p>

                <div className="match-list">
                    <div className="match-item">
                        <span className="match-teams">AIK vs Hammarby</span>
                        <button className="odds-button">2.5M</button>
                    </div>
                    <div className="match-item">
                        <span className="match-teams">Real Madrid vs Barcelona</span>
                        <button className="odds-button">1.85K</button>
                    </div>
                    <div className="match-item">
                        <span className="match-teams">Manchester City vs Liverpool</span>
                        <button className="odds-button">3.2M</button>
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