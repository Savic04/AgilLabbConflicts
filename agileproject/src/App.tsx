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
            )}
        </div>
    );
}

export default App;
