import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ReflectionEditor from './ReflectionEditor';
import IdeaEditor from './IdeaEditor';
import NoteEditor from './NoteEditor';

const ThinkingSection = () => {
    const {
        data,
        addReflection, deleteReflection, updateReflection,
        addIdea, deleteIdea, updateIdea, toggleIdeaVisibility,
        addPrivateNote, deletePrivateNote, updatePrivateNote
    } = useData();
    const { isAdmin, adminMode } = useAuth();

    const [editingReflection, setEditingReflection] = useState(null);
    const [editingIdea, setEditingIdea] = useState(null);
    const [editingNote, setEditingNote] = useState(null);

    return (
        <section id="second-brain" style={{ marginBottom: '6rem' }}>
            <SectionHeading>06. Second Brain</SectionHeading>

            {/* Reflection Editor Modal */}
            {editingReflection && (
                <ReflectionEditor
                    reflection={editingReflection}
                    onCancel={() => setEditingReflection(null)}
                    onSave={(ref) => {
                        if (ref.id) updateReflection(ref);
                        else addReflection(ref);
                        setEditingReflection(null);
                    }}
                />
            )}

            {/* Idea Editor Modal */}
            {editingIdea && (
                <IdeaEditor
                    idea={editingIdea}
                    onCancel={() => setEditingIdea(null)}
                    onSave={(idea) => {
                        if (idea.id) updateIdea(idea);
                        else addIdea(idea); // Note: addIdea in DataContext handles object input now? Yes I updated it.
                        setEditingIdea(null);
                    }}
                />
            )}

            {/* Private Note Editor Modal */}
            {editingNote && (
                <NoteEditor
                    note={editingNote}
                    onCancel={() => setEditingNote(null)}
                    onSave={(note) => {
                        if (note.id) updatePrivateNote(note);
                        else addPrivateNote(note.text);
                        setEditingNote(null);
                    }}
                />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* 1. INTELLECTUAL CHANGELOG */}
                <div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="mono" style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>INTELLECTUAL CHANGELOG</h3>
                        {(isAdmin && adminMode) && (
                            <button onClick={() => setEditingReflection({})} style={{ background: 'transparent', border: '1px solid #444', color: 'white', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem 0.8rem' }}>
                                + LOG CHANGE
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {data.reflections && data.reflections.map((ref, i) => (
                            <div key={ref.id || i} style={{ position: 'relative' }}>
                                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyber)', marginBottom: '0.3rem' }}>
                                    {ref.date} — {ref.topic}
                                    {(isAdmin && adminMode) && (
                                        <button onClick={() => setEditingReflection(ref)} style={{ marginLeft: '1rem', background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.7rem' }}>EDIT</button>
                                    )}
                                </div>
                                <p style={{ color: '#ccc', lineHeight: 1.5, fontSize: '0.95rem' }}>
                                    {ref.thought}
                                </p>
                                {(isAdmin && adminMode) && (
                                    <button
                                        onClick={() => { if (window.confirm('Delete?')) deleteReflection(ref.id); }}
                                        style={{ position: 'absolute', top: 0, right: 0, background: 'transparent', border: 'none', color: '#444', cursor: 'pointer' }}
                                    >x</button>
                                )}
                            </div>
                        ))}
                        {(!data.reflections || data.reflections.length === 0) && (
                            <div style={{ color: '#444', fontStyle: 'italic' }}>No logs yet.</div>
                        )}
                    </div>
                </div>

                {/* 2. IDEA PARKING LOT */}
                <div>
                    <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="mono" style={{ fontSize: '0.9rem', color: '#888', margin: 0 }}>IDEA PARKING LOT</h3>
                        {(isAdmin && adminMode) && (
                            <button onClick={() => setEditingIdea({})} style={{ background: 'transparent', border: '1px solid #444', color: 'white', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem 0.8rem' }}>
                                + PARK IDEA
                            </button>
                        )}
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {data.ideas && data.ideas
                            .filter(idea => (isAdmin && adminMode) ? true : !idea.isPrivate)
                            .map((idea, i) => (
                                <li key={idea.id || i} style={{ marginBottom: '1rem', borderLeft: '2px solid #333', paddingLeft: '1rem', position: 'relative' }}>
                                    <div style={{ color: '#ccc', fontSize: '1rem' }}>
                                        {idea.text}
                                        {(isAdmin && adminMode) && (
                                            <button onClick={() => setEditingIdea(idea)} style={{ marginLeft: '0.5rem', background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '0.7rem' }}>✎</button>
                                        )}
                                    </div>

                                    {(isAdmin && adminMode) && (
                                        <div style={{ marginTop: '0.3rem', display: 'flex', gap: '1rem', fontSize: '0.7rem' }}>
                                            <span style={{ color: idea.isPrivate ? '#d00' : 'var(--accent-cyber)' }}>
                                                {idea.isPrivate ? '[PRIVATE]' : '[PUBLIC]'}
                                            </span>
                                            <button
                                                onClick={() => { if (window.confirm('Delete?')) deleteIdea(idea.id); }}
                                                style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                    {data.ideas && data.ideas.filter(idea => (isAdmin && adminMode) ? true : !idea.isPrivate).length === 0 && (
                        <div style={{ color: '#444', fontStyle: 'italic' }}>Empty.</div>
                    )}
                </div>

                {/* 3. PRIVATE NOTES (Admin Only) */}
                {(isAdmin && adminMode) && (
                    <div>
                        <div style={{ borderBottom: '1px solid #d00', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="mono" style={{ fontSize: '0.9rem', color: '#d00', margin: 0, fontWeight: 'bold' }}>PRIVATE NOTES</h3>
                            <button onClick={() => setEditingNote({})} style={{ background: 'transparent', border: '1px solid #d00', color: '#d00', cursor: 'pointer', fontSize: '0.8rem', padding: '0.2rem 0.8rem' }}>
                                + PRIVATE NOTE
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {data.privateNotes && data.privateNotes.map((note, i) => (
                                <div key={note.id || i} style={{
                                    background: '#080808', border: '1px dashed #331100', padding: '1rem', borderRadius: '4px',
                                    position: 'relative'
                                }}>
                                    <div style={{ color: '#aaa', fontSize: '0.9rem', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>
                                        {note.text}
                                    </div>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', fontSize: '0.7rem' }}>
                                        <span style={{ marginRight: 'auto', color: '#444' }}>{note.date}</span>
                                        <button onClick={() => setEditingNote(note)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>EDIT</button>
                                        <button onClick={() => { if (window.confirm('Delete private note?')) deletePrivateNote(note.id); }} style={{ background: 'transparent', border: 'none', color: '#d00', cursor: 'pointer' }}>DELETE</button>
                                    </div>
                                </div>
                            ))}
                            {(!data.privateNotes || data.privateNotes.length === 0) && (
                                <div style={{ color: '#444', fontStyle: 'italic' }}>No private notes.</div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ThinkingSection;
