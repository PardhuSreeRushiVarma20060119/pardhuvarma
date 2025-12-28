# Design System: Cyber-Research Aesthetic

## 1. Visual Identity

### Color Palette
The system uses a high-contrast, dark-mode-first palette inspired by terminal interfaces and cyberpunk media.

| Token | Value | usage |
|-------|-------|-------|
| `--bg-dark` | `#0a0a0a` | Main background (Void) |
| `--text-main` | `#ffffff` | Primary headings & body |
| `--text-muted` | `#888888` | Metadata, subtitles |
| `--accent-cyber` | `#00ff41` | Success, Active Links (Matrix Green) |
| `--accent-blue` | `#00ccff` | Info, Hover States (Holo Blue) |
| `--accent-error` | `#ff3333` | Errors, Delete Actions |

### Typography
- **Headings**: *Playfair Display* (Serif). Adds a touch of academic elegance and prestige.
- **Body**: *Inter* (Sans-serif). Highly legible, modern, neutral interface font.
- **Code/Metadata**: *JetBrains Mono* (Monospace). Technical feel for dates, tags, and stats.

## 2. Layout Patterns

### Bento Grid
Used in the **Projects** and **Reference** sections.
- **Concept**: Modular, bento-box style containers that resize fluently.
- **Implementation**: CSS Grid with `minmax(300px, 1fr)`.
- **Behavior**: Items expand to fill available space, creating a masonry-like feel without the JavaScript overhead.

### Glassmorphism
Used for "Floating" UI elements (Admin Bar, Modals, Sticky Headers).
- **CSS**: `backdrop-filter: blur(12px); background: rgba(10, 10, 10, 0.8);`
- **Effect**: Blurs the content behind it, ensuring readability while maintaining context of the background.

## 3. Micro-Interactions

### Hover States
Interactive elements utilize 3D transforms (`perspective: 1000px`) to tilt towards the cursor or lift up (`transform: translateY(-5px)`).

### Particle Background
A persistent `Three.js` canvas renders a field of floating particles.
- **Logic**: Particles drift slowly (`Math.sin(time)`).
- **Connection**: (Optional) Lines drawn between nearby particles to simulate neural networks.

## 4. Components

### `SectionHeading`
A reusable component ensuring consistent vertical rhythm.
- **Features**: Automatic numbering (e.g., "01.", "02."), responsive font sizing.

### `BiometricScanner`
A specialized UI component mimicking a fingerprint/retina scanner.
- **States**: Idle (Pulse), Scanning (Progress Bar), Success (Green Flash), Error (Red Shake).
- **Animation**: CSS Keyframes for the scanning laser effect.
