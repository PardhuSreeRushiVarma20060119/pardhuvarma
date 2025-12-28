import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import HistoryViewer from './HistoryViewer';

const BlogEditor = ({ post = {}, onSave, onCancel, onDelete }) => {
    const [title, setTitle] = useState(post.title || '');
    const [desc, setDesc] = useState(post.desc || '');
    const [content, setContent] = useState(post.content || '');
    const [type, setType] = useState(post.type || 'Essay');
    const [tags, setTags] = useState(post.tags || '');
    const [status, setStatus] = useState(post.status || 'draft');
    const [references, setReferences] = useState(post.references || []);
    const [newRefText, setNewRefText] = useState('');
    const [newRefUrl, setNewRefUrl] = useState('');

    // Auto-generate date if new
    const date = post.date || new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

    const [showHistory, setShowHistory] = useState(false);

    // Autosave Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            // Optional: Save to local storage or trigger auto-save callback if exists
            // For now, we trust the user to hit save, but we could add a "Draft Saved" indicator here.
        }, 1000);
        return () => clearTimeout(timer);
    }, [title, content, references]);

    const handleSave = () => {
        onSave({
            id: post.id,
            title,
            desc,
            content,
            type,
            date,
            tags,
            status,
            references
        });
    };

    const addReference = () => {
        if (!newRefText || !newRefUrl) return;
        setReferences([...references, { text: newRefText, url: newRefUrl, id: Date.now() }]);
        setNewRefText('');
        setNewRefUrl('');
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: '#050505', zIndex: 2000, display: 'flex', flexDirection: 'column'
        }}>
            {showHistory && <HistoryViewer history={post.history} onClose={() => setShowHistory(false)} />}

            {/* Header */}
            <div style={{
                padding: '1rem 2rem', borderBottom: '1px solid #333', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center', background: '#111'
            }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                    <span className="mono" style={{ color: '#666' }}>CMS / WRITER</span>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Post Title..."
                        style={{
                            background: 'transparent', border: 'none', color: 'white',
                            fontSize: '1.2rem', fontFamily: 'var(--font-serif)', outline: 'none', minWidth: '300px'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {post.id && (
                        <button
                            onClick={() => setShowHistory(true)}
                            className="mono"
                            style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyber)', fontSize: '0.7rem', cursor: 'pointer', marginRight: '1rem' }}
                        >
                            VIEW HISTORY
                        </button>
                    )}

                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        style={{
                            background: status === 'public' ? 'var(--accent-cyber)' : status === 'archived' ? '#333' : '#dbdbdb',
                            color: status === 'public' ? 'black' : status === 'archived' ? '#888' : 'black',
                            border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600
                        }}
                    >
                        <option value="draft">DRAFT</option>
                        <option value="public">PUBLIC</option>
                        <option value="archived">ARCHIVED</option>
                    </select>

                    {post.id && (
                        <button
                            onClick={() => { if (window.confirm('Delete post?')) onDelete(post.id); }}
                            style={{ background: 'transparent', border: '1px solid #333', color: '#ff4444', marginRight: '1rem', cursor: 'pointer', padding: '0.5rem 1rem' }}
                        >
                            Delete
                        </button>
                    )}
                    <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleSave} style={{ background: 'white', color: 'black', border: 'none', padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>
                        {status === 'public' ? 'Update' : 'Save Draft'}
                    </button>
                </div>
            </div>

            {/* Split View */}
            <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>

                {/* Editor Column */}
                <div style={{ flex: 1, borderRight: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #222', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem' }}>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            style={{ background: '#222', color: 'white', border: '1px solid #444', padding: '0.3rem' }}
                        >
                            <option>Essay</option>
                            <option>Research Note</option>
                            <option>Tutorial</option>
                        </select>
                        <input
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Subtitle / Description..."
                            style={{ background: '#111', border: '1px solid #333', color: '#ccc', padding: '0.3rem' }}
                        />
                        <input
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            placeholder="Tags (comma sep)..."
                            style={{ background: '#111', border: '1px solid #333', color: '#ccc', padding: '0.3rem' }}
                        />
                    </div>

                    {/* References Manage Block (Collapsible) */}
                    <div style={{ padding: '0.5rem 1rem', background: '#0e0e0e', borderBottom: '1px solid #222' }}>
                        <details>
                            <summary style={{ cursor: 'pointer', color: '#888', fontSize: '0.8rem', userSelect: 'none' }}>
                                Manage References ({references.length})
                            </summary>
                            <div style={{ paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <input
                                        value={newRefText} onChange={e => setNewRefText(e.target.value)}
                                        placeholder="Citation Text (e.g. 'Paper: Attention is All You Need')"
                                        style={{ flex: 2, background: '#222', border: 'none', color: '#ccc', padding: '0.3rem' }}
                                    />
                                    <input
                                        value={newRefUrl} onChange={e => setNewRefUrl(e.target.value)}
                                        placeholder="URL"
                                        style={{ flex: 1, background: '#222', border: 'none', color: '#ccc', padding: '0.3rem' }}
                                    />
                                    <button onClick={addReference} style={{ background: '#333', color: 'white', border: 'none', padding: '0 1rem', cursor: 'pointer' }}>Add</button>
                                </div>
                                <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                    {references.map((r, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#aaa', padding: '0.2rem 0', borderBottom: '1px dashed #222' }}>
                                            <span><span style={{ color: 'var(--accent-cyber)' }}>[{i + 1}]</span> {r.text}</span>
                                            <button
                                                onClick={() => setReferences(references.filter((_, idx) => idx !== i))}
                                                style={{ background: 'transparent', border: 'none', color: '#d00', cursor: 'pointer' }}
                                            >x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </details>
                    </div>

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="# Write something brilliant..."
                        style={{
                            flexGrow: 1, width: '100%', padding: '2rem', background: '#080808',
                            color: '#e0e0e0', border: 'none', resize: 'none', outline: 'none',
                            fontFamily: 'var(--font-mono)', lineHeight: 1.6
                        }}
                    />
                </div>

                {/* Preview Column */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: '#050505' }}>
                    <div className="preview-container">
                        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>{title || 'Untitled'}</h1>
                        <p style={{ color: '#888', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                            {date} • {type} • {status}
                        </p>
                        <div className="markdown-reader" style={{ color: '#ccc', lineHeight: 1.8 }}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} style={{ background: '#222', padding: '2px 4px', borderRadius: '4px' }} {...props}>
                                                {children}
                                            </code>
                                        )
                                    },
                                    img: ({ node, ...props }) => <img style={{ maxWidth: '100%', borderRadius: '4px' }} {...props} />
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
