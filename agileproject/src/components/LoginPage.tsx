// LoginPage.tsx - Version B (Klistra in denna på en annan branch)
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
                {/* KONFLIKT HÄR: Annan rubrik */}
                <h2>Välkommen till TaskManager</h2>

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
                        placeholder="E-post"
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
                    Kör igång!
                </button>
            </form>
        </div>
    );
};

export default LoginPage;