// src/App.tsx
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import CasinoPage from './components/CasinoPage';
import BlackjackPage from './components/BlackjackPage';
import './App.css';

type Page = 'login' | 'lobby' | 'blackjack';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('login');
    const [balance, setBalance] = useState<number>(10000);

    const updateBalance = (amount: number) => {
        setBalance(prev => prev + amount);
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
                />
            )}

            {currentPage === 'blackjack' && (
                <BlackjackPage
                    balance={balance}
                    onUpdateBalance={updateBalance}
                    onBack={() => setCurrentPage('lobby')}
                />
            )}
        </div>
    );
}

export default App;