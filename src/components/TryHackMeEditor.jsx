import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const TryHackMeEditor = ({ onClose }) => {
    const { data, updateTryHackMe } = useData();
    // Initialize with existing data or defaults
    const [stats, setStats] = useState(data.tryHackMe || {
        username: '', rank: '', roomsCompleted: 0, badges: 0,
        skills: {}, history: [], isVisible: true
    });

    const handleChange = (field, value) => {
        setStats(prev => ({ ...prev, [field]: value }));
    };

    const handleSkillChange = (skill, value) => {
        setStats(prev => ({
            ...prev,
            skills: { ...prev.skills, [skill]: parseInt(value) || 0 }
        }));
    };

    const addSkill = () => {
        const name = prompt("Enter Skill Name (e.g. Active Directory)");
        if (name) handleSkillChange(name, 0);
    };

    const save = () => {
        updateTryHackMe(stats);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{
                background: '#111', border: '1px solid #333', width: '600px', maxHeight: '90vh',
                overflowY: 'auto', borderRadius: '12px', padding: '2rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', margin: 0 }}>TryHackMe Stats</h2>
                    <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" checked={stats.isVisible} onChange={e => handleChange('isVisible', e.target.checked)} />
                        Section Visible
                    </label>
                </div>

                {/* Main Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                        <label className="mono" style={{ fontSize: '0.7rem', color: '#666' }}>USERNAME</label>
                        <input
                            value={stats.username} onChange={e => handleChange('username', e.target.value)}
                            style={{ width: '100%', background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem' }}
                        />
                    </div>
                    <div>
                        <label className="mono" style={{ fontSize: '0.7rem', color: '#666' }}>RANK</label>
                        <input
                            value={stats.rank} onChange={e => handleChange('rank', e.target.value)}
                            style={{ width: '100%', background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem' }}
                        />
                    </div>
                    <div>
                        <label className="mono" style={{ fontSize: '0.7rem', color: '#666' }}>ROOMS COMPLETED</label>
                        <input
                            type="number" value={stats.roomsCompleted} onChange={e => handleChange('roomsCompleted', parseInt(e.target.value))}
                            style={{ width: '100%', background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem' }}
                        />
                    </div>
                    <div>
                        <label className="mono" style={{ fontSize: '0.7rem', color: '#666' }}>BADGES</label>
                        <input
                            type="number" value={stats.badges} onChange={e => handleChange('badges', parseInt(e.target.value))}
                            style={{ width: '100%', background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem' }}
                        />
                    </div>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h4 className="mono" style={{ margin: 0, color: '#888' }}>SKILL DISTRIBUTION (Score 0-100)</h4>
                        <button onClick={addSkill} style={{ background: '#333', color: 'white', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer' }}>+ Add Skill</button>
                    </div>
                    {Object.entries(stats.skills || {}).map(([skill, val]) => (
                        <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '150px', fontSize: '0.9rem', color: '#ccc' }}>{skill}</span>
                            <input
                                type="range" min="0" max="100" value={val}
                                onChange={e => handleSkillChange(skill, e.target.value)}
                                style={{ flex: 1 }}
                            />
                            <span className="mono" style={{ width: '30px', textAlign: 'right' }}>{val}</span>
                            <button
                                onClick={() => {
                                    const newSkills = { ...stats.skills };
                                    delete newSkills[skill];
                                    handleChange('skills', newSkills);
                                }}
                                style={{ background: 'transparent', color: '#555', border: 'none', cursor: 'pointer' }}
                            >×</button>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button onClick={onClose} style={{ background: 'transparent', color: '#888', border: 'none', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={save} style={{ background: 'white', color: 'black', border: 'none', padding: '0.8rem 2rem', fontWeight: 600, cursor: 'pointer' }}>Save Database</button>
                </div>

                <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#444', textAlign: 'center' }}>
                    Note: TryHackMe does not offer a public API. <br />
                    Please manually sync your stats periodically or script a scraper.
                </p>
            </div>
        </div>
    );
};

export default TryHackMeEditor;
