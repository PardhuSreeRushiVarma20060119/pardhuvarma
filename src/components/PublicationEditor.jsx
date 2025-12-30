import React, { useState, useEffect } from 'react';

const PublicationEditor = ({ paper, onSave, onCancel, onDelete }) => {
    const [formData, setFormData] = useState({
        title: '',
        pinned: false,
        abstract: '',
        status: {
            stage: 'Preprint',
            artifact: 'Research Paper',
            confidence: 'Exploratory'
        },
        lineage: [],
        links: {},
        metadata: {
            venue: '',
            contribution: '',
            limitations: ''
        },
        note: '' // New entry for footer notes
    });

    useEffect(() => {
        if (paper) {
            // Merge defaults in case of legacy data
            setFormData({
                id: paper.id,
                title: paper.title || '',
                pinned: paper.pinned || false,
                abstract: paper.abstract || '',
                status: {
                    stage: paper.status?.stage || paper.status || 'Preprint',
                    artifact: paper.status?.artifact || 'Research Paper',
                    confidence: paper.status?.confidence || 'Exploratory'
                },
                lineage: paper.lineage || [],
                links: paper.links || {},
                metadata: {
                    venue: paper.metadata?.venue || '',
                    contribution: paper.metadata?.contribution || '',
                    limitations: paper.metadata?.limitations || ''
                },
                note: paper.note || ''
            });
        }
    }, [paper]);


    const updateStatus = (field, value) => {
        setFormData(prev => ({
            ...prev,
            status: { ...prev.status, [field]: value }
        }));
    };

    const updateMetadata = (field, value) => {
        setFormData(prev => ({
            ...prev,
            metadata: { ...prev.metadata, [field]: value }
        }));
    };

    // --- Lineage Management ---
    const addLineage = () => {
        setFormData(prev => ({
            ...prev,
            lineage: [...prev.lineage, { type: 'Builds on', title: 'New Reference', link: '#' }]
        }));
    };

    const updateLineage = (index, field, value) => {
        const newLineage = [...formData.lineage];
        newLineage[index] = { ...newLineage[index], [field]: value };
        setFormData(prev => ({ ...prev, lineage: newLineage }));
    };

    const removeLineage = (index) => {
        setFormData(prev => ({
            ...prev,
            lineage: prev.lineage.filter((_, i) => i !== index)
        }));
    };

    // --- Link Management ---
    const [newLinkKey, setNewLinkKey] = useState('pdf');
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const [newLinkStatus, setNewLinkStatus] = useState('available'); // available, planned, deprecated
    const [newLinkVisibility, setNewLinkVisibility] = useState('public'); // public, private

    const addLink = () => {
        if (newLinkUrl) {
            setFormData(prev => ({
                ...prev,
                links: {
                    ...prev.links,
                    [newLinkKey]: {
                        url: newLinkUrl,
                        status: newLinkStatus,
                        visibility: newLinkVisibility
                    }
                }
            }));
            setNewLinkUrl('');
            setNewLinkStatus('available');
            setNewLinkVisibility('public');
        }
    };

    const removeLink = (key) => {
        const newLinks = { ...formData.links };
        delete newLinks[key];
        setFormData(prev => ({ ...prev, links: newLinks }));
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: '#111', border: '1px solid #333',
                width: '90%', maxWidth: '800px', maxHeight: '90vh',
                display: 'flex', flexDirection: 'column',
                borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Publication Editor</h2>
                    {onDelete && paper?.id && (
                        <button onClick={() => { if (window.confirm("Delete this publication?")) onDelete(paper.id); }} style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            DELETE
                        </button>
                    )}
                </div>

                <div style={{ padding: '2rem', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Basic Info */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid #444' }}>
                        <input
                            title="Pin to top"
                            type="checkbox"
                            checked={formData.pinned}
                            onChange={e => setFormData({ ...formData, pinned: e.target.checked })}
                            style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer', accentColor: 'var(--accent-cyber)' }}
                        />
                        <input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Publication Title"
                            style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', color: 'white', padding: '0.5rem 0', width: '100%', flexGrow: 1 }}
                        />
                    </div>

                    <textarea
                        value={formData.abstract}
                        onChange={e => setFormData({ ...formData, abstract: e.target.value })}
                        placeholder="Abstract (1-2 paragraphs)..."
                        rows={5}
                        style={{ background: '#0a0a0a', border: '1px solid #333', color: '#ccc', padding: '1rem', width: '100%', fontFamily: 'inherit' }}
                    />

                    {/* Status Badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>STAGE</label>
                            <select value={formData.status.stage} onChange={e => updateStatus('stage', e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#222', color: 'white', border: '1px solid #333' }}>
                                <option>Preprint</option><option>Draft</option><option>Review</option><option>Archived</option><option>Research</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>ARTIFACT</label>
                            <select value={formData.status.artifact} onChange={e => updateStatus('artifact', e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#222', color: 'white', border: '1px solid #333' }}>
                                <option>Research Paper</option><option>Methodology</option><option>Position Paper</option><option>Technical Report</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>CONFIDENCE</label>
                            <select value={formData.status.confidence} onChange={e => updateStatus('confidence', e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#222', color: 'white', border: '1px solid #333' }}>
                                <option>Exploratory</option><option>Validated</option><option>Formalized</option><option>Prototype</option>
                            </select>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input value={formData.metadata.venue} onChange={e => updateMetadata('venue', e.target.value)} placeholder="Venue (Target/Published)" style={{ background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem' }} />
                        <input value={formData.metadata.contribution} onChange={e => updateMetadata('contribution', e.target.value)} placeholder="Contribution Type" style={{ background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem' }} />
                        <input value={formData.metadata.limitations} onChange={e => updateMetadata('limitations', e.target.value)} placeholder="Limitations" style={{ background: '#222', border: '1px solid #333', color: 'white', padding: '0.5rem', gridColumn: 'span 2' }} />
                        <input value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} placeholder="Footer Note (e.g., * v0.2 updates...)" style={{ background: '#222', border: '1px dashed #444', color: '#aaa', padding: '0.5rem', gridColumn: 'span 2', fontStyle: 'italic' }} />
                    </div>

                    {/* Links */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', borderBottom: '1px solid #333', paddingBottom: '0.2rem' }}>ARTIFACT LINKS</label>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                            {Object.entries(formData.links).map(([key, value]) => {
                                const url = typeof value === 'object' ? value.url : value;
                                const status = (typeof value === 'object' ? value.status : 'available') || 'available';
                                const visibility = (typeof value === 'object' ? value.visibility : 'public') || 'public';

                                return (
                                    <div key={key} style={{ background: '#222', border: '1px solid #333', padding: '0.3rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ color: '#aaa', textTransform: 'uppercase' }}>{key}</span>
                                        {status !== 'available' && <span style={{ fontSize: '0.6rem', color: 'yellow', border: '1px solid yellow', padding: '0 2px', borderRadius: '2px' }}>{status[0].toUpperCase()}</span>}
                                        {visibility === 'private' && <span style={{ fontSize: '0.6rem', color: 'red' }}>🔒</span>}
                                        <button onClick={() => removeLink(key)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>×</button>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <select value={newLinkKey} onChange={e => setNewLinkKey(e.target.value)} style={{ background: '#222', color: 'white', border: '1px solid #333', height: '32px' }}>
                                <option value="pdf">PDF</option><option value="code">Code</option><option value="experiments">Experiments</option><option value="figures">Figures</option><option value="notes">Notes</option>
                            </select>
                            <input value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} placeholder="URL..." style={{ flexGrow: 1, background: '#222', border: '1px solid #333', color: 'white', padding: '0 0.5rem', height: '32px' }} />

                            <select value={newLinkStatus} onChange={e => setNewLinkStatus(e.target.value)} style={{ background: '#222', color: '#aaa', border: '1px solid #333', fontSize: '0.8rem', height: '32px' }}>
                                <option value="available">Available</option>
                                <option value="planned">Planned</option>
                                <option value="deprecated">Deprecated</option>
                            </select>

                            <select value={newLinkVisibility} onChange={e => setNewLinkVisibility(e.target.value)} style={{ background: '#222', color: '#aaa', border: '1px solid #333', fontSize: '0.8rem', height: '32px' }}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>

                            <button onClick={addLink} style={{ background: '#333', color: 'white', border: 'none', padding: '0 1rem', height: '32px', cursor: 'pointer' }}>Add</button>
                        </div>
                    </div>

                    {/* Lineage */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', borderBottom: '1px solid #333', paddingBottom: '0.2rem' }}>LINEAGE (BUILDS ON)</label>
                        {formData.lineage.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <input value={item.title} onChange={e => updateLineage(i, 'title', e.target.value)} placeholder="Title" style={{ flexGrow: 1, background: '#222', border: '1px solid #333', color: 'white', padding: '0.4rem' }} />
                                <input value={item.link} onChange={e => updateLineage(i, 'link', e.target.value)} placeholder="Link (# or URL)" style={{ width: '30%', background: '#222', border: '1px solid #333', color: 'white', padding: '0.4rem' }} />
                                <button onClick={() => removeLineage(i)} style={{ color: '#666', background: 'transparent', border: 'none' }}>×</button>
                            </div>
                        ))}
                        <button onClick={addLineage} style={{ background: 'transparent', border: '1px dashed #444', color: '#888', width: '100%', padding: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>+ Add Lineage Reference</button>
                    </div>

                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={() => onSave(formData)} style={{ background: 'var(--accent-cyber)', color: 'black', border: 'none', padding: '0.8rem 2rem', fontWeight: 'bold', cursor: 'pointer' }}>SAVE CHANGES</button>
                </div>
            </div>
        </div>
    );
};

export default PublicationEditor;
