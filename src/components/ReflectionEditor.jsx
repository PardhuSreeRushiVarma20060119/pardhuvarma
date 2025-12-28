import React, { useState } from 'react';

const ReflectionEditor = ({ reflection = {}, onSave, onCancel }) => {
    const [topic, setTopic] = useState(reflection.topic || '');
    const [thought, setThought] = useState(reflection.thought || '');

    const handleSave = () => {
        onSave({
            ...reflection,
            topic,
            thought
        });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(10px)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: '#111', border: '1px solid #333', padding: '3rem',
                borderRadius: '12px', width: '800px', maxWidth: '95vw',
                height: '80vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ color: '#666' }}>LOG REFLECTION</span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                        <button onClick={handleSave} style={{ background: 'white', color: 'black', border: 'none', padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', borderRadius: '4px' }}>
                            Save Log
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flexGrow: 1 }}>
                    <div>
                        <label className="mono" style={{ fontSize: '0.8rem', color: '#444', display: 'block', marginBottom: '0.5rem' }}>TOPIC</label>
                        <input
                            value={topic} onChange={e => setTopic(e.target.value)}
                            placeholder="e.g. AI Safety vs Acceleration"
                            style={{
                                background: 'transparent', border: 'none', borderBottom: '1px solid #333',
                                color: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-serif)',
                                padding: '0.5rem 0', outline: 'none', width: '100%'
                            }}
                        />
                    </div>

                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <label className="mono" style={{ fontSize: '0.8rem', color: '#444', display: 'block', marginBottom: '0.5rem' }}>THOUGHT PROCESS</label>
                        <textarea
                            value={thought} onChange={e => setThought(e.target.value)}
                            placeholder="I used to think X, but after observing Y, I realized Z..."
                            style={{
                                flexGrow: 1, background: '#0a0a0a', border: '1px solid #222',
                                color: '#ccc', padding: '1.5rem', borderRadius: '8px',
                                fontSize: '1.1rem', fontFamily: 'var(--font-main)', lineHeight: 1.6,
                                resize: 'none', outline: 'none'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReflectionEditor;
