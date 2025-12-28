import React from 'react';

const SectionHeading = ({ children, id, action }) => (
    <div style={{
        borderBottom: '2px solid var(--text-main)',
        paddingBottom: '0.5rem',
        marginBottom: '2rem',
        marginTop: '6rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    }}>
        <h2 id={id} style={{ fontSize: '1.5rem', margin: 0 }}>{children}</h2>
        {action}
    </div>
);

export default SectionHeading;
