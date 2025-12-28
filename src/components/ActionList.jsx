import React from 'react';

const ActionRow = ({ title, status, subtitle, onClick }) => (
    <div
        onClick={onClick}
        style={{
            padding: '1.2rem 0',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            cursor: onClick ? 'pointer' : 'default',
            transition: 'opacity 0.2s',
        }}
        className="action-row"
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
        <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 500, margin: 0 }}>{title}</h4>
            {subtitle && <span className="mono subtle" style={{ marginTop: '0.4rem', display: 'block' }}>{subtitle}</span>}
        </div>

        {status && (
            <span className="mono subtle" style={{ fontSize: '0.8rem', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                {status}
            </span>
        )}
    </div>
);

export const ActionList = ({ children }) => (
    <div style={{ marginTop: '2rem' }}>
        <div style={{ borderTop: '1px solid var(--border-color)' }}>
            {children}
        </div>
    </div>
);

export default ActionRow;
