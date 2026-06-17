# Flash Cards — Chinese Vocabulary

A single-page web application for Chinese language learning flashcards. Study HSK vocabulary with flip cards that show Chinese characters on one side and pinyin + English translation on the other.

## Features

- **150 HSK 1 words** included out of the box (nouns, verbs, adjectives, pronouns, numerals, classifiers, adverbs, conjunctions, prepositions, particles, and interjections)
- **Flip card UI** — front shows Chinese characters, back shows pinyin and English translation
- **Keyboard navigation** — arrow keys to navigate, spacebar to flip
- **Shuffle mode** — randomize card order
- **Search/filter** — filter cards by Chinese characters, pinyin, or English translation
- **Progress tracking** — shows current card position (e.g., "5 / 150")

## Controls

| Action | Keyboard | UI |
|--------|----------|-----|
| Flip card | Space | Click card |
| Previous card | ← Arrow | Prev button |
| Next card | → Arrow | Next button |
| Shuffle cards | — | Shuffle button |

## File Structure

```
flash-cards/
├── AGENTS.md   — Agent guidelines and constraints
├── README.md   — This file
├── index.html  — HTML structure with card container and controls
├── style.css   — All styling (Catppuccin Mocha theme)
└── script.js   — All flashcard logic, data, and interactions
```

## Usage

Open `index.html` in a browser to start studying. No build step or dependencies required.