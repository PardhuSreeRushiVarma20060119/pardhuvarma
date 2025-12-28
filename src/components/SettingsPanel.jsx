import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const SettingsPanel = ({ onClose }) => {
    const { settings, updateSettings } = useData();
    const [localSettings, setLocalSettings] = useState(settings);

    // Sync local state when open
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleChange = (field, value) => {
        setLocalSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        updateSettings(localSettings);
        onClose();
    };

    const colors = [
        '#00ff41', // Matrix Green
        '#00d4ff', // Cyan
        '#ff4444', // Red
        '#ffcc00', // Yellow
        '#bd00ff', // Purple
        '#ffffff'  // White
    ];

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: '#111', border: '1px solid #333', width: '400px',
                padding: '2rem', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <h3 style={{ margin: '0 0 2rem 0', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Site Settings</h3>

                {/* Site Title */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }} className="mono">SITE TITLE</label>
                    <input
                        value={localSettings.siteTitle}
                        onChange={e => handleChange('siteTitle', e.target.value)}
                        style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', fontSize: '1rem' }}
                    />
                </div>

                {/* Accent Color */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }} className="mono">ACCENT COLOR</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {colors.map(c => (
                            <div
                                key={c}
                                onClick={() => handleChange('accentColor', c)}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: c, cursor: 'pointer',
                                    border: localSettings.accentColor === c ? '2px solid white' : '2px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Animations Toggle */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={localSettings.enableAnimations}
                            onChange={e => handleChange('enableAnimations', e.target.checked)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <span style={{ color: 'white' }}>Enable Dynamic Background (Three.js)</span>
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleSave} style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}>Save Settings</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
