import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login-försök:", { email, password, name });
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <h2>Välkommen hit igen</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Namn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder="E-postadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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