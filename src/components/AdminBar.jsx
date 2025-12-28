import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AssetManager from './AssetManager';
import SettingsPanel from './SettingsPanel';
import TryHackMeEditor from './TryHackMeEditor';
import SecurityModal from './SecurityModal';

const AdminBar = () => {
    const { isAdmin, adminMode, logout, toggleAdminMode } = useAuth();
    const navigate = useNavigate();
    const [showAssets, setShowAssets] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showTHM, setShowTHM] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);

    // Glossy Login Button for Public View
    if (!isAdmin) {
        return (
            <button
                onClick={() => navigate('/login')}
                style={{
                    position: 'fixed', bottom: '2rem', right: '2rem',
                    width: '50px', height: '50px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    cursor: 'pointer', zIndex: 9999,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    color: 'rgba(255,255,255,0.4)'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255,255,255,0.1)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                }}
                title="Researcher Login"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            </button>
        );
    }

    // Admin Toolbar (When Logged In)
    return (
        <>
            {showAssets && <AssetManager onClose={() => setShowAssets(false)} />}
            {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
            {showTHM && <TryHackMeEditor onClose={() => setShowTHM(false)} />}
            {showSecurity && <SecurityModal onClose={() => setShowSecurity(false)} />}

            <div style={{
                position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(10,10,10,0.8)', border: '1px solid #333',
                padding: '0.6rem 1.2rem', borderRadius: '50px',
                display: 'flex', gap: '1.5rem', alignItems: 'center', zIndex: 999,
                backdropFilter: 'blur(12px)', boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff41', boxShadow: '0 0 10px #00ff41' }} />
                    <span className="mono" style={{ fontSize: '0.75rem', color: '#fff', letterSpacing: '0.05em' }}>ADMIN_SYSTEM</span>
                </div>

                <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{
                        width: '32px', height: '18px', background: adminMode ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
                        borderRadius: '20px', position: 'relative', transition: 'background 0.3s'
                    }}>
                        <div style={{
                            width: '14px', height: '14px', background: 'black', borderRadius: '50%',
                            position: 'absolute', top: '2px', left: adminMode ? '16px' : '2px',
                            transition: 'left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                        }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: adminMode ? 'white' : '#666', transition: 'color 0.3s' }}>
                        EDIT MODE
                    </span>
                    <input type="checkbox" checked={adminMode} onChange={toggleAdminMode} style={{ display: 'none' }} />
                </label>

                <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />

                <button
                    onClick={() => setShowAssets(true)}
                    style={{ background: 'transparent', border: 'none', color: '#ccc', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                    MEDIA
                </button>

                <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />

                <button
                    onClick={() => setShowTHM(true)}
                    style={{ background: 'transparent', border: 'none', color: '#ccc', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                    STATS
                </button>

                <button
                    onClick={() => setShowSettings(true)}
                    style={{ background: 'transparent', border: 'none', color: '#ccc', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                    SETTINGS
                </button>

                <button
                    onClick={() => setShowSecurity(true)}
                    style={{ background: 'transparent', border: 'none', color: '#00ccff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                >
                    SECURITY
                </button>

                <div style={{ height: '20px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />

                <button
                    onClick={logout}
                    style={{ background: 'transparent', border: 'none', color: '#ff4444', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, letterSpacing: '0.05em' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6666'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ff4444'}
                >
                    EXIT
                </button>
            </div>
        </>
    );
};

export default AdminBar;
