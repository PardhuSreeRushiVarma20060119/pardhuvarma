import React, { createContext, useContext, useState, useEffect } from 'react';
import { content as sourceContent } from '../data/content';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Initial State / Schema
    const initialContent = {
        name: "Dr. Pardhu",
        title: "Cybersecurity Specialist & Researcher",
        bio: "Specializing in offensive security, red teaming, and advanced threat simulation.",
        stats: {
            "DATA BREACHES": "0",
            "VULN REPORTED": "42",
            "SYSTEMS SECURED": "150+"
        },
        projects: [],
        timeline: [],
        blogs: [],
        reflections: [], // New: What Changed My Thinking
        ideas: [],       // New: Idea Parking Lot
        privateNotes: [] // New: Private Notes Mode
    };

    const [data, setData] = useState(null);
    // New: Site Settings State (Default values)
    const [settings, setSettings] = useState({
        siteTitle: "Scientific Journal",
        accentColor: "#00ff41", // Default Cyber Green
        enableAnimations: true,
        readingMode: false // New: Paper Mode
    });

    // Load from "DB" (LocalStorage) on mount
    useEffect(() => {
        const savedData = localStorage.getItem('portfolio_db');
        if (savedData) {
            try {
                let parsed = JSON.parse(savedData);

                // Recovery: If critical sections are missing (e.g. from bad initialization), restore from sourceContent
                if (!parsed.home) parsed.home = sourceContent.home;
                if (!parsed.about) parsed.about = sourceContent.about;
                if (!parsed.timeline) parsed.timeline = sourceContent.timeline;
                if (!parsed.certifications) parsed.certifications = sourceContent.certifications;
                if (!parsed.projects || parsed.projects.length === 0) parsed.projects = sourceContent.projects; // Restore projects if empty? Maybe dangerous if user deleted all. 
                // But given the "blank screen" bug, it's likely they have 0 projects because of the bug. 
                // Let's rely on !parsed.home as the indicator of "Bad Seed".

                // Migration: Ensure new arrays exist
                if (!parsed.reflections) parsed.reflections = [];
                if (!parsed.ideas) parsed.ideas = [];
                if (!parsed.privateNotes) parsed.privateNotes = [];

                if (parsed.settings) setSettings(parsed.settings); // Load settings

                // Patch: Ensure TryHackMe object exists
                if (!parsed.tryHackMe) {
                    parsed.tryHackMe = {
                        username: 'ZenRage',
                        rank: '22702',
                        roomsCompleted: 143,
                        badges: 18,
                        skills: {
                            'Enumeration': 90,
                            'Exploitation': 85,
                            'Privilege Escalation': 75,
                            'Vulnerability Analysis': 60,
                            'Red Teaming': 45,
                            'Penetration Testing': 40
                        },
                        history: [
                            { date: '2025-01', count: 45 },
                            { date: '2025-02', count: 80 },
                            { date: '2025-03', count: 120 },
                            { date: '2025-04', count: 90 },
                            { date: '2025-05', count: 110 },
                            { date: '2025-06', count: 60 },
                        ],
                        isVisible: true
                    };
                }

                // Patch: Force Update Contact Info (Source of Truth is content.js)
                if (sourceContent.contact) {
                    parsed.contact = sourceContent.contact;
                }

                // Patch: Ensure all Projects have IDs (Migration) & Visibility & Cleanup Ghost Items
                if (parsed.projects) {
                    parsed.projects = parsed.projects
                        .filter(p => p.title && p.title.trim() !== "New Project" && p.title.trim() !== "") // Remove ghosts/initial blanks
                        .map((p, i) => ({
                            ...p,
                            id: p.id || `proj-${Date.now()}-${i}`,
                            visibility: p.visibility || 'public' // Default to Public for existing
                        }));
                }

                // Patch: Ensure all Blogs have IDs & Status
                if (parsed.blogs) {
                    parsed.blogs = parsed.blogs.map((b, i) => ({
                        ...b,
                        id: b.id || `blog-${Date.now()}-${i}`,
                        status: b.status || 'public' // Default to Public/Published for existing
                    }));
                }

                setData(parsed);
                // FORCE SAVE to persist the generated IDs immediately
                localStorage.setItem('portfolio_db', JSON.stringify(parsed));

            } catch (e) {
                console.error("DB Load Error", e);
            }
        } else {
            // First load: Initialize from sourceContent (content.js)
            const seed = {
                ...sourceContent, // Load all data from content.js
                reflections: [],
                ideas: [],
                privateNotes: [], // Ensure new fields exist
                tryHackMe: { // Default THM data
                    username: 'ZenRage',
                    rank: '22702',
                    roomsCompleted: 143,
                    badges: 18,
                    skills: {
                        'Enumeration': 90,
                        'Exploitation': 85,
                        'Privilege Escalation': 75,
                        'Vulnerability Analysis': 60,
                        'Red Teaming': 45,
                        'Penetration Testing': 40
                    },
                    history: [
                        { date: '2025-01', count: 45 },
                        { date: '2025-02', count: 80 },
                        { date: '2025-03', count: 120 },
                        { date: '2025-04', count: 90 },
                        { date: '2025-05', count: 110 },
                        { date: '2025-06', count: 60 },
                    ],
                    isVisible: true
                }
            };

            // Migration: Assign IDs + Visibility
            if (seed.projects) {
                seed.projects = seed.projects.map((p, i) => ({
                    ...p,
                    id: `proj-${Date.now()}-${i}`,
                    visibility: 'public'
                }));
            }
            if (seed.blogs) {
                seed.blogs = seed.blogs.map((b, i) => ({
                    ...b,
                    id: b.id || `blog-${Date.now()}-${i}`,
                    status: 'public'
                }));
            }

            setData(seed);
            // Persistent initial seed
            localStorage.setItem('portfolio_db', JSON.stringify(seed));
        }
    }, []);

    // Save to "DB"
    const saveContent = (newData, newSettings = settings) => {
        const fullDb = { ...newData, settings: newSettings };
        setData(newData);
        setSettings(newSettings);
        localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
        console.log("Database Updated");
    };

    // Update Settings Action
    const updateSettings = (newSettings) => {
        saveContent(data, newSettings);
        // Apply CSS Variables immediately
        document.documentElement.style.setProperty('--accent-cyber', newSettings.accentColor);
    };

    // Generic Update helper with History
    const trackHistory = (oldItem, msg = "Update") => {
        const entry = {
            timestamp: new Date().toISOString(),
            msg,
            snapshot: { ...oldItem, history: undefined } // Don't nest history infinitely
        };
        return [...(oldItem.history || []), entry];
    };

    const updateField = (section, field, value) => {
        setData(prev => {
            const newState = { ...prev };
            // For singleton sections like 'home', 'about', we track history on the section itself if checks allow
            if (newState[section] && typeof newState[section] === 'object') {
                // If we are updating a specific field, we should track the old value
                // Since 'home' uses top-level object, let's attach a hidden _history property or just update
                // Simpler: Just update for now. Detailed field history is complex for nested objects.
                // Let's implement full item tracking for Blogs/Projects first as requested.
                // Attempting lightweight tracking for section:
                // const oldSection = { ...newState[section] }; 
                // Don't track yet for simple fields to avoid bloat.

                if (field) {
                    newState[section][field] = value;
                } else {
                    // direct replace (array or object)
                    newState[section] = value;
                }
            }
            saveContent(newState); // Auto-persist
            return newState;
        });
    };

    // Helper to add a new Paper/Project/Blog
    const addItem = (collectionName, item) => {
        setData(prev => {
            const newState = { ...prev };
            if (Array.isArray(newState[collectionName])) {
                const newItem = {
                    ...item,
                    history: [{ timestamp: new Date().toISOString(), msg: "Created" }]
                };
                newState[collectionName] = [newItem, ...newState[collectionName]];
            }
            saveContent(newState);
            return newState;
        });
    };

    // Blog Specific Actions
    const saveBlog = (post) => {
        setData(prev => {
            const newState = { ...prev };
            const blogs = newState.blogs || [];

            if (post.id) {
                // Update existing
                newState.blogs = blogs.map(b => {
                    if (b.id === post.id) {
                        return {
                            ...post,
                            history: trackHistory(b, `Edited ${post.title}`)
                        };
                    }
                    return b;
                });
            } else {
                // Create new
                const newPost = {
                    ...post,
                    id: Date.now().toString(),
                    history: [{ timestamp: new Date().toISOString(), msg: "Created (Initial Draft)" }]
                };
                newState.blogs = [newPost, ...blogs];
            }
            saveContent(newState);
            return newState;
        });
    };

    const deleteBlog = (id) => {
        setData(prev => {
            const newState = { ...prev };
            newState.blogs = (newState.blogs || []).filter(b => b.id !== id);
            saveContent(newState);
            return newState;
        });
    };

    // Project Actions
    const saveProject = (project) => {
        setData(prev => {
            const newState = { ...prev };
            const projects = newState.projects || [];
            if (project.id) {
                newState.projects = projects.map(p => {
                    if (p.id === project.id) {
                        return {
                            ...project,
                            history: trackHistory(p, `Edited ${project.title}`)
                        };
                    }
                    return p;
                });
            } else {
                const newProj = {
                    ...project,
                    id: Date.now().toString(),
                    history: [{ timestamp: new Date().toISOString(), msg: "Created" }]
                };
                newState.projects = [newProj, ...projects];
            }
            saveContent(newState);
            return newState;
        });
    };

    const deleteProject = (id) => {
        setData(prev => {
            const newState = { ...prev };
            newState.projects = (newState.projects || []).filter(p => p.id !== id);
            saveContent(newState);
            return newState;
        });
    };

    // Asset Actions
    const addAsset = (asset) => {
        setData(prev => {
            const newState = { ...prev };
            const assets = newState.assets || [];
            newState.assets = [{ ...asset, id: Date.now().toString() }, ...assets];
            saveContent(newState);
            return newState;
        });
    };

    const deleteAsset = (id) => {
        setData(prev => {
            const newState = { ...prev };
            newState.assets = (newState.assets || []).filter(a => a.id !== id);
            saveContent(newState);
            return newState;
        });
    };

    // TryHackMe Actions
    const updateTryHackMe = (newStats) => {
        setData(prev => {
            const newState = { ...prev, tryHackMe: newStats };
            saveContent(newState);
            return newState;
        });
    };

    // --- Reflections (What Changed My Thinking) ---
    const addReflection = (reflection) => {
        setData(prev => {
            const newState = { ...prev };
            const newRef = {
                ...reflection,
                id: Date.now().toString(),
                date: new Date().toLocaleDateString(),
                history: [{ timestamp: new Date().toISOString(), msg: "Created" }]
            };
            newState.reflections = [newRef, ...(newState.reflections || [])];
            saveContent(newState);
            return newState;
        });
    };

    const deleteReflection = (id) => {
        setData(prev => {
            const newState = { ...prev };
            newState.reflections = (newState.reflections || []).filter(r => r.id !== id);
            saveContent(newState);
            return newState;
        });
    };

    const updateReflection = (reflection) => {
        setData(prev => {
            const newState = { ...prev };
            newState.reflections = (newState.reflections || []).map(r => r.id === reflection.id ? reflection : r);
            saveContent(newState);
            return newState;
        });
    };

    // --- Idea Parking Lot ---
    const addIdea = (text) => {
        setData(prev => {
            const newState = { ...prev };
            const newIdea = {
                id: Date.now().toString(),
                text: typeof text === 'string' ? text : text.text, // Handle object or string
                isPrivate: typeof text === 'object' ? text.isPrivate : true,
                history: [{ timestamp: new Date().toISOString(), msg: "Created" }]
            };
            newState.ideas = [newIdea, ...(newState.ideas || [])];
            saveContent(newState);
            return newState;
        });
    };

    const updateIdea = (idea) => {
        setData(prev => {
            const newState = { ...prev };
            newState.ideas = (newState.ideas || []).map(i => i.id === idea.id ? idea : i);
            saveContent(newState);
            return newState;
        });
    };

    const deleteIdea = (id) => {
        setData(prev => {
            const newState = { ...prev };
            newState.ideas = (newState.ideas || []).filter(i => i.id !== id);
            saveContent(newState);
            return newState;
        });
    };

    // --- Private Notes (Admin Only) ---
    const addPrivateNote = (text) => {
        setData(prev => {
            const newState = { ...prev };
            const newNote = {
                id: Date.now().toString(),
                text, // Expecting string or object? Let's say just text for now, but editor might send struct. 
                // Actually let's just match Idea structure but without isPrivate toggle (always private).
                date: new Date().toLocaleDateString(),
                history: [{ timestamp: new Date().toISOString(), msg: "Created" }]
            };
            newState.privateNotes = [newNote, ...(newState.privateNotes || [])];
            saveContent(newState);
            return newState;
        });
    };

    const updatePrivateNote = (note) => {
        setData(prev => {
            const newState = { ...prev };
            newState.privateNotes = (newState.privateNotes || []).map(n => n.id === note.id ? note : n);
            saveContent(newState);
            return newState;
        });
    };

    const deletePrivateNote = (id) => {
        setData(prev => {
            const newState = { ...prev };
            newState.privateNotes = (newState.privateNotes || []).filter(n => n.id !== id);
            saveContent(newState);
            return newState;
        });
    };

    const toggleIdeaVisibility = (id) => {
        setData(prev => {
            const newState = {
                ...prev,
                ideas: (prev.ideas || []).map(i => i.id === id ? { ...i, isPrivate: !i.isPrivate } : i)
            };
            saveContent(newState);
            return newState;
        });
    };

    return (
        <DataContext.Provider value={{
            data, settings, updateSettings,
            updateField, updateTryHackMe,
            saveProject, deleteProject,
            saveBlog, deleteBlog,
            addReflection, deleteReflection, updateReflection,
            addIdea, deleteIdea, updateIdea, toggleIdeaVisibility,
            addPrivateNote, deletePrivateNote, updatePrivateNote,
            addItem, addAsset, deleteAsset
        }}>
            {children}
        </DataContext.Provider>
    );
};
