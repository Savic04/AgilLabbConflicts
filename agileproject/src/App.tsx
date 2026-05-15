// src/App.tsx
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import CasinoPage from './components/CasinoPage';
import BlackjackPage from './components/BlackjackPage';
import HistoryPage from './components/HistoryPage';
import './App.css';

type Page = 'login' | 'lobby' | 'blackjack' | 'history';

interface SpelRad {
    spel: string;
    resultat: 'Vinst' | 'Förlust' | 'Push';
    belopp: number;
    tid: string;
}
type Page = 'login' | 'lobby' | 'blackjack' | 'deposit';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('login');
    const [balance, setBalance] = useState<number>(10000);
    const [spelHistorik, setSpelHistorik] = useState<SpelRad[]>([]);

    const updateBalance = (amount: number) => {
        setBalance(prev => prev + amount);
    };

    const laggTillHistorik = (rad: SpelRad) => {
        setSpelHistorik(prev => [rad, ...prev]);
    };

    console.log('spelhistorik:', spelHistorik.length, 'rader');

    const handleDeposit = (amount: number) => {
        setBalance(prev => prev + amount);
        setCurrentPage('lobby');
    };

    return (
        <div className="App">
            {currentPage === 'login' && (
                <LoginPage onLogin={() => setCurrentPage('lobby')} />
            )}

            {currentPage === 'lobby' && (
                <CasinoPage
                    balance={balance}
                    onLogout={() => setCurrentPage('login')}
                    onPlayBlackjack={() => setCurrentPage('blackjack')}
                    onViewHistory={() => setCurrentPage('history')}
                    onDeposit={() => setCurrentPage('deposit')}
                />
            )}

            {currentPage === 'blackjack' && (
                <BlackjackPage
                    balance={balance}
                    onUpdateBalance={updateBalance}
                    onBack={() => setCurrentPage('lobby')}
                />
            )}

            {currentPage === 'history' && (
                <HistoryPage
                    history={spelHistorik}
                    onBack={() => setCurrentPage('lobby')}
                />
            {currentPage === 'deposit' && (
                <div style={{ minHeight: '100vh', background: '#0b0d0f', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: '#1a1f24', padding: '40px', borderRadius: '12px', textAlign: 'center', minWidth: '340px' }}>
                        <h2 style={{ color: '#adff2f', marginBottom: '20px' }}>SÄTT IN PENGAR</h2>
                        {[500, 1000, 2500, 5000].map(amt => (
                            <button key={amt} onClick={() => handleDeposit(amt)} style={{ display: 'block', width: '100%', margin: '8px 0', padding: '14px', background: '#adff2f', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
                                + {amt.toLocaleString()} kr
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage('lobby')} style={{ marginTop: '16px', background: 'transparent', color: '#888', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                            Avbryt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
