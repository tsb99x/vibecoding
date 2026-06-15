# CUE File Builder

A web application that converts timestamp lists into valid CUE sheet files.

## Features

- **Multiple Timestamp Formats** — Supports `m:ss`, `h:mm:ss`, and `start-end` range formats
- **Metadata Input** — Configure PERFORMER, TITLE, DATE, and filename with extension
- **MSF Output** — Generates valid CUE sheets with Minutes:Seconds:Frames timestamps at 75 FPS
- **Copy & Download** — One-click clipboard copy and file download with visual feedback
- **Responsive Design** — Side-by-side panels on desktop, stacked layout on mobile

## Usage

1. Paste your timestamp list into the input panel (one track per line)
2. Configure metadata fields as needed
3. Click "Convert to CUE" to generate the CUE sheet
4. Copy or download the result

## Supported Input Formats

```
0:01 Track Title
5:45 Another Track
1:00:56 Hour Format Track
0:00-5:37 Range Format Track
```

## Documentation

- [AGENTS.md](AGENTS.md) — Agent guide with project structure, constraints, and coding conventions.

## Technology

Built with vanilla HTML, CSS, and JavaScript. Styled with the Catppuccin Mocha color palette.
