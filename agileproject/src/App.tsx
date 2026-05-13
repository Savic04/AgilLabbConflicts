import { useState } from 'react';
import LoginPage from './components/LoginPage';
import CasinoPage from './components/CasinoPage';
import BlackjackPage from './components/BlackjackPage';
import './App.css';

type Page = 'login' | 'lobby' | 'blackjack';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('login');
    const [balance, setBalance] = useState<number>(10000); // Startkapital

    const handleLogin = () => setCurrentPage('lobby');
    const handleLogout = () => setCurrentPage('login');
    const goToBlackjack = () => setCurrentPage('blackjack');
    const goToLobby = () => setCurrentPage('lobby');

    const updateBalance = (amount: number) => {
        setBalance(prev => prev + amount);
    };

    return (
        <div className="App">
            {currentPage === 'login' && (
                <LoginPage onLogin={handleLogin} />
            )}

            {currentPage === 'lobby' && (
                <CasinoPage
                    balance={balance}
                    onLogout={handleLogout}
                    onPlayBlackjack={goToBlackjack}
                />
            )}

            {currentPage === 'blackjack' && (
                <BlackjackPage
                    balance={balance}
                    onUpdateBalance={updateBalance}
                    onBack={goToLobby}
                />
            )}
        </div>
    );
}

export default App;