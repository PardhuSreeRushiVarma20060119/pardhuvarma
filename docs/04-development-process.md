# Development Process & Changelog

## 1. Methodology
The project followed an **Iterative / Agile** approach, broken down into distinct sprints focusing on specific verticals.

### Phase 1: Foundation (The Shell)
- Setup Vite + React environment.
- Establish the Design System (Variables, Fonts).
- Create core layout (Sidebar, Main Content Area).

### Phase 2: Content Engines
- Implementation of the **Bento Grid** for Projects.
- Creation of the Blog Reader/Renderer.
- Integration of the TryHackMe API hooks.

### Phase 3: The "Second Brain"
- Development of the Kanban interaction model.
- Implementation of `localStorage` persistence layer.
- **Challenge**: State Synchronization. We moved from `useState` to a global `DataContext` to ensure the "Brain" was accessible everywhere.

### Phase 4: Security & Hardening
- **Critical Bug Fix**: "The Black Screen of Death".
    - *Issue*: New users or incognito sessions crashed because `localStorage` was empty, and the app assumed data existed.
    - *Fix*: Implemented the "Self-Healing" initialization logic in `DataContext` to seed default data if missing.
- Implementation of WebAuthn and TOTP.

## 2. Code Standards

### Component Structure
- **Atomic Design**: Small, reusable components (`Card`, `Button`) vs. Layouts (`JournalLayout`).
- **Imports**: Grouped by (1) React/Libs, (2) Internal Contexts, (3) Components, (4) Assets.

### Error Handling
- **Graceful Degradation**: If an API (like GitHub or TryHackMe) fails, the UI shows a "Cached" or "Unavailable" state rather than crashing.
- **Boundaries**: React Error Boundaries (implicit) prevent the entire app from going white if one component fails (mostly).

## 3. Version Control
- **Branching**: Direct-to-Master (Solo Developer Workflow).
- **Artifacts**: Automated generation of Walkthroughs and Task Lists via the Agentic Workflow.
- **Documentation**: "Living Documentation" stored in `docs/` alongside code.
