# Project Overview: Researcher's Handbook

## 1. Abstract
The **Researcher's Handbook** is a high-performance "Digital Garden" designed for academics, developers, and knowledge workers. It bridges the gap between a static portfolio and a dynamic content management system (CMS), allowing the owner to publish "Living Documents", track the evolution of ideas ("Intellectual Changelog"), and manage private notes in a secure, encrypted-at-rest environment.

## 2. Core Philosophy
- **Speed**: Zero-latency interactions via optimistic UI updates and local persistence.
- **Privacy**: No external database. All data lives in the user's browser (LocalStorage), with critical backups in source control.
- **Aesthetics**: "Cyber-Research" theme utilizing Glassmorphism, deep dark modes, and hardware-accelerated particle effects (Three.js).

## 3. Technology Stack

### Frontend Runtime
- **React 19**: Leveraging the latest concurrent features.
- **Vite**: Ultra-fast build tool and dev server.
- **React Router v7**: Client-side routing with data loaders.

### Visual Engine
- **Three.js / @react-three/fiber**: Background particle field representing "Neural Connections".
- **Vanilla CSS3 + Variables**: Custom design system without the bloat of Tailwind or Bootstrap.
- **Bento Grids**: Responsive, modular layout system for Projects and Blog posts.

### Data & State
- **Context API (`DataContext`)**: Custom state manager that handles:
    - Hydration from LocalStorage.
    - Schema Validation & Migration.
    - Self-Healing (corruption recovery).
- **Context API (`AuthContext`)**: Security state manager isolating Admin privileges from Content logic.

### Security
- **WebAuthn (FIDO2)**: Biometric authentication via `navigator.credentials`.
- **TOTP (RFC 6238)**: Time-based One-Time Passwords via `otpauth` library.
- **AES/hashing**: (Future Roadmap) Client-side encryption for Private Notes.

## 4. Key Features
1.  **Second Brain**: A Kanban-style interface for managing Ideas (Public/Private) and Notes.
2.  **Intellectual Changelog**: A commit-style history of thought evolution.
3.  **TryHackMe Integration**: Live stats visualization from the TryHackMe public API.
4.  **Admin Mode**: Invisible, secure entry point for managing content directly on the production site.
