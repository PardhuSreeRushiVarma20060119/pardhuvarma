import React, { useState } from 'react';

const IdeaEditor = ({ idea = {}, onSave, onCancel }) => {
    const [text, setText] = useState(idea.text || '');
    const [isPrivate, setIsPrivate] = useState(idea.isPrivate !== undefined ? idea.isPrivate : true);

    const handleSave = () => {
        onSave({
            ...idea,
            text,
            isPrivate
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
                borderRadius: '12px', width: '600px', maxWidth: '95vw',
                minHeight: '400px', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ color: '#666' }}>NEW IDEA</span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                        <button onClick={handleSave} style={{ background: 'white', color: 'black', border: 'none', padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', borderRadius: '4px' }}>
                            Park Idea
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flexGrow: 1 }}>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <textarea
                            value={text} onChange={e => setText(e.target.value)}
                            placeholder="Describe your idea..."
                            style={{
                                flexGrow: 1, background: '#0a0a0a', border: '1px solid #222',
                                color: '#ccc', padding: '1.5rem', borderRadius: '8px',
                                fontSize: '1.1rem', fontFamily: 'var(--font-main)', lineHeight: 1.6,
                                resize: 'none', outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label className="mono" style={{ color: '#888', fontSize: '0.9rem' }}>VISIBILITY:</label>
                        <button
                            onClick={() => setIsPrivate(!isPrivate)}
                            style={{
                                background: isPrivate ? '#331100' : 'var(--accent-cyber)',
                                color: isPrivate ? 'white' : 'black',
                                border: isPrivate ? '1px solid #552200' : 'none',
                                padding: '0.3rem 1rem', borderRadius: '4px',
                                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
                            }}
                        >
                            {isPrivate ? 'PRIVATE' : 'PUBLIC'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaEditor;
