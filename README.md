# Portfolio — Cyberpunk CLI Experience

A futuristic, interactive portfolio website designed to showcase technical skill through an immersive, cyberpunk-inspired user experience. This project simulates a fully functional command-line interface (CLI) system experience.

![Technologies](https://img.shields.io/badge/Technologies-HTML%20CSS%20JavaScript-blue.svg)

---

## Features

- **Immersive UX:** Built around a pseudo-terminal/OS aesthetic.
- **Interactive CLI:** Users can run commands to navigate different sections.
- **Thematic Design:** Dark, neon, cyberpunk visual theme.
- **Dynamic Content:** All sections loaded dynamically via JavaScript.
- **Comprehensive Showcase:** Demonstrates mastery in front-end development and UX design.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (recommended for future backend integrations)
- A modern web browser (Chrome, Firefox, etc.)

### Installation

1. Clone the repository:
```bash
   git clone [repository-url]
   cd [project-directory]
```
2. Open `index.html` in your browser — no build step needed.

---

## Project Structure

---

## Development & Customization

### Styling (`style.css`)
- Controls color palette (neon greens/blues on black) and fonts.
- To change the theme, modify the CSS variables (e.g., `--primary-color`) at the top of the file.

### Interactivity (`script.js`)
- Manages the simulated terminal state.
- To add a new section: define its content, create a command (e.g., `show projects`), and add an event listener.

### Content Updates
- **Skills:** Update the skills data array in `script.js`.
- **Projects:** Add objects to the projects array with links, descriptions, and tech used.
- **Contact:** Update the contact info object in `script.js`.

---

## Roadmap

1. **Backend Integration** — Functional contact form via Node/Express.
2. **Animation Polish** — Character-by-character typing effects.
3. **Theming** — Light/dark mode toggle.
4. **API Integration** — Live GitHub stats or real-time data feeds.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'feat: Added amazing feature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request.
