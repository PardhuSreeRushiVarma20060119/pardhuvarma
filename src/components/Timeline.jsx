import React, { useEffect, useRef, useState } from 'react';

const TimelineItem = ({ item, index }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2, rootMargin: '0px 0px -20% 0px' }
        );
        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '3rem',
                opacity: isVisible ? 1 : 0.2,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                position: 'relative'
            }}
        >
            {/* Line & Dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isVisible ? 'var(--text-main)' : 'var(--border-subtle)',
                    transition: 'background 0.6s',
                    zIndex: 2
                }} />
                <div style={{
                    width: '1px',
                    flexGrow: 1,
                    background: 'var(--border-subtle)',
                    marginTop: '0.5rem',
                    minHeight: '50px'
                }} />
            </div>

            {/* Content */}
            <div style={{ paddingBottom: '1rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', color: isVisible ? 'var(--accent-cyber)' : 'var(--text-dim)' }}>
                    {item.date}
                </span>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', marginTop: '0.2rem' }}>{item.title}</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.org}</div>
            </div>
        </div>
    );
};

const Timeline = ({ items }) => {
    return (
        <div style={{ paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            {items.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
            ))}
        </div>
    );
};

export default Timeline;
