import React, { useEffect, useRef, useState } from 'react';

const TextReveal = ({ text, className = "", style = {} }) => {
    const elementRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setInView(true);
            });
        }, { threshold: 0.1 });

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                willChange: 'opacity, transform',
                ...style
            }}
        >
            {text}
        </div>
    );
};

export default TextReveal;
