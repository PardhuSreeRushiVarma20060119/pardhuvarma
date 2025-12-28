import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = ({ onClose }) => {
    const [pass, setPass] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(pass)) {
            onClose();
        } else {
            setError(true);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: '#111', border: '1px solid #333', padding: '2rem',
                borderRadius: '8px', minWidth: '300px'
            }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>System Access</h2>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter Access Key..."
                    style={{
                        width: '100%', padding: '0.8rem', background: '#000',
                        border: error ? '1px solid red' : '1px solid #333',
                        color: 'white', marginBottom: '1rem',
                        fontFamily: 'var(--font-mono)'
                    }}
                    autoFocus
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" style={{ background: 'white', color: 'black', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600 }}>Authenticate</button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
