import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === '123') {
            onLogin();
        } else {
            setError('Fel användarnamn eller lösenord!');
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1 className="casino-header" style={{ fontSize: '2rem' }}>HILAL NINJA</h1>
                <p style={{ color: '#8a949d', marginBottom: '20px' }}>Logga in till systemet</p>

                {error && <p style={{ color: '#ff4444', fontWeight: 'bold' }}>{error}</p>}

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
                <button type="submit" className="login-button">LOGGA IN</button>
            </form>
        </div>
    );
};

export default LoginPage;