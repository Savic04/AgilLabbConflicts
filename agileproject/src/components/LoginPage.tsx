import React, { useState } from 'react';
import './LoginPage.css';

// 1. Vi definierar att vi förväntar oss onLogin från App.tsx
interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 2. Kontrollera uppgifterna
        if (username === 'admin' && password === '123') {
            setError('');
            console.log("Inloggning lyckades!");

            // 3. ISTÄLLET för setIsLoggedIn(true), anropar vi onLogin()
            // Detta säger till App.tsx att byta sida till Lobbyn
            onLogin();
        } else {
            setError('Fel användarnamn eller lösenord!');
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <h2 className="casino-header" style={{ fontSize: '1.8rem' }}>HILAL NINJA</h2>
                <p style={{ marginBottom: '20px', color: '#8a949d' }}>Logga in till systemet</p>

                {error && <p style={{ color: '#ff4444', fontWeight: 'bold', marginBottom: '10px' }}>{error}</p>}

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