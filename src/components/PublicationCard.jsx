import React, { useState } from 'react';

const StatusBadge = ({ label, type }) => {
    let color = 'var(--text-dim)';
    let border = '1px solid var(--border-subtle)';

    if (type === 'stage') {
        if (label === 'Preprint') color = '#00ff41'; // Cyber Green
        if (label === 'Draft') color = '#ffeb3b'; // Yellow
        if (label === 'Archived') color = '#666';
    } else if (type === 'confidence') {
        border = '1px dashed var(--border-subtle)';
        if (label === 'Validated') color = '#00ff41';
    }

    return (
        <span className="mono" style={{
            fontSize: '0.65rem',
            padding: '2px 6px',
            borderRadius: '4px',
            border: border,
            color: color,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }}>
            {label}
        </span>
    );
};

const ArtifactIcon = ({ type, link, isAdmin }) => {
    const icons = {
        pdf: "📄",
        code: "📦",
        experiments: "🧪",
        figures: "📊",
        notes: "🧠"
    };

    const isObject = typeof link === 'object';
    const url = isObject ? link.url : link;
    const status = isObject ? (link.status || 'available') : 'available'; // available, planned, deprecated
    const visibility = isObject ? (link.visibility || 'public') : 'public'; // public, private

    if (!url || url === '#') return null;

    // Private check
    if (visibility === 'private' && !isAdmin) return null;

    return (
        <a href={url} target="_blank" rel="noreferrer"
            title={`${type.toUpperCase()} (${status})`}
            style={{
                textDecoration: 'none',
                fontSize: '1rem',
                opacity: status === 'planned' ? 0.4 : 0.7,
                transition: 'opacity 0.2s',
                cursor: 'pointer',
                position: 'relative'
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = status === 'planned' ? 0.4 : 0.7}
        >
            {icons[type] || "🔗"}
            {status === 'deprecated' && (
                <span style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <div style={{ width: '100%', height: '2px', background: 'red', transform: 'rotate(-45deg)' }}></div>
                </span>
            )}
            {visibility === 'private' && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '0.5rem' }}>🔒</span>
            )}
        </a>
    );
};

const PublicationCard = ({ paper, isAdmin, adminMode, onEdit, onMove, isFirst, isLast }) => {
    const [expanded, setExpanded] = useState(false);

    // Identify if it's using the new schema or legacy
    const isNewSchema = typeof paper.status === 'object';

    // Fallback for legacy data (prevent crash if something isn't migrated)
    if (!isNewSchema) {
        return (
            <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <em>Legacy Entry: {paper.title}</em>
            </div>
        );
    }

    return (
        <div style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
        }}>
            {/* Header / Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                        <StatusBadge label={paper.status.stage} type="stage" />
                        <StatusBadge label={paper.status.artifact} type="artifact" />
                        <StatusBadge label={paper.status.confidence} type="confidence" />
                    </div>
                    <h4
                        onClick={() => setExpanded(!expanded)}
                        style={{
                            fontSize: '1.15rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: expanded ? 'var(--accent-cyber)' : 'var(--text-main)',
                            transition: 'color 0.2s'
                        }}
                    >
                        {paper.pinned && <span style={{ fontSize: '0.9rem', marginRight: '0.5rem' }}>📌</span>}
                        {paper.title}
                        <span style={{ fontSize: '0.8rem', opacity: 0.5, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                    </h4>
                    {(isAdmin && adminMode) && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '1rem', gap: '0.5rem' }}>
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid yellow',
                                    color: 'yellow',
                                    fontSize: '0.6rem',
                                    cursor: 'pointer',
                                    padding: '2px 4px',
                                    borderRadius: '4px'
                                }}
                            >
                                EDIT
                            </button>
                            {onMove && (
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    <button
                                        disabled={isFirst}
                                        onClick={(e) => { e.stopPropagation(); onMove('up'); }}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #444',
                                            color: isFirst ? '#444' : '#888',
                                            fontSize: '0.6rem',
                                            cursor: isFirst ? 'default' : 'pointer',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        disabled={isLast}
                                        onClick={(e) => { e.stopPropagation(); onMove('down'); }}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #444',
                                            color: isLast ? '#444' : '#888',
                                            fontSize: '0.6rem',
                                            cursor: isLast ? 'default' : 'pointer',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Artifact Icons (Right Aligned) */}
                <div style={{ display: 'flex', gap: '1rem', paddingLeft: '1rem' }}>
                    {paper.links && Object.entries(paper.links).map(([key, link]) => (
                        <ArtifactIcon key={key} type={key} link={link} isAdmin={isAdmin} />
                    ))}
                </div>
            </div>

            {/* Abstract Drawer */}
            {
                expanded && paper.abstract && (
                    <div style={{
                        marginTop: '0.5rem',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.02)',
                        borderLeft: '2px solid var(--accent-cyber)',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                            <strong style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Abstract</strong>
                            {paper.abstract}
                        </p>

                        {/* Metadata Section inside Drawer */}
                        {paper.metadata && (
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1rem' }}>
                                {paper.metadata.venue && <><span>VENUE:</span> <span style={{ color: 'var(--text-muted)' }}>{paper.metadata.venue}</span></>}
                                {paper.metadata.contribution && <><span>CONTRIBUTION:</span> <span style={{ color: 'var(--text-muted)' }}>{paper.metadata.contribution}</span></>}
                                {paper.metadata.limitations && <><span>LIMITATIONS:</span> <span style={{ color: 'var(--text-muted)' }}>{paper.metadata.limitations}</span></>}
                            </div>
                        )}
                    </div>
                )
            }

            {/* Lineage / "Builds On" - Always visible if present, but subtle */}
            {
                paper.lineage && paper.lineage.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span className="mono" style={{ color: 'var(--text-dim)' }}>↳ Builds on:</span>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            {paper.lineage.map((item, i) => (
                                <a key={i} href={item.link} style={{ color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px dotted var(--text-dim)' }}>
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* Version diff note (optional visual flair) */}
            {
                (paper.note || (paper.id === 'paper-aads' && !paper.note)) && (
                    <div style={{ fontSize: '0.7rem', color: '#666', fontStyle: 'italic', marginTop: '0.2rem' }}>
                        {paper.note || "* v0.2 added robust authentication constraints"}
                    </div>
                )
            }
        </div >
    );
};

export default PublicationCard;
