import { useState } from 'react';
import LoginPage from './components/LoginPage';
import CasinoPage from './components/CasinoPage';
import BlackjackPage from './components/BlackjackPage';
import './App.css';


type Page = 'login' | 'lobby' | 'blackjack';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('login');


    const handleLogin = () => setCurrentPage('lobby');
    const handleLogout = () => setCurrentPage('login');
    const goToBlackjack = () => setCurrentPage('blackjack');
    const goToLobby = () => setCurrentPage('lobby');

    return (
        <div className="App">
            {/* Visa Login om vi är i login-läge */}
            {currentPage === 'login' && (
                <LoginPage onLogin={handleLogin} />
            )}

            {/* Visa Lobbyn (Hilal Ninja) */}
            {currentPage === 'lobby' && (
                <CasinoPage
                    onLogout={handleLogout}
                    onPlayBlackjack={goToBlackjack}
                />
            )}

            {/* Visa Blackjack-spelet */}
            {currentPage === 'blackjack' && (
                <div style={{ width: '100%' }}>
                    <button
                        onClick={goToLobby}
                        className="logout-btn"
                        style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', color: '#adff2f', border: '1px solid #adff2f', padding: '5px 10px', borderRadius: '5px' }}
                    >
                        ← TILLBAKA TILL LOBBYN
                    </button>
                    <BlackjackPage />
                </div>
            )}
        </div>
    );
}

export default App;