# AGENTS.md — CUE File Builder

## Project Overview
Converts timestamp lists into valid CUE sheet files. Examples stored in `examples/` directory.

## Input Parsing
Support multiple timestamp formats:
- `m:ss` (e.g., `5:45`)
- `h:mm:ss` (e.g., `1:00:56`)
- `start-end` range format (e.g., `0:00-5:37`) — only start timestamp used for INDEX position

## CUE Output
- Valid CUE sheet format with MSF timestamps (`MM:SS:FF`)
- Frames at **75 fps** (1 frame = 1/75 second)
- `FILE` line includes only filename, **no file type keyword** (e.g., `FILE "audio.wav"` not `FILE "audio.wav" WAV`)
- Each parsed line becomes a single TRACK entry

## Metadata Inputs
- **PERFORMER** — text, default "Unknown"
- **TITLE** — text, default "Mixed Album"
- **DATE** — text, defaults to current year
- **FILE Name** — text, default "audio.wav" (no separate file type selector)

## UI/UX
- Copy/Download buttons: visual feedback (text change + green flash, revert after ~1.5s)
- Responsive: metadata full-width, input/output side-by-side at 768px+, stacked on mobile
