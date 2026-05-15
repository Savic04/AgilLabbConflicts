import React, { useState, useRef } from 'react';
import './DicePage.css';

interface DicePageProps {
    balance: number;
    onUpdateBalance: (amount: number) => void;
    onBack: () => void;
}

const DicePage: React.FC<DicePageProps> = ({ balance, onUpdateBalance, onBack }) => {
    const [target, setTarget] = useState(50);
    const [mode, setMode] = useState<'over' | 'under'>('over');
    const [betAmount, setBetAmount] = useState(100);
    const [rolling, setRolling] = useState(false);
    const [displayRoll, setDisplayRoll] = useState<number | null>(null);
    const [lastWon, setLastWon] = useState<boolean | null>(null);
    const [rollHistory, setRollHistory] = useState<{ roll: number; won: boolean }[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const winChance = mode === 'over' ? (100 - target) : (target - 1);
    const multiplier = winChance > 0 ? Math.floor((99 / winChance) * 10000) / 10000 : 0;
    const potentialPayout = Math.floor(betAmount * multiplier);

    const handleRoll = () => {
        if (rolling) return;
        if (betAmount < 1) return;
        if (betAmount > balance) {
            alert('Inte tillräckligt saldo!');
            return;
        }

        onUpdateBalance(-betAmount);
        setRolling(true);
        setLastWon(null);

        const finalRoll = Math.floor(Math.random() * 100) + 1;
        let tick = 0;
        const totalTicks = 14;

        intervalRef.current = setInterval(() => {
            setDisplayRoll(Math.floor(Math.random() * 100) + 1);
            tick++;
            if (tick >= totalTicks) {
                clearInterval(intervalRef.current!);
                setDisplayRoll(finalRoll);
                const won = mode === 'over' ? finalRoll > target : finalRoll < target;
                setLastWon(won);
                setRolling(false);
                if (won) {
                    onUpdateBalance(potentialPayout);
                }
                setRollHistory(prev => [{ roll: finalRoll, won }, ...prev].slice(0, 12));
            }
        }, 55);
    };

    const handleTargetChange = (val: number) => {
        setTarget(val);
        setLastWon(null);
        setDisplayRoll(null);
    };

    const handleModeSwitch = (m: 'over' | 'under') => {
        setMode(m);
        setLastWon(null);
        setDisplayRoll(null);
    };

    const winZoneWidth = winChance;
    const loseZoneWidth = 100 - winChance;

    return (
        <div className="dice-container">
            <div className="dice-header">
                <button className="dice-back-btn" onClick={onBack}>← TILLBAKA</button>
                <div className="dice-balance-box">SALDO: {balance.toLocaleString()} kr</div>
            </div>

            <div className="dice-card">
                <h2 className="dice-game-title">DICE</h2>

                {/* Resultatruta */}
                <div className={`dice-result-area ${lastWon === true ? 'result-win' : lastWon === false ? 'result-lose' : ''}`}>
                    <span className="result-number">
                        {displayRoll !== null ? String(displayRoll).padStart(2, '0') : '—'}
                    </span>
                    {lastWon !== null && !rolling && (
                        <span className="result-verdict">{lastWon ? '✓ VANN!' : '✗ FÖRLORADE'}</span>
                    )}
                </div>

                {/* Slider-sektion */}
                <div className="slider-section">
                    <div className="slider-labels">
                        <span className="label-muted">1</span>
                        <span className="label-target">
                            {mode === 'over' ? `OVER ${target}` : `UNDER ${target}`}
                        </span>
                        <span className="label-muted">100</span>
                    </div>

                    <input
                        type="range"
                        className="dice-slider"
                        min={2}
                        max={98}
                        value={target}
                        onChange={e => handleTargetChange(Number(e.target.value))}
                    />

                    {/* Färgfält under slidern */}
                    <div className="dice-track">
                        {mode === 'over' ? (
                            <>
                                <div className="track-lose" style={{ width: `${loseZoneWidth}%` }} />
                                <div className="track-win" style={{ width: `${winZoneWidth}%` }} />
                            </>
                        ) : (
                            <>
                                <div className="track-win" style={{ width: `${winZoneWidth}%` }} />
                                <div className="track-lose" style={{ width: `${loseZoneWidth}%` }} />
                            </>
                        )}
                    </div>
                </div>

                {/* Statistik */}
                <div className="dice-stats-row">
                    <div className="dice-stat-box">
                        <span className="stat-label">Vinstchans</span>
                        <span className="stat-val">{winChance.toFixed(0)}%</span>
                    </div>
                    <div className="dice-stat-box">
                        <span className="stat-label">Multiplikator</span>
                        <span className="stat-val">{multiplier}×</span>
                    </div>
                    <div className="dice-stat-box">
                        <span className="stat-label">Möjlig vinst</span>
                        <span className="stat-val">{potentialPayout.toLocaleString()} kr</span>
                    </div>
                </div>

                {/* Over / Under */}
                <div className="mode-row">
                    <button
                        className={`mode-btn ${mode === 'under' ? 'mode-active' : ''}`}
                        onClick={() => handleModeSwitch('under')}
                    >
                        UNDER
                    </button>
                    <button
                        className={`mode-btn ${mode === 'over' ? 'mode-active' : ''}`}
                        onClick={() => handleModeSwitch('over')}
                    >
                        OVER
                    </button>
                </div>

                {/* Insats */}
                <div className="bet-section">
                    <span className="bet-label">Insats (kr)</span>
                    <div className="bet-row">
                        <input
                            type="number"
                            className="bet-input"
                            min={1}
                            value={betAmount}
                            onChange={e => setBetAmount(Math.max(1, Number(e.target.value)))}
                        />
                        <button className="quick-btn" onClick={() => setBetAmount(b => Math.max(1, Math.floor(b / 2)))}>½</button>
                        <button className="quick-btn" onClick={() => setBetAmount(b => b * 2)}>2×</button>
                        <button className="quick-btn" onClick={() => setBetAmount(Math.max(1, Math.floor(balance)))}>MAX</button>
                    </div>
                </div>

                <button
                    className={`roll-btn ${rolling ? 'roll-btn-busy' : ''}`}
                    onClick={handleRoll}
                    disabled={rolling}
                >
                    {rolling ? 'RULLAR...' : 'RULLA TÄRNING'}
                </button>

                {/* Historik */}
                {rollHistory.length > 0 && (
                    <div className="roll-history">
                        {rollHistory.map((r, i) => (
                            <span
                                key={i}
                                className={`hist-chip ${r.won ? 'chip-win' : 'chip-lose'}`}
                                title={`${r.roll}`}
                            >
                                {r.roll}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DicePage;
