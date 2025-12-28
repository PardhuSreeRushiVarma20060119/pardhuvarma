import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const AssetManager = ({ onClose }) => {
    const { data, addAsset, deleteAsset } = useData();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (!name || !url) {
            setError('Both Name and URL are required.');
            return;
        }
        addAsset({ name, url, date: new Date().toLocaleDateString() });
        setName('');
        setUrl('');
        setError('');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(`![${name}](${text})`);
        alert('Markdown copied to clipboard!');
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: '#111', border: '1px solid #333', width: '600px',
                maxHeight: '80vh', display: 'flex', flexDirection: 'column',
                borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Asset Library</h3>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}>Close</button>
                </div>

                {/* Add New */}
                <div style={{ padding: '1.5rem', background: '#0a0a0a', borderBottom: '1px solid #222' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            value={name} onChange={e => setName(e.target.value)}
                            placeholder="Asset Name (e.g. Profile Pic)"
                            style={{ flex: 1, padding: '0.5rem', background: '#222', border: '1px solid #333', color: 'white' }}
                        />
                        <input
                            value={url} onChange={e => setUrl(e.target.value)}
                            placeholder="Image URL (https://...)"
                            style={{ flex: 2, padding: '0.5rem', background: '#222', border: '1px solid #333', color: 'white' }}
                        />
                    </div>
                    {error && <p style={{ color: 'red', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
                    <button
                        onClick={handleAdd}
                        style={{ width: '100%', background: 'white', color: 'black', padding: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                    >
                        + ADD ASSET TO LIBRARY
                    </button>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#666' }}>
                        * Note: Since this is a client-side demo, please host images externally (GitHub, Imgur) and paste URLs here.
                    </p>
                </div>

                {/* List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {(!data.assets || data.assets.length === 0) && (
                        <p style={{ color: '#444', textAlign: 'center' }}>No assets stored.</p>
                    )}
                    {(data.assets || []).map(asset => (
                        <div key={asset.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #222' }}>
                            <div style={{
                                width: '60px', height: '60px', background: '#222',
                                backgroundImage: `url(${asset.url})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                borderRadius: '4px'
                            }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{asset.name}</div>
                                <div style={{ fontSize: '0.7rem', color: '#666', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.url}</div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(asset.url)}
                                style={{ background: '#222', border: '1px solid #333', color: '#ccc', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.7rem' }}
                            >
                                Copy MD
                            </button>
                            <button
                                onClick={() => deleteAsset(asset.id)}
                                style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '1rem' }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssetManager;
