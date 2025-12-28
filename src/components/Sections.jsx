import React from 'react';
import { content } from '../data/content';
import BentoCard, { BentoGrid } from './BentoGrid';
import TextReveal from './TextReveal';

const SectionHeader = ({ title, subtitle }) => (
    <div style={{ marginBottom: '4rem', marginTop: '8rem', textAlign: 'center' }}>
        {subtitle && <h4 className="text-gradient" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', fontWeight: 600 }}>{subtitle}</h4>}
        <h2 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>{title}</h2>
    </div>
);

const Sections = () => {
    return (
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

            {/* HERO SECTION */}
            <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <TextReveal
                    text={<h1 className="text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '2rem' }}>
                        {content.home.mainText}
                    </h1>}
                />
                <TextReveal
                    text={<p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 1.6 }}>
                        {content.home.subText}
                    </p>}
                    style={{ transitionDelay: '0.2s' }}
                />
            </section>

            {/* PHILOSOPHY / ABOUT */}
            <section id="about" style={{ padding: '4rem 0' }}>
                <SectionHeader subtitle="Mission" title="Philosophy" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {content.about.text.map((p, i) => (
                        <BentoCard key={i} className="glass-panel" style={{ padding: '2rem' }}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p}</p>
                        </BentoCard>
                    ))}
                </div>

                <div style={{ marginTop: '6rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--text-main)' }}>Research Focus</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                        {content.researchInterests.map((interest, idx) => (
                            <span key={idx} className="glass-panel" style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '100px',
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                whiteSpace: 'nowrap'
                            }}>
                                {interest.split('—')[0]}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS GRID */}
            <section id="projects">
                <SectionHeader subtitle="Portfolio" title="Selected Works" />
                <BentoGrid>
                    {content.projects.map((project, index) => (
                        <BentoCard key={index} span={index === 0 || index === 3 ? 2 : 1} href={project.link}>
                            <div style={{ marginBottom: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>{project.status.toUpperCase()}</span>
                                </div>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{project.title}</h3>
                                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{project.description}</p>
                            </div>
                            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                                View Project &rarr;
                            </div>
                        </BentoCard>
                    ))}
                </BentoGrid>
            </section>

            {/* CERTIFICATIONS & TIMELINE */}
            <section id="trajectory" style={{ padding: '6rem 0' }}>
                <SectionHeader subtitle="Trajectory" title="Experience" />
                <BentoGrid>
                    <BentoCard span={2}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Timeline</h3>
                        {content.timeline.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-glass)' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>{item.title}</span>
                                <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{item.year}</span>
                            </div>
                        ))}
                    </BentoCard>
                    <BentoCard>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Certifications</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {content.certifications.slice(0, 5).map((cert, idx) => (
                                <li key={idx} style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    ✓ {cert}
                                </li>
                            ))}
                        </ul>
                    </BentoCard>
                </BentoGrid>
            </section>

            {/* CONNECT */}
            <section id="contact" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '2rem' }}>Ready to Collaborate?</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <a href={`mailto:${content.contact.email}`} className="glass-panel" style={{ padding: '1rem 3rem', borderRadius: '50px', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>Email</a>
                    <a href={content.contact.github} target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '1rem 3rem', borderRadius: '50px', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>GitHub</a>
                    <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="glass-panel" style={{ padding: '1rem 3rem', borderRadius: '50px', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>LinkedIn</a>
                </div>
            </section>

        </div>
    );
};

export default Sections;
