import React from 'react';

const HistoryViewer = ({ history, onClose }) => {
    if (!history || history.length === 0) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
                zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} onClick={onClose}>
                <div style={{ background: '#111', padding: '2rem', border: '1px solid #333', color: '#888' }} onClick={e => e.stopPropagation()}>
                    No history recorded for this item.
                    <button onClick={onClose} style={{ display: 'block', marginTop: '1rem', background: 'transparent', border: '1px solid #333', color: 'white', padding: '0.5rem' }}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
            zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={onClose}>
            <div style={{
                width: '600px', maxWidth: '90vw', maxHeight: '80vh',
                background: '#0a0a0a', border: '1px solid #333',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                borderRadius: '8px',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                <div style={{ padding: '1rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111' }}>
                    <span className="mono" style={{ color: 'var(--accent-cyber)' }}>PROVENANCE CHAIN</span>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>✕</button>
                </div>

                <div style={{ padding: '2rem', overflowY: 'auto', flexGrow: 1 }}>
                    <div style={{ borderLeft: '1px solid #333', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                        {[...history].reverse().map((entry, i) => (
                            <div key={i} style={{ marginBottom: '2rem', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', left: '-1.85rem', top: '0.2rem',
                                    width: '10px', height: '10px', borderRadius: '50%',
                                    background: i === 0 ? 'var(--accent-cyber)' : '#333',
                                    border: '2px solid #0a0a0a'
                                }}></div>

                                <div className="mono" style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                                    {new Date(entry.timestamp).toLocaleString()}
                                </div>
                                <div style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>
                                    {entry.msg || "Update"}
                                </div>

                                {entry.snapshot && (
                                    <details style={{ marginTop: '0.5rem' }}>
                                        <summary style={{ fontSize: '0.8rem', color: '#444', cursor: 'pointer', outline: 'none' }}>View Snapshot Data</summary>
                                        <div style={{ marginTop: '0.5rem', background: '#111', padding: '1rem', borderRadius: '4px', overflowX: 'auto' }}>
                                            <pre style={{ fontSize: '0.7rem', margin: 0, color: '#aaa', fontFamily: 'var(--font-mono)' }}>
                                                {JSON.stringify(entry.snapshot, null, 2)}
                                            </pre>
                                        </div>
                                    </details>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryViewer;
