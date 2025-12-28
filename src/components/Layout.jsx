import React, { useState, useEffect } from 'react';

const NavItem = ({ href, children, isActive }) => (
    <a
        href={href}
        className="mono"
        style={{
            display: 'block',
            marginBottom: '0.8rem',
            color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            transition: 'color 0.2s',
            opacity: isActive ? 1 : 0.6
        }}
    >
        {isActive ? '> ' : '  '}{children}
    </a>
);

const Layout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 850);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 850);
        window.addEventListener('resize', handleResize);

        // Simple intersection observer for active link
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('section').forEach(s => observer.observe(s));

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            maxWidth: '1200px',
            margin: '0 auto',
        }}>

            {/* Sidebar */}
            <aside style={{
                width: isMobile ? '100%' : 'var(--sidebar-width)',
                padding: isMobile ? '2rem 1.5rem' : '4rem 0',
                position: isMobile ? 'relative' : 'fixed',
                height: isMobile ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRight: isMobile ? 'none' : '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                paddingRight: isMobile ? '1.5rem' : '2rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>PardhuVarma.</h1>
                    <p className="subtle" style={{ maxWidth: '200px', marginBottom: '3rem' }}>
                        Cybersecurity Student & Systems Researcher.
                    </p>

                    <nav style={{ display: isMobile ? 'flex' : 'block', gap: '1rem', flexWrap: 'wrap' }}>
                        <NavItem href="#home" isActive={activeSection === 'home'}>Index</NavItem>
                        <NavItem href="#projects" isActive={activeSection === 'projects'}>Projects</NavItem>
                        <NavItem href="#research" isActive={activeSection === 'research'}>Research</NavItem>
                        <NavItem href="#writing" isActive={activeSection === 'writing'}>Writing</NavItem>
                        <NavItem href="#about" isActive={activeSection === 'about'}>About</NavItem>
                    </nav>
                </div>

                {!isMobile && (
                    <div className="mono subtle" style={{ fontSize: '0.75rem' }}>
                        Updated {new Date().getFullYear()}
                        <br />
                        Hyderabad, IN
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: isMobile ? '0' : 'var(--sidebar-width)',
                padding: isMobile ? '0 1.5rem 4rem' : '4rem 4rem 8rem',
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
