import React, { useState } from 'react';
import HistoryViewer from './HistoryViewer';

const ProjectEditor = ({ project = {}, onSave, onCancel, onDelete }) => {
    const [title, setTitle] = useState(project.title || '');
    const [description, setDescription] = useState(project.description || '');
    const [tech, setTech] = useState(project.tech || '');
    const [status, setStatus] = useState(project.status || 'Research');
    const [link, setLink] = useState(project.link || '#');
    const [showHistory, setShowHistory] = useState(false);

    const handleSave = () => {
        onSave({
            id: project.id,
            title,
            description,
            tech,
            status,
            link
        });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {showHistory && <HistoryViewer history={project.history} onClose={() => setShowHistory(false)} />}

            <div style={{
                background: '#111', border: '1px solid #333', padding: '2rem',
                borderRadius: '12px', width: '500px', maxWidth: '90vw',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                        <span className="mono" style={{ color: '#666', fontSize: '0.8rem' }}>PROJECT METADATA</span>
                        {project.id && (
                            <button
                                onClick={() => setShowHistory(true)}
                                className="mono"
                                style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyber)', fontSize: '0.7rem', cursor: 'pointer' }}
                            >
                                HIST
                            </button>
                        )}
                    </div>
                    {project.id && (
                        <button
                            onClick={() => {
                                if (window.confirm('Delete this project?')) onDelete(project.id);
                            }}
                            style={{ color: '#ff4444', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                            DELETE
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        value={title} onChange={e => setTitle(e.target.value)}
                        placeholder="Project Title"
                        style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-serif)', padding: '0.5rem 0', outline: 'none' }}
                    />

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            value={status} onChange={e => setStatus(e.target.value)}
                            placeholder="Status (e.g. Research)"
                            style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '0.8rem', borderRadius: '6px', fontSize: '0.9rem' }}
                        />
                        <input
                            value={tech} onChange={e => setTech(e.target.value)}
                            placeholder="Tech Stack"
                            style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '0.8rem', borderRadius: '6px', fontSize: '0.9rem' }}
                        />
                    </div>

                    <textarea
                        value={description} onChange={e => setDescription(e.target.value)}
                        placeholder="Project description..."
                        rows={4}
                        style={{ background: '#1a1a1a', border: '1px solid #333', color: '#ccc', padding: '1rem', borderRadius: '6px', fontSize: '0.95rem', fontFamily: 'var(--font-sans)', resize: 'none', lineHeight: 1.6 }}
                    />

                    <input
                        value={link} onChange={e => setLink(e.target.value)}
                        placeholder="Project Link / GitHub URL"
                        style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: 'var(--accent-cyber)', padding: '0.5rem 0', fontSize: '0.9rem', outline: 'none' }}
                    />
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleSave} style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Save Project</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectEditor;
