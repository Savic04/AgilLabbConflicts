import React, { useState } from 'react';
import './LoginPage.css';
import CasinoPage from './CasinoPage'; // Importera den nya komponenten

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Specifik logik för användarnamn och lösenord
        if (username === 'admin' && password === '123') {
            setIsLoggedIn(true);
            setError('');
            console.log("Inloggning lyckades!");
        } else {
            setError('Fel användarnamn eller lösenord!');
        }
    };

    // Om inloggad, visa Casino-sidan
    if (isLoggedIn) {
        return <CasinoPage onLogout={() => setIsLoggedIn(false)} />;
    }

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <h2>Välkommen hit igen</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>Logga in till Hilals system</p>

                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Användarnamn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Logga in
                </button>
            </form>
        </div>
    );
};

export default LoginPage;