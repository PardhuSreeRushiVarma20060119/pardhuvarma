import React, { useState } from 'react';

const NoteEditor = ({ note = {}, onSave, onCancel }) => {
    const [text, setText] = useState(note.text || '');

    const handleSave = () => {
        onSave({
            ...note,
            text
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
                borderRadius: '12px', width: '700px', maxWidth: '95vw',
                height: '70vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ color: '#d00' }}>PRIVATE NOTE (ADMIN ONLY)</span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                        <button onClick={handleSave} style={{ background: 'white', color: 'black', border: 'none', padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', borderRadius: '4px' }}>
                            Save Note
                        </button>
                    </div>
                </div>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <textarea
                        value={text} onChange={e => setText(e.target.value)}
                        placeholder="Write something private..."
                        style={{
                            flexGrow: 1, background: '#0a0a0a', border: '1px solid #222',
                            color: '#ccc', padding: '2rem', borderRadius: '8px',
                            fontSize: '1.2rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6,
                            resize: 'none', outline: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
