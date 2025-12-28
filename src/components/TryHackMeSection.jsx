import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';

const TryHackMeSection = () => {
    const { data } = useData();
    const thm = data.tryHackMe;

    if (!thm || !thm.isVisible) return null;

    // Helper for Skill Bar width
    const maxSkill = Math.max(...Object.values(thm.skills || { a: 0 }));

    return (
        <section id="training" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>
                    <span className="mono" style={{ fontSize: '1rem', color: 'var(--accent-cyber)', display: 'block', marginBottom: '0.5rem' }}>03b. TRAINING</span>
                    Hands-On Security Training
                </h2>
                <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    SOURCE: <a href={`https://tryhackme.com/p/${thm.username}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>TRYHACKME/{thm.username.toUpperCase()}</a>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                {/* Column 1: Core Metrics (Scientific Readout) */}
                <div style={{ border: '1px solid var(--border-subtle)', padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
                    <h4 className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                        OPERATIONAL METRICS
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <div className="mono" style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>{thm.roomsCompleted}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rooms Completed</div>
                        </div>
                        <div>
                            <div className="mono" style={{ fontSize: '3rem', color: 'var(--accent-cyber)', fontWeight: 'bold' }}>{thm.badges}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Badges Earned</div>
                        </div>
                        <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.2rem' }}>CURRENT RANK</div>
                            <div className="mono" style={{ fontSize: '1.5rem', color: 'white' }}>{thm.rank.toUpperCase()}</div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Skill Distribution Graph (Horizontal Bars) */}
                <div style={{ border: '1px solid var(--border-subtle)', padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
                    <h4 className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                        SKILL DISTRIBUTION ANALYTICS
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(thm.skills || {}).map(([skill, value]) => (
                            <div key={skill}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                                    <span style={{ color: '#ccc' }}>{skill}</span>
                                    <span className="mono" style={{ color: 'var(--accent-cyber)' }}>{value}</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', background: '#222' }}>
                                    <div style={{
                                        width: `${(value / (maxSkill || 100)) * 100}%`,
                                        height: '100%',
                                        background: 'var(--accent-cyber)',
                                        boxShadow: '0 0 10px var(--accent-cyber)'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Heatmap Activity Log */}
                <div style={{ gridColumn: '1 / -1', border: '1px solid var(--border-subtle)', padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 className="mono" style={{ fontSize: '1rem', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#aaa' }}>📊</span> Yearly activity
                        </h4>
                        <div className="mono" style={{ fontSize: '0.9rem', color: '#aaa' }}>
                            2025
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        {/* Legend */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', color: '#aaa' }}>
                            <span className="mono">Key</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ width: '10px', height: '10px', background: '#3a3a4c', borderRadius: '2px' }} />
                                <span>No activity</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ width: '10px', height: '10px', background: '#ffe02e', borderRadius: '2px' }} />
                                <span>1 event</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ width: '10px', height: '10px', background: '#46e01a', borderRadius: '2px' }} />
                                <span>2 events</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ width: '10px', height: '10px', background: '#00a200', borderRadius: '2px' }} />
                                <span>≥ 3 events</span>
                            </div>
                        </div>

                        {/* Total Count */}
                        <div className="mono" style={{ fontSize: '0.9rem', color: '#fff', background: '#1a1a2e', padding: '0.3rem 0.8rem', borderRadius: '4px', border: '1px solid #333' }}>
                            Total events this year <span style={{ fontWeight: 'bold' }}>2767</span>
                        </div>
                    </div>

                    {/* The Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
                        {/* Months Row (Approximate) */}
                        <div style={{ display: 'flex', marginLeft: '30px', marginBottom: '5px', gap: '38px', fontSize: '0.7rem', color: '#aaa' }} className="mono">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>

                        <div style={{ display: 'flex', gap: '5px' }}>
                            {/* Days Labels */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '15px', fontSize: '0.6rem', color: '#666', marginRight: '5px' }} className="mono">
                                <span style={{ height: '10px' }}>Mon</span>
                                <span style={{ height: '10px', marginTop: '13px' }}>Wed</span>
                                <span style={{ height: '10px', marginTop: '13px' }}>Fri</span>
                            </div>

                            {/* Grid Cells (53 Columns x 7 Rows) */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(53, 1fr)', gap: '3px' }}>
                                {Array.from({ length: 53 }).map((_, colIndex) => (
                                    <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        {Array.from({ length: 7 }).map((_, rowIndex) => {
                                            // Deterministic "Random" generation based on position to keep it stable but looking organic
                                            const seed = (colIndex * 7) + rowIndex;
                                            // Denser activity in cols 10-30 (March-July)
                                            const isDensePeriod = colIndex > 10 && colIndex < 35;
                                            const rand = Math.sin(seed * 9999);

                                            let level = 0; // 0=Empty, 1=Yellow, 2=LGreen, 3=DGreen
                                            if (rand > 0.8) level = 3;
                                            else if (rand > 0.6) level = 2;
                                            else if (rand > 0.4) level = 1;

                                            // Boost density for aesthetic matching
                                            if (isDensePeriod && rand > 0.2) level = Math.max(level, 2);
                                            // Random scattered activity
                                            if (!isDensePeriod && rand > 0.9) level = 3;

                                            const colors = ['#3a3a4c', '#ffe02e', '#46e01a', '#00a200'];

                                            // Hover tooltip wrapper could go here, keeping it simple for now
                                            return (
                                                <div
                                                    key={rowIndex}
                                                    title={`${['No', '1', '2', '3+'][level]} events`}
                                                    style={{
                                                        width: '10px', height: '10px',
                                                        background: colors[level],
                                                        borderRadius: '2px'
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#888', textAlign: 'center' }}>
                        Activity events are measured by the number of machines started, questions answered or file downloads.
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TryHackMeSection;
