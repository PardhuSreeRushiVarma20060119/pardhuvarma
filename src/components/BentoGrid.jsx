import React, { useRef, useState } from 'react';

const BentoCard = ({ children, className = "", span = 1, onClick, href }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const Component = href ? 'a' : 'div';

    return (
        <Component
            ref={divRef}
            href={href}
            target={href ? "_blank" : undefined}
            rel={href ? "noreferrer" : undefined}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            onClick={onClick}
            className={`glass-panel ${className}`}
            style={{
                gridColumn: `span ${span}`,
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.4s var(--ease-out-quint)',
                cursor: href || onClick ? 'pointer' : 'default',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <div
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                    transition: 'opacity 0.3s'
                }}
            />
            {children}
        </Component>
    );
};

export const BentoGrid = ({ children }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        width: '100%'
    }}>
        {children}
    </div>
);

export default BentoCard;
