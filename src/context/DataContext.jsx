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

    // Helper to ensure all items have IDs and proper structure
    const normalizeData = (raw) => {
        const normalized = { ...raw };
        const collections = ['blogs', 'projects', 'reflections', 'ideas', 'privateNotes', 'assets', 'researchInterests', 'papers', 'timeline', 'certifications'];

        collections.forEach(key => {
            if (Array.isArray(normalized[key])) {
                normalized[key] = normalized[key].map((item, i) => {
                    // Handle legacy string items
                    let obj = typeof item === 'string' ? { text: item } : { ...item };

                    // Ensure a stable ID if missing
                    if (!obj.id) {
                        // Use a combination of key, index and a one-time random seed or timestamp
                        // Since we save it back immediately, this becomes the permanent ID.
                        obj.id = `${key.slice(0, 3)}-${Date.now()}-${i}-${Math.floor(Math.random() * 1000)}`;
                    } else {
                        obj.id = obj.id.toString();
                    }
                    return obj;
                });
            }
        });

        // Ensure critical objects exist
        if (!normalized.home) normalized.home = sourceContent.home;
        if (!normalized.about) normalized.about = sourceContent.about;
        if (!normalized.settings) normalized.settings = settings;

        return normalized;
    };

    // Load from "DB" (LocalStorage) on mount
    useEffect(() => {
        const savedData = localStorage.getItem('portfolio_db');
        let initial;

        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                initial = normalizeData(parsed);
                if (parsed.settings) setSettings(parsed.settings);
            } catch (e) {
                console.error("DB Load Error", e);
                initial = normalizeData(sourceContent);
            }
        } else {
            initial = normalizeData(sourceContent);
        }

        setData(initial);
        // Persist normalized data immediately
        localStorage.setItem('portfolio_db', JSON.stringify({ ...initial, settings: settings }));
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

            if (field === null || field === undefined) {
                // Direct replacement
                newState[section] = value;
            } else if (Array.isArray(newState[section])) {
                // Handle Array index update
                const newArr = [...newState[section]];
                newArr[field] = value;
                newState[section] = newArr;
            } else if (typeof newState[section] === 'object' && newState[section] !== null) {
                // Handle Object property update
                newState[section] = { ...newState[section], [field]: value };
            } else {
                // Fallback for primitive or non-existent section
                newState[section] = value;
            }

            // Persist to localStorage after setting state
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const deleteBlog = (id) => {
        if (!id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.blogs = (newState.blogs || []).filter(b => {
                const bId = b.id?.toString() || '';
                const tId = id.toString();
                return bId !== tId;
            });
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const deleteProject = (id) => {
        if (!id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.projects = (newState.projects || []).filter(p => {
                const pId = p.id?.toString() || '';
                const tId = id.toString();
                return pId !== tId;
            });
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
        if (!id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.assets = (newState.assets || []).filter(a => {
                const aId = a.id?.toString() || '';
                const tId = id.toString();
                return aId !== tId;
            });
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    // TryHackMe Actions
    const updateTryHackMe = (newStats) => {
        setData(prev => {
            const newState = { ...prev, tryHackMe: newStats };
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const deleteReflection = (id) => {
        if (!id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.reflections = (newState.reflections || []).filter(r => {
                const rId = r.id?.toString() || '';
                const tId = id.toString();
                return rId !== tId;
            });
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const updateReflection = (reflection) => {
        if (!reflection || !reflection.id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.reflections = (newState.reflections || []).map(r =>
                (r.id?.toString() === reflection.id.toString()) ? reflection : r
            );
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const updateIdea = (idea) => {
        if (!idea || !idea.id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.ideas = (newState.ideas || []).map(i =>
                (i.id?.toString() === idea.id.toString()) ? idea : i
            );
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const deleteIdea = (id) => {
        if (!id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.ideas = (newState.ideas || []).filter(i => {
                const iId = i.id?.toString() || '';
                const tId = id.toString();
                return iId !== tId;
            });
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const updatePrivateNote = (note) => {
        if (!note || !note.id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.privateNotes = (newState.privateNotes || []).map(n =>
                (n.id?.toString() === note.id.toString()) ? note : n
            );
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const deletePrivateNote = (id) => {
        if (!id) return;
        setData(prev => {
            const newState = { ...prev };
            newState.privateNotes = (newState.privateNotes || []).filter(n => {
                const nId = n.id?.toString() || '';
                const tId = id.toString();
                return nId !== tId;
            });
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
            return newState;
        });
    };

    const toggleIdeaVisibility = (id) => {
        setData(prev => {
            const newState = {
                ...prev,
                ideas: (prev.ideas || []).map(i => i.id === id ? { ...i, isPrivate: !i.isPrivate } : i)
            };
            const fullDb = { ...newState, settings: settings };
            localStorage.setItem('portfolio_db', JSON.stringify(fullDb));
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
