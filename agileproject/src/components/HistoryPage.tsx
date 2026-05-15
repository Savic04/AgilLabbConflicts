import React from 'react';
import './HistoryPage.css';

interface SpelRad {
    spel: string;
    resultat: 'Vinst' | 'Förlust' | 'Push';
    belopp: number;
    tid: string;
}

interface HistoryPageProps {
    history: SpelRad[];
    onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onBack }) => {
    const totalResult = history.reduce((sum, rad) => sum + rad.belopp, 0);

    return (
        <div className="history-container">
            <div className="history-header">
                <h1 className="history-title">SPELHISTORIK</h1>
                <button className="history-back-btn" onClick={onBack}>← Tillbaka</button>
            </div>

            <div className="history-summary">
                <span>Totalt resultat:&nbsp;</span>
                <span className={totalResult >= 0 ? 'positive' : 'negative'}>
                    {totalResult >= 0 ? '+' : ''}{totalResult.toLocaleString()} kr
                </span>
            </div>

            {history.length === 0 ? (
                <p className="empty-text">Inga spel registrerade ännu</p>
            ) : (
                <div className="history-list">
                    {history.map((rad, i) => (
                        <div key={i} className="history-row">
                            <span className="history-game">{rad.spel}</span>
                            <span className={`history-result ${rad.resultat.toLowerCase()}`}>{rad.resultat}</span>
                            <span className={`history-amount ${rad.belopp >= 0 ? 'positive' : 'negative'}`}>
                                {rad.belopp >= 0 ? '+' : ''}{rad.belopp.toLocaleString()} kr
                            </span>
                            <span className="history-time">{rad.tid}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
