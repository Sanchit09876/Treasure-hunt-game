# Treasure Hunt

A card-flipping, risk-your-bet browser game built as a learning project while practicing the fundamentals of React and Tailwind CSS.

The project focuses on understanding core React concepts such as components, props, state management, hooks, conditional rendering, event handling, and component-based UI design.

Choose a difficulty, place a bet, and reveal cards row by row. Gold coins raise your multiplier, while a skull ends the run. Cash out whenever you like, so long as fortune hasn't turned on you yet.

## Gameplay

1. **Choose a difficulty** — Easy, Medium, Hard, or Extreme. Difficulty sets the number of rows, the skull-to-card ratio, and the multiplier ceiling.

2. **Place a bet** and press **Start Game**.

3. Each row holds 6 face-down cards. Flip one:
   - **Gold** clears the row and advances your multiplier.
   - **Skull** ends the round; your bet is lost.

4. **Cash out** at any point before a skull is revealed to bank your current payout.

5. Clear every row in a difficulty tier without hitting a skull to claim the maximum multiplier.

### Difficulty tiers

| Difficulty | Rows | Skulls per row | Max multiplier |
| --- | ---: | ---: | ---: |
| Easy | 4 | 1–2 | 1.5x |
| Medium | 6 | 2–3 | 2.5x |
| Hard | 8 | 3–4 | 5x |
| Extreme | 10 | 5 | 10x |

Exact per-row multiplier tables live in `src/data/difficultyConfig.js`.

## Learning objectives

This project was created primarily to practice and strengthen basic React skills, including:

- Component-based architecture
- Props and state management
- React hooks
- Event handling
- Conditional rendering
- Mapping and rendering dynamic data
- Reusable UI components
- Local storage for persistent browser data
- Basic game logic and state flow
- Styling React applications with Tailwind CSS

## Tech stack

- **React** — component structure and state management using hooks
- **Tailwind CSS v4** — styling using the `@import "tailwindcss"` syntax in `index.css`
- **ogl** — lightweight WebGL library powering the animated specular border on `SpecularButton`
- **lucide-react** — icon set used throughout the UI

`SpecularButton.jsx` was sourced from ReactBits.dev and installed via its CLI. Icons were installed using the `lucide-react` package.

Persistent balance is stored in `localStorage` under the key `treasureHuntBalance`. No backend or database is involved.

## Project structure

```text
src/
├── assets/                      # images and sound effects
├── components/
│   ├── Game.jsx                 # top-level game state and orchestration
│   ├── CardRow.jsx              # a single row of 6 cards + cash-out control
│   ├── Card.jsx                 # individual flippable card
│   ├── BetInput.jsx             # bet amount input
│   ├── DifficultySelector.jsx   # difficulty picker
│   ├── StatusBar.jsx            # balance / bet / multiplier / payout display
│   ├── ResultBanner.jsx         # win / loss / cash-out banner
│   ├── ErrorBanner.jsx          # validation error banner
│   ├── HowToPlay.jsx            # rules modal
│   ├── Header.jsx               # title banner
│   └── SpecularButton.jsx       # WebGL specular-edge button
├── data/
│   └── difficultyConfig.js      # skull ranges, multipliers, row counts
├── utils/
│   └── gameLogic.js             # card shuffling, skull placement, multipliers
├── App.jsx
└── index.css
```

## Game logic

`src/utils/gameLogic.js` handles the two main mechanical pieces of the game:

- `generateRowCards(cardCount, skullRange)` — picks a random skull count within the difficulty's range, shuffles card positions with a Fisher–Yates shuffle, and returns an array of `"skull"` / `"gold"` values.

- `getRowMultiplier(difficulty, rowIndex)` — looks up the payout multiplier for a given row from `difficultyConfig.js`.

## Getting started

Built with Vite, React 19, and Tailwind CSS v4.

```bash
npm install
npm run dev
```

Build for production with:

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

Lint with:

```bash
npm run lint
```

### Dependencies

| Package | Version |
| --- | --- |
| react | ^19.2.8 |
| react-dom | ^19.2.8 |
| tailwindcss | ^4.3.3 |
| @tailwindcss/vite | ^4.3.3 |
| ogl | ^1.0.11 |
| lucide-react | ^1.33.0 |

### Dev dependencies

| Package | Version |
| --- | --- |
| vite | ^8.2.0 |
| @vitejs/plugin-react | ^6.0.4 |
| oxlint | ^1.75.0 |
| @types/react | ^19.2.17 |
| @types/react-dom | ^19.2.3 |

## Sound and assets

The game plays background music and sound effects for card flips, wins, losses, and cash-outs (`src/assets/`). All audio elements fail silently on autoplay restrictions rather than throwing errors.

- **Audio** — sourced from Pixabay and used under its royalty-free content license.
- **Images** — generated using ChatGPT's image generation.

## Notes

- Balance persists across sessions via `localStorage`; clearing browser storage resets it to the default starting balance of `$100`.
- The game has no server-side component — all randomness and bookkeeping happen client-side.
- This project is intended as a learning project and does not support real money or real-world gambling.

---

# 📄 License

This project was built for learning purposes. Feel free to explore the code and get inspired, but please don't copy and present it as your own work.

---

# 👤 Author

**Sanchit Maharjan** — @Sanchit09876