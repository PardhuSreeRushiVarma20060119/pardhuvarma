import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [pass, setPass] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(pass)) {
            navigate('/'); // Redirect to Home on success
        } else {
            setError(true);
        }
    };

    return (
        <div style={{
            width: '100vw', height: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#050505', color: 'white'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: '#111', border: '1px solid #333', padding: '3rem',
                borderRadius: '8px', minWidth: '400px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div className="mono" style={{ color: '#666', marginBottom: '2rem', fontSize: '0.8rem', textAlign: 'center' }}>
                    RESTRICTED ACCESS
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', fontSize: '2rem', textAlign: 'center' }}>Identity Verification</h2>
                <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Enter your cryptographic signature key.
                </p>

                <input
                    type="password"
                    value={pass}
                    onChange={(e) => { setPass(e.target.value); setError(false); }}
                    placeholder="Enter Key..."
                    style={{
                        width: '100%', padding: '1rem', background: '#000',
                        border: error ? '1px solid red' : '1px solid #333',
                        color: 'white', marginBottom: '1.5rem',
                        fontFamily: 'var(--font-mono)', fontSize: '1rem',
                        outline: 'none'
                    }}
                    autoFocus
                />

                <button type="submit" style={{
                    width: '100%', background: 'white', color: 'black', border: 'none',
                    padding: '1rem', cursor: 'pointer', fontWeight: 600,
                    letterSpacing: '0.1em', fontSize: '0.9rem'
                }}>
                    AUTHENTICATE
                </button>

                {error && (
                    <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem' }} className="mono">
                        ACCESS DENIED: INVALID SIGNATURE
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
