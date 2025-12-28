export const content = {
    home: {
        mainText: "Pardhu Varma",
        subText: "Cybersecurity Student & Systems Researcher",
        intro: "I am a 3rd-year cybersecurity student with strong research interests in Adversarial AI, Cyber-Physical Systems, Systems Security Research, and Robust Machine Learning.",
        abstract: [
            "My research focus involves understanding attacker–defender dynamics within intelligent systems and analyzing and constraining AI behavior under adversarial influence through runtime-governed architectures.",
            "I explore areas such as adversarial ML attacks and defenses, cyber-physical threat modeling, robust learning architectures, and the reliability of AI-enabled systems in real-world settings. I’m particularly drawn to research at the intersection of AI, systems security, and cyber-physical infrastructures.",
            "I aim to pursue advanced research at CISPA – Helmholtz Center for Information Security / Saarland University, and eventually a PhD or long-term research career in AI security and systems security research.",
            "My primary interests lie in trustworthy and robust machine learning, runtime-governed intelligent systems, and adversarial resilience, with particular motivation drawn from high-stakes domains such as cyber-physical infrastructures, autonomous systems, intelligent swarms, and next-generation defense architectures.",
            "I am actively strengthening my academic foundation in AI, security, and systems engineering, and remain committed to advancing through rigorous study, research immersion, and scientifically grounded exploration."
        ]
    },

    about: {
        title: "About The Researcher",
        longTermGoals: [
            "Safe Autonomous Systems",
            "Systems Security Research",
            "Agentic AI Runtime Design",
            "Swarm Intelligence for Cyber Defense",
            "High-assurance ML and Runtime Safety",
            "Secure Cyber-Physical Intelligence"
        ]
    },

    researchInterests: [
        { title: "Agentic Swarm Intelligence", desc: "Autonomous defense agents, role-switching, emergent coordination" },
        { title: "AI Runtime Security", desc: "Kill-switches, governance modules, safety-critical constraints" },
        { title: "Adversarial Machine Learning", desc: "Robustness, poisoning/evasion, red-team AI" },
        { title: "RL-LoRA Behaviour Systems", desc: "Modular behavioural LoRA patches, dynamic skill composition" },
        { title: "Cyber-Physical & CPS Security", desc: "Secure sensing, anomaly detection, physical-world adversaries" },
        { title: "Distributed Systems for AI", desc: "Kubernetes-orchestrated agents, fault-tolerant multi-agent infrastructure" },
        { title: "Trustworthy ML", desc: "Explainability, uncertainty, distribution shifts" }
    ],

    papers: [
        {
            title: "Building AADS — Agentic AI Defense Swarms with Safety Governance",
            status: "In Progress / Preprint",
            type: "Research Paper",
            desc: "Exploring swarm-level autonomy combined with strict runtime governance constraints to prevent adversarial subversion in defense swarms.",
            link: "#"
        },
        {
            title: "Designing Adversarial Stress-Tests for MARL Agents",
            status: "In Progress",
            type: "Methodology",
            desc: "A framework for evaluating the robustness of Multi-Agent Reinforcement Learning systems against coordinated adversarial attacks.",
            link: "#"
        },
        {
            title: "Governance as a Technical Constraint in AI Runtime",
            status: "Draft",
            type: "Position Paper",
            desc: "Proposing a shift from policy-based governance to architectural kill-switches and isolation layers in safety-critical AI.",
            link: "#"
        },
        {
            title: "Prototyping GNIM: Cyber-Geospatial Intelligence Mapping",
            status: "Research",
            type: "Technical Report",
            desc: "RF-aware situational awareness mapping for cyber-physical threat modeling.",
            link: "#"
        }
    ],

    projects: [
        {
            title: "EpsilonShift",
            status: "Scientific Prototype",
            tech: "Python, Playwright, Adversarial ML",
            description: "Adversarial Fingerprint Obfuscation via Sparse, Deterministic Canvas/WebGL/Audio Perturbations. A small research-grade prototype that injects tiny adversarial perturbations into browser fingerprinting APIs.",
            link: "https://github.com/PardhuSreeRushiVarma20060119/Mini-Projects"
        },
        {
            title: "AADS (Agentic AI Defense Swarms)",
            status: "Research",
            tech: "Swarm Intelligence, MARL",
            description: "Agentic Swarm Intelligence system focusing on safe governance and swarm-level autonomy with flight/defense coordination.",
            link: "#"
        },
        {
            title: "REVA-4 Runtime",
            status: "Under Development",
            tech: "Rust, RL-LoRA",
            description: "Developing the REVA4 Runtime — RL-LoRA behavioural runtime for modular, controllable AI behaviours with runtime safety guarantees.",
            link: "#"
        },
        {
            title: "Loadiscator",
            status: "Tooling",
            tech: "Python, C++",
            description: "Modular, extensible framework for generating, obfuscating, and delivering payloads for red team operations, adversary simulation, and AV/EDR evasion research.",
            link: "https://github.com/PardhuSreeRushiVarma20060119/loadiscator"
        },
        {
            title: "Project Ouroboros",
            status: "Hardware/CPS",
            tech: "ESP32, Firmware",
            description: "Modular, dual-use cybersecurity platform encompassing multiple ESP32-based hardware and firmware modules for wireless defense, monitoring, and controlled research.",
            link: "https://github.com/PardhuSreeRushiVarma20060119/Project-Ouroboros"
        },
        {
            title: "PhishTrap",
            status: "Simulation Platform",
            tech: "Kali Linux, Python, Flask",
            description: "Immersive phishing simulation challenge where participants took on the role of adversaries to ethically breach human-layer defenses.",
            link: "https://github.com/PardhuSreeRushiVarma20060119/PhishTrap"
        },
        {
            title: "The Nexus Security",
            status: "Command Center",
            tech: "React, OSINT",
            description: "Web-based cybersecurity management & command centre platform aimed at enhancing vulnerability assessment and threat intelligence.",
            link: "https://github.com/PardhuSreeRushiVarma20060119/The-Nexus-Security"
        },
        {
            title: "HuggingFace-Training",
            status: "Experiments",
            tech: "Transformers, RL",
            description: "Hands-on examples, experiments, and scripts for training models with HuggingFace libraries — from reinforcement learning agents to transformers for NLP tasks.",
            link: "https://github.com/PardhuSreeRushiVarma20060119/HuggingFace-Training"
        }
    ],

    blogs: [
        {
            id: "bfs-1",
            title: "Why Inspectability Is a Safety Requirement",
            date: "Oct 2025",
            type: "Essay",
            desc: "Discussing the need for transparent internal states in autonomous agents."
        },
        {
            id: "bfs-2",
            title: "Failure-First Thinking in System Design",
            date: "Sep 2025",
            type: "Note",
            desc: "Designing systems that assume breach and failure as the default state."
        },
        {
            id: "bfs-3",
            title: "Runtime constraints for LLM agents",
            date: "Aug 2025",
            type: "Research Note",
            desc: "Exploration of hard constraints vs soft prompts for agent control."
        }
    ],

    timeline: [
        { title: "Multi-Cloud Red Team Analyst (MCRTA)", org: "CyberWarFare Labs", date: "Jul 2025" },
        { title: "Certified Red Team Analyst (CRTA)", org: "CyberWarFare Labs", date: "Aug 2025" },
        { title: "Student Coordinator - PhishTrap", org: "Malla Reddy University", date: "Apr 2025" },
        { title: "B.Tech Cybersecurity", org: "Malla Reddy University", date: "Jul 2023 - Present" },
        { title: "Intermediate (MPC)", org: "Sri Chaitanya College", date: "May 2021 - Jun 2023" },
        { title: "Secondary Education", org: "Sri Chaitanya Techno School", date: "May 2019 - Apr 2021" }
    ],

    certifications: [
        { name: "Multi-Cloud Red Team Analyst (MCRTA)", issuer: "CyberWarFare Labs", date: "Jul 2025" },
        { name: "Certified Red Team Analyst (CRTA)", issuer: "CyberWarFare Labs", date: "Aug 2025" },
        { name: "Big IAM Challenge Certificate", issuer: "Wiz", date: "May 2025" },
        { name: "Google Foundations of Cybersecurity", issuer: "Google", date: "Apr 2025" },
        { name: "API Security Fundamentals '25", issuer: "APIsec University", date: "Oct 2025" },
        { name: "Securing LLM and NLP APIs", issuer: "APIsec University", date: "Oct 2025" },
        { name: "Top 10% API Coder", issuer: "Credmark", date: "Oct 2025" },
        { name: "Complete Agentic AI Engineering Course", issuer: "Udemy", date: "Sep 2025" },
        { name: "Advanced C++ Excellence", issuer: "Scaler", date: "Feb 2025" },
        { name: "Palo Alto Networks: Network Security Fundamentals", issuer: "Palo Alto Networks", date: "Sep 2024" },
        { name: "ISC2 Candidate (CC Certifications)", issuer: "ISC2", date: "Feb 2025" },
        { name: "Advent of Cyber 24", issuer: "TryHackMe", date: "Mar 2025" },
        { name: "2nd Place - Growth Ninja Hackathon", issuer: "IIT Hyderabad", date: "Mar 2025" }
    ],

    contact: {
        email: "pardhusreerushivarma@gmail.com",
        github: "https://github.com/PardhuSreeRushiVarma20060119",
        linkedin: "https://www.linkedin.com/in/pardhu-sri-rushi-varma-konduru-696886279/",
        location: "Hyderabad, India"
    }
};
